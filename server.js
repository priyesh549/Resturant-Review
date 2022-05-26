const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "728834893";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated({ Email, Password }){
  return (
    db.Users.findIndex(
      (user) => user.Email === Email && user.Password === Password
    ? false : true)
  );
}

// Logic for register
server.post("/api/auth/register", (req, res) => {
  const { Name, Email, Role, Password } = req.body;
  console.log('here we are',Name,Email,Role,Password)
  if (isAuthenticated({ Email, Password })) {
    const status = 401;
    const message = "Email & Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }
    data = JSON.parse(data.toString());

    let last_item_id = data.Users[data.Users.length - 1].id;

    data.Users.push({
      Name: Name,
      Email: Email,
      Role: Role,
      Password: Password,
      id: last_item_id + 1,
    });
    let writeData = fs.writeFile(
      "./db.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });
  const access_token = createToken({ Name,Email,Role,Password });
  res.status(200).json({ access_token });
});

// Logic for login
server.post("/api/auth/login", (req, res) => {
  const { Email, Password } = req.body;
  if (!isAuthenticated({ Email, Password })) {
    const status = 401;
    const message = "Incorrect email or Password";
    res.status(status).json({ status, message });
    return;
  }

  let Name = '';
  let Role = '';
  let id = '';
  for(let i=0;i<db.Users.length;i++){
      if(db.Users[i].Email === Email && db.Users[i].Password){
          Name = db.Users[i].Name
          Role = db.Users[i].Role
          id = db.Users[i].id
      }
  }
  const access_token = createToken({ Name,Email,Role,Password,id });
  res.status(200).json({ access_token });
});


server.listen(5000,()=>{
    console.log('Running fake api json server')
})
