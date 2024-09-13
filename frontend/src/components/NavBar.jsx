import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
  return (
    <Navbar  data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/#/home">ChatQuery</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">User</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
