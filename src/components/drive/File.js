import React from "react";
import { FaFile } from "react-icons/fa";

export default function File({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FaFile
        style={{
          fontSize: "2rem",
          display: "inline-flex",
          marginRight: "0.5rem",
          marginBottom: "0.2rem",
        }}
      />
      {file.name}
    </a>
  );
}
