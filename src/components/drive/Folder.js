import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";

export default function Folder({ folder }) {
  return (
    <Button
      variant="outline-primary"
      className="text-truncate w-100`"
      as={Link}
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
    >
      <FaFolder
        style={{
          fontSize: "1.3rem",
          display: "inline-flex",
          marginRight: "0.5rem",
          marginBottom: "0.2rem",
        }}
      />
      {folder.name}
    </Button>
  );
}
