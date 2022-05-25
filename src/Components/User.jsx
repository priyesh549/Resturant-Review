import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { MdEmail } from 'react-icons/md';

function User() {
  const [users, setUsers] = useState([]);
  const [userList,setUserList] = useState(0);

  useEffect(() => {
    const fetchUsers = async() => {
      let userdata = await axios.get("http://localhost:3000/Users");
      userdata = userdata.data;
      setUsers(userdata);
    };
    fetchUsers();
  }, [userList]);

  const handleDelete = async(Id) => {
    await DeleteData(Id);
    setUserList(userList + 1);
  }

  const DeleteData = async(id) => {
    await axios
      .delete(`http://localhost:3000/Users/${id}`)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
      <NavBar />
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      {users.map((user) => {
        return (
          user.Role === "User" && (
            <Card
              key={user.id}
              style={{
                width: "43rem",
                margin: "1rem",
                height: "auto",
                border: "1px solid grey",
                padding: "1rem",
              }}
            >
              <Card.Title>{user.Name.toUpperCase()}</Card.Title>
              <Card.Text style={{ color: "grey" }}>
                <MdEmail /> {user.Email}
              </Card.Text>
              <Card.Text style={{color : '#111'}}>
                <strong>User Interest:</strong> Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nam ipsam dolor, accusantium
                praesentium eveniet iste porro officia sequi qui sed, quo odit
                eum dolore iusto quasi necessitatibus animi ab eius?
              </Card.Text>
              <div>
                <Button variant="outline-danger" onClick={()=>handleDelete(user.id)}>Delete</Button>
              </div>
            </Card>
          )
        );
      })}
      </div>
    </>
  );
}

export default User;
