import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { projectSelectors } from "../../Redux/projectReducer/projectReducer";
import styles from "./pages.module.css";

export default function ProjectDetails() {
  const params = useParams();
  const loadedProjects = useSelector(projectSelectors);
  const project = loadedProjects[params.id];

  if (project) {
    return (
      <>
        <div>
          <h1 style={{ marginTop: "25px", color: "rgb(13,110,253)" }}>
            {project.name}
          </h1>
          <img className={styles.projectImg} src={project.image} alt="" />
          <div>
            <h3>Indications</h3>
            <p>
              <span
                className={styles.indiSpan}
                style={{ backgroundColor: "lightgreen" }}
              ></span><span>Available</span>
            </p>
            <p>
              <span
                className={styles.indiSpan}
                style={{ backgroundColor: "red" }}
              ></span><span>Sold</span>
            </p>
            <p>
              <span
                className={styles.indiSpan}
                style={{ backgroundColor: "yellow" }}
              > </span><span>Booked</span>
            </p>
          </div>
          <div className={styles.plotsDiv}>
            {project.plots.map((item) => (
              <div
                className={styles.plotDiv}
                style={{
                  backgroundColor:
                    item.status === "sold"
                      ? "red"
                      : item.status === "booked"
                      ? "yellow"
                      : "lightgreen",
                }}
              >
                <h5>{item.id}</h5>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
