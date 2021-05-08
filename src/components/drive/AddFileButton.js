import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaFileUpload } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { storage, database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
//id creator (npm i uuid)
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  function handleUpdate(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUpload) => [
      ...prevUpload,
      {
        id: id,
        name: file.name,
        progress: 0,
        error: false,
      },
    ]);

    const pathName = currentFolder.path?.map((p) => p.name);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${pathName.join("/")}/${file.name}`
        : `${pathName.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUpload) => {
          return prevUpload.map((upload) => {
            if (upload.id === id) {
              return { ...upload, progress: progress };
            }
            return upload;
          });
        });
      },
      () => {
        setUploadingFiles((prevUpload) => {
          return prevUpload.map((upload) => {
            if (upload.id === id) {
              return { ...upload, error: true };
            }
            return upload;
          });
        });
      },
      () => {
        // setUploadingFiles((prevUpload) => {
        //   return prevUpload.filter((upload) => {
        //     return upload.id !== id;
        //   });
        // }); non fa apparire la progress bar!!
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }
  return (
    <>
      <label className="btn btn-outline-success btn-sm m-2 mt-4">
        <FaFileUpload style={{ fontSize: "2rem", display: "flex" }} />
        <input
          type="file"
          onChange={handleUpdate}
          style={{ opacity: 0, position: "absolute", left: -9999 }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: 250,
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                autohide
                onClose={() => {
                  setUploadingFiles((prevUp) => {
                    return prevUp.filter((upl) => {
                      return upl.id !== file.id;
                    });
                  });
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-grid"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
