import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { MdEmail } from 'react-icons/md';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const DeleteData = async(user) => {
    await axios
      .delete(`http://localhost:3000/Users/${user.id}`)
      .then((resp) => {
        return toast(`${user.Name.toUpperCase()} deleted`)
      })
      .catch((error) => {
        return toast(`${user.Name.toUpperCase()} error deleting`)
      });
  };


  return (
    <>
      <ToastContainer/>
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
                <Button variant="outline-danger" onClick={()=>handleDelete(user)}>Delete</Button>
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
