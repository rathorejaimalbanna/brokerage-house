import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styles from "./admin.module.css";
import { projectSelectors } from "../../Redux/projectReducer/projectReducer";
import Modal from "./Modal";

export default function EditProject() {
  const params = useParams();
  const loadedProjects = useSelector(projectSelectors);
  const project = loadedProjects[params.id];
  const [show,setShow] = useState(false);
  const [plotId,setPlotId] = useState("")
  function handlePlotEdit(index)
  { setPlotId(index)
    setShow(true)
  };
  function handleClose()
  {
    setShow(false)
  }

  if (project) {
    return (
      <>{show && <div className={styles.modalContainer}> <div className={styles.modalDiv}>
      <Modal projectId={params.id} project={project} plotId={plotId} handleClose={handleClose}  />
    </div></div>}
        <div>
          <h1 style={{ marginTop: "25px", color: "rgb(13,110,253)" }}>
            {project.name}
          </h1>
          <img className={styles.projectImg} src={project.image} alt="" />
          <div style={{marginTop:"25px"}}>
            <h3>Indications: </h3>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <p>
              <span
                className={styles.indiSpan}
                style={{ backgroundColor: "lightgreen" }}
              ></span>Available
            </p>
            <p>
              <span
                className={styles.indiSpan}
                style={{ backgroundColor: "red" }}
              ></span>Sold
            </p>
            <p>
              <span
                className={styles.indiSpan}
                style={{ backgroundColor: "yellow" }}
              > </span>Booked
            </p>
            </div>
          </div>
          <div className={styles.plotsDiv}>
            {project.plots.map((item,index) => (
              <div
                key={index}
                className={styles.plotDiv}
                onClick={()=>handlePlotEdit(index)}
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
