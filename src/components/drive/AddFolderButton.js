import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  const inputRef = useRef(null);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    //path
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    //create a databese first!
    database.folders.add({
      name: name,
      userId: currentUser.uid,
      parentId: currentFolder.id,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    });
    setName("");
    closeModal();
  }

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <Button
        onClick={openModal}
        variant="outline-warning"
        size="md"
        className="mt-3"
      >
        <FaFolderPlus style={{ fontSize: "2rem", display: "flex" }} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nome Cartella</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                focus
                ref={inputRef}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={closeModal}>
              Chiudi
            </Button>
            <Button variant="success" type="submit" onClick={closeModal}>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
