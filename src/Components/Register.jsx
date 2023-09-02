import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isvalidemail, setValidity] = useState(false);
  const navigate = useNavigate();

  const hanldeEmail = (email) => {
    setEmail(email);
    console.log(validateEmail(email));
    setValidity(validateEmail(email));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return toast("Fill all the details!", { alert: "error" });
    }

    if (!isvalidemail) {
      return toast("Enter valid email Id", { alert: "error" });
    }


    // axios
    //   .post("http://localhost:5000/api/auth/login", {
    //     Email: email,
    //     Password: password,
    //   })
    //   .then((response) => {
    //     console.log("response", response);
    //     localStorage.setItem(
    //       "User",
    //       JSON.stringify({
    //         userLogin: true,
    //         token: response.data.access_token,
    //       })
    //     );
    //     setEmail("");
    //     setPassword("");
    //     navigate('/Resturant')
    //   })
    //   .catch((error) => {
    //     return toast("Incorrect email or password");
    //   });

    console.log(name,email,password)
    
    axios
      .post("http://localhost:5000/api/auth/register", {
        Name : name,
        Email : email,
        Role : "User",
        Password : password
      })
      .then((resp) => {
        localStorage.setItem("User",JSON.stringify({userLogin: true,token: resp.data.access_token,}));
        toast("successfully Registered");
        setTimeout(() => {
          navigate("/Resturant");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        toast("error siginingUp");
      });
  };

  return (
    <>
      <ToastContainer />
      <Form style={{ marginTop: "30px", textAlign: "center" }}>
        <Form.Group
          as={Row}
          className="mb-5"
          controlId="formHorizontalEmail"
          onChange={(e) => setName(e.target.value)}
        >
          <Form.Label column sm={4}>
            Name
          </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Please enter your name" />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-5"
          controlId="formHorizontalEmail"
          onChange={(e) => hanldeEmail(e.target.value)}
        >
          <Form.Label column sm={4}>
            Email
          </Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Please enter valid email" />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-5"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={4}>
            Password
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="password"
              placeholder="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 6, offset: 2 }}>
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Register
            </Button>
            <p>
              Already have an account?{"  "}
              <Link to="/">Login</Link>
            </p>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default Register;
