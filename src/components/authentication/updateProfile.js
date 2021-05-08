// import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
// import { Link, useHistory } from "react-router-dom";

// export default function UpdateProfile() {
//   const { currentUser, updateEmail, updatePassword } = useAuth();

//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const passwordConfirmRef = useRef(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const history = useHistory();

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Le password non corrispondono");
//     }

//     const promises = [];
//     setError("");
//     setLoading(true);
//     if (emailRef.current.value !== currentUser.email) {
//       promises.push(updateEmail(emailRef.current.value));
//     }
//     if (passwordRef.current.value) {
//       promises.push(updatePassword(passwordRef.current.value));
//     }

//     Promise.all(promises)
//       .then(() => {
//         history.push("/user");
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(
//           "Impossibile modificare il profilo. Prova a effettuare un nuovo Log In"
//         );
//       })
//       .finally(() => {
//         setLoading(true);
//       });
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Aggiorna il tuo Profilo</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 ref={emailRef}
//                 defaultValue={currentUser.email}
//                 required
//               />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password (Almeno 6 caratteri)</Form.Label>
//               <Form.Control
//                 placeholder="Lasciare vuoto per non modificare la password"
//                 type="password"
//                 ref={passwordRef}
//               />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>password confirm</Form.Label>
//               <Form.Control
//                 placeholder="Lasciare vuoto per non modificare la password"
//                 type="password"
//                 ref={passwordConfirmRef}
//               />
//             </Form.Group>
//             <Button disabled={loading} className="w-100 mt-4" type="submit">
//               Update
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         <Link to="/user">Torna alla Dashboard</Link>
//       </div>
//     </>
//   );
// }
