import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./admin.module.css";
import UserProjectModal from "./userProjectModal";
import { userProjectSelector } from "../../Redux/userProjectReducer/userProjectReducer";

export default function EditUserProject() {
  const params = useParams();
  const loadedProjects = useSelector(userProjectSelector);
  const project = loadedProjects[params.id];
  const [show, setShow] = useState(false);
  function handlePropertyEdit() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  if (project) {
    return (
      <>
        {show && (
          <div className={styles.modalContainer}>
            {" "}
            <div className={styles.modalDiv}>
              <UserProjectModal
                projectId={params.id}
                loadedProjects={loadedProjects}
                project={project}
                handleClose={handleClose}
              />
            </div>
          </div>
        )}
        <div>
          <h1 style={{ marginTop: "25px", color: "rgb(13,110,253)" }}>
            {project.name}
          </h1>
          <img className={styles.projectImg} src={project.image} alt="" />
          <div style={{ marginTop: "25px" }}>
            <h3>Indications: </h3>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <p>
                <span
                  className={styles.indiSpan}
                  style={{ backgroundColor: "lightgreen" }}
                ></span>
                Available
              </p>
              <p>
                <span
                  className={styles.indiSpan}
                  style={{ backgroundColor: "red" }}
                ></span>
                Sold
              </p>
              <p>
                <span
                  className={styles.indiSpan}
                  style={{ backgroundColor: "yellow" }}
                >
                  {" "}
                </span>
                Booked
              </p>
            </div>
          </div>
          <div className={styles.plotsDiv}>
            <div
              className={styles.plotDiv}
              onClick={() => handlePropertyEdit()}
              style={{
                backgroundColor:
                  project.projectStatus === "sold"
                    ? "red"
                    : project.projectStatus === "booked"
                    ? "yellow"
                    : "lightgreen",
              }}
            >
              <h5>Edit Details</h5>
            </div>
          </div>
          <div>
            <h3 style={{ color: "rgb(0,123,255)" }}>Property Details</h3>
            <br />
            <h5>Type: {project.type}</h5>
            <h5>Location: {project.location}</h5>
            <h5>Specs: {project.specs || "N/A"}</h5>
            <h5>Floor: {project.floor || "N/A"}</h5>
            <h5>Size: {project.size || "N/A"}</h5>
            <h5>Dimentions: {project.dimention || "N/A"}</h5>
            <h5>Road: {project.road || "N/A"}</h5>
            <h5>Direction: {project.direction}</h5>
            <h5>Price: {project.price}</h5>
          </div>
        </div>
      </>
    );
  }
}
