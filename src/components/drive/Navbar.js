import React from "react";
import { Navbar as NavBoot, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <NavBoot bg="light" expand="xlg" style={{ padding: "1rem 2rem" }}>
      <NavBoot.Brand as={Link} to="/">
        Dixcorso Drive
      </NavBoot.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Il mio Profilo
        </Nav.Link>
      </Nav>
    </NavBoot>
  );
}
//
