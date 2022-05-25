import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  const handleUser = () => {
    localStorage.removeItem("User");
  };

  const [CurrentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("User"));
    setCurrentUser(getUser);
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Resturant">Resturant Clicks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Resturant">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            {CurrentUser.Role === 'Admin' && <Nav.Link href="/users">Users</Nav.Link>}
          </Nav>
          <Nav.Link href="/" onClick={handleUser}>
            Logout
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
