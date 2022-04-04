import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import React from "react";
import Navbar from "./Navbar";
import Folder from "./Folder";
import File from "./File";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import { useParams, useLocation } from "react-router";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  return (
    <>
      <Navbar></Navbar>
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <div className="d-flex  align-items-center flex-column">
            <AddFileButton currentFolder={folder} />
            FILE
          </div>
          <div className="d-flex  align-items-center flex-column">
            <AddFolderButton currentFolder={folder} />
            FOLDER
          </div>
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                className="p-2"
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
              >
                <Folder folder={childFolder}></Folder>
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                className="p-2"
                key={childFile.id}
                style={{ maxWidth: "250px" }}
              >
                <File file={childFile}></File>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
