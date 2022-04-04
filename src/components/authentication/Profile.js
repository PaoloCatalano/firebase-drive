import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "./CenteredContainer";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
      setError("Log out fallito");
    }
  }
  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Your Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>User:</strong> {currentUser.email}
          <Link to="/update-email" className="btn btn-primary w-100 mt-3">
            Update Email
          </Link>
          <Link to="/update-password" className="btn btn-primary w-100 mt-3">
            Update Password
          </Link>
        </Card.Body>
      </Card>

      <Link to="/" style={{ textDecoration: "none" }}>
        <Alert variant="primary" className="w-100 text-center mt-2">
          Back to Dashboard
        </Alert>
      </Link>
      <div className="w-100 text-center mt-2 ">
        <Button variant="link" onClick={handleLogout} className="text-danger">
          Log out
        </Button>
      </div>
    </CenteredContainer>
  );
}
