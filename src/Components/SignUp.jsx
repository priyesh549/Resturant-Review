import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("User");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name, email, password, role);
    if (!name || !email || !password || !role) {
      return alert("Fill all the details!");
    }

    if (!isvalidemail) {
      return alert("Enter valid email Id");
    }


    await axios
      .post("http://localhost:3000/Users", {
        Email: email,
        Password: password,
        Name : name,
        Role : role
      })
      .then((resp) => {
        console.log(resp.token)
        localStorage.setItem('User',JSON.stringify(resp.data))
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate('/Resturant')
  };

  return (
    <>
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
        <Form.Label column sm={3}>
          <Col sm={4}>
            <Form.Select
              aria-label="Default select User Type"
              className="mb-5"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User" selected>
                User
              </option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Col>
        </Form.Label>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 6, offset: 2 }}>
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Register
            </Button>
            <p>Already have an account?{'  '}
            <Link to='/'>Login</Link>
            </p>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default SignUp;
