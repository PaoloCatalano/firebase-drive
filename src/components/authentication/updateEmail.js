import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function UpdateProfile() {
  const { currentUser, updateEmail } = useAuth();

  const emailRef = useRef(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await updateEmail(emailRef.current.value);
      history.push("/user");
    } catch (error) {
      console.log(error);
      setError(
        "Impossibile modificare l'email. Prova a effettuare un nuovo Log In"
      );
    }
    setLoading(true);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update your Email</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
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
