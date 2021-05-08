import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb
      listProps={{ className: "bg-white p-2 m-0" }}
      className="flex-grow-1"
    >
      {path.map((folder, index) => (
        <Breadcrumb.Item
          className="text-truncate d-inline-block "
          style={{ maxWidth: 150 }}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          key={folder.id}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block "
          style={{ maxWidth: 200 }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

//    <Breadcrumb listProps={{className: "bg-white p-0"}}>
