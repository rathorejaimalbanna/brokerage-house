import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./pages.module.css";
import { userProjectSelector } from "../../Redux/userProjectReducer/userProjectReducer";
import UserBookModal from "./userBookModal";

export default function UserProjectDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const params = useParams();
  const loadedProjects = useSelector(userProjectSelector);
  const projects = loadedProjects.filter((item) => item.name === params.id);
  const project = projects[0];
  const [show, setShow] = useState(false);
  function handlePropertyEdit() {
    if (project.projectStatus !== "available") {
      alert(`Property ${params.id} not available for sale`);
      return;
    }
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
              <UserBookModal
                projectId={params.id}
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
                width: "230px",
              }}
            >
              <h5>Book Property</h5>
            </div>
          </div>
          <div>
            <h3 style={{ color: "rgb(0,123,255)" }}>Property Details</h3>
            <br />
            <h5>Type: {project.type}</h5>
            <h5>Location: {project.location}</h5>

            {project.specs && <h5>Floor:{project.specs} </h5>}
            {project.floor && <h5>Floor:{project.floor} </h5>}
            {project.size && (
              <h5>
                Size: {project.size || "N/A"}
                {project.sizeType}
              </h5>
            )}
            {project.dimention && (
              <h5>Dimentions: {project.dimention || "N/A"}</h5>
            )}
            {project.road && <h5>Front Road: {project.road || "N/A"}</h5>}
            {project.backRoad && <h5>Back Road: {project.backRoad}</h5>}
            <h5>Direction: {project.direction}</h5>
            <h5>Price: {project.price}</h5>
            {project.furType && <h5>Furnished Type: {project.furType}</h5>}
            {project.corner && <h5>Corner/Non Corner: {project.corner}</h5>}
          </div>
        </div>
      </>
    );
  }
}
