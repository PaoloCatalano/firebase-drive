import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default () => null;

// const Signup = () => {
//   const { signup } = useAuth();

//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const passwordConfirmRef = useRef(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();
//   async function handleSubmit(event) {
//     event.preventDefault();
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Le password non corrispondono");
//     }

//     try {
//       setError("");
//       setLoading(true);
//       await signup(emailRef.current.value, passwordRef.current.value);
//       history.push("/");
//     } catch (error) {
//       console.log(error);
//       setError("Impossibile creare un account");
//     }
//     setLoading(true);
//   }

//   return (
//     <CenteredContainer>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign up</h2>
//           {/*
//               //    TESTING Purposes
//            {currentUser && (
//             <Alert variant="info">
//               Email: {JSON.stringify(currentUser.email)}
//             </Alert>
//           )} */}
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 className="mb-3"
//                 ref={emailRef}
//                 required
//               />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password (Almeno 6 caratteri)</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Ripeti la password</Form.Label>
//               <Form.Control type="password" ref={passwordConfirmRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100 mt-4" type="submit">
//               Sign up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Hai già un account? <Link to="/login">Log in</Link>
//       </div>
//     </CenteredContainer>
//   );
// };

// export default Signup;
