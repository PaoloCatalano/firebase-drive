import React from "react";
import { Navbar as NavBoot, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <NavBoot
      className="navbar navbar-dark bg-dark"
      expand="xlg"
      style={{ padding: "1rem 2rem" }}
    >
      <NavBoot.Brand as={Link} to="/">
        Miu Drive
      </NavBoot.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>
    </NavBoot>
  );
}
//
