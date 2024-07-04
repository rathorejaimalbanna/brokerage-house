import React from "react";
import { Button } from "react-bootstrap";

export default function UploadPhoto(props) {
  function handleUpload() {
    props.handleUplaod();
    props.handleShow();
  }
  return (
    <div>
      <input
        style={{ marginBottom: "20px" }}
        type="file"
        onChange={(e) => props.setFile(e.target.files[0])}
      />
      <Button variant="success" onClick={handleUpload}>
        Upload
      </Button>
      <Button
        onClick={props.handleShow}
        style={{ marginLeft: "15px" }}
        variant="danger"
      >
        Cancel
      </Button>
    </div>
  );
}
