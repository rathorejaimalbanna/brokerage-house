import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { userProjectActions } from "../../Redux/userProjectReducer/userProjectReducer";

export default function UserProjectModal(props) {
  const [status, setStatus] = useState(props.project.status);
  const [projectStatus, setProjectStatus] = useState(
    props.project.projectStatus
  );
  const [area, setArea] = useState(props.project.size);
  const [price, setPrice] = useState(props.project.price);
  const dispatch = useDispatch();
  async function updateProject() {
    const frankDocRef = doc(db, "userProjects", props.project.name);
    await updateDoc(frankDocRef, {
      projectStatus,
      status,
      size: area,
      price,
    });
  }

  function handleSubmit() {
    var projectObject = [...props.loadedProjects];
    projectObject[props.projectId] = {
      ...projectObject[props.projectId],
      projectStatus,
      size: area,
      price,
      status,
    };
    console.log(projectObject);
    updateProject(projectObject);
    dispatch(
      userProjectActions.editProject({
        projectObject,
      })
    );
    props.handleClose();
  }

  const handleSelect = (eventKey) => {
    setStatus(eventKey);
  };
  const handleSelectProjectStatus = (eventKey) => {
    setProjectStatus(eventKey);
  };
  return (
    <div>
      <h2>Edit Property Details</h2>
      <form action="" onSubmit={handleSubmit}>
        <p>Change Status</p>

        <DropdownButton
          id="dropdown-basic-button"
          title={status || `Select Project Status`}
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="pending">pending</Dropdown.Item>
          <Dropdown.Item eventKey="approved">approved</Dropdown.Item>
          <Dropdown.Item eventKey="hold">hold</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title={projectStatus || `Select Project Status`}
          onSelect={handleSelectProjectStatus}
          style={{ marginTop: "10px" }}
        >
          <Dropdown.Item eventKey="booked">booked</Dropdown.Item>
          <Dropdown.Item eventKey="sold">sold</Dropdown.Item>
          <Dropdown.Item eventKey="available">available</Dropdown.Item>
        </DropdownButton>
        <p>Property Area</p>
        <input
          type="number"
          onChange={(e) => setArea(e.target.value)}
          placeholder={area}
        />
        <p>Property Price</p>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder={price}
        />
      </form>
      <button
        style={{
          backgroundColor: "yellow",
          marginTop: "20px",
          marginRight: "3%",
        }}
        onClick={props.handleClose}
      >
        Close
      </button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
