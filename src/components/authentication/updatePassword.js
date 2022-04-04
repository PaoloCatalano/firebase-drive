import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function UpdateProfile() {
  const { updatePassword } = useAuth();
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Le password non corrispondono");
    }

    try {
      setError("");
      setLoading(true);
      await updatePassword(passwordRef.current.value);
      history.push("/user");
    } catch (error) {
      console.log(error);
      setError(
        "Impossibile modificare la password. Prova a effettuare un nuovo Log In"
      );
    }
    setLoading(true);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="password">
              <Form.Label>New Password (at least 6 characters)</Form.Label>
              <Form.Control
                placeholder="Leave it empty if you don't want to modify it"
                type="password"
                ref={passwordRef}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                placeholder="Leave it empty if you don't want to modify it"
                type="password"
                ref={passwordConfirmRef}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Back to Profile</Link>
      </div>
    </CenteredContainer>
  );
}
