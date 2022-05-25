import React, { useState,useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isvalidemail, setValidity] = useState(false);
  const [userData,setUserdata] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetch = async() => {
      let dataUser = await axios('http://localhost:3000/Users');
      dataUser = dataUser.data;
      setUserdata(dataUser);
    }
    fetch();
  },[])

  const hanldeEmail = (email) => {
    setEmail(email);
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
    if (!email || !password) {
      return alert("Fill all the details!");
    }

    if (!isvalidemail) {
      return alert("Enter valid email Id");
    }

    for(let i=0;i<userData.length;i++){
      console.log(userData[i].Email,userData[i].Password)
      if(userData[i].Email === email && userData[i].Password === password){
        localStorage.setItem('User',JSON.stringify(userData[i]));
        navigate('/Resturant')
        return
      }
    }
    alert('Invalid email or password')
    
  };

  return (
    <div>
      <Form style={{ marginTop: "30px", textAlign: "center" }}>
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
          <Button type="submit" onClick={(e)=>handleSubmit(e)}>
              Log in
            </Button>
            <p>
                Didn't an account?{' '}
                <Link to='/SignUp'>
                    SignUp
                </Link>
            </p>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
