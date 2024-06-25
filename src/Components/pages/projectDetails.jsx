import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { projectSelectors } from "../../Redux/projectReducer/projectReducer";
import styles from "./pages.module.css";
import BookModal from "./bookModal";
import PlotDetails from "./plotDetails";

export default function ProjectDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [show, setShow] = useState(false);
  const [plotInfo, setPlotInfo] = useState(false);
  const [plotModalDetail, setModalDetail] = useState({});
  const params = useParams();
  const loadedProjects = useSelector(projectSelectors);
  const listProject = loadedProjects.filter(
    (pro, id) => pro.name === params.id
  );
  const project = listProject[0];
  const projectId = loadedProjects.indexOf(project);
  function handleShow() {
    setShow(true);
    setPlotInfo(false);
  }
  function handleClose() {
    setShow(false);
  }
  function handleCloseInfo() {
    setPlotInfo(false);
  }
  function showInfo(info) {
    setModalDetail(info);
    setPlotInfo(true);
  }

  if (project) {
    return (
      <>
        {plotInfo && (
          <div className={styles.modalContainer}>
            {" "}
            <div className={styles.modalDiv}>
              <PlotDetails
                handleCloseInfo={handleCloseInfo}
                handleShow={handleShow}
                plotDetail={plotModalDetail}
                projectName={project.name}
                projectLocation={project.location}
                handleClose={handleClose}
              />
            </div>
          </div>
        )}
        {show && (
          <div className={styles.modalContainer}>
            {" "}
            <div className={styles.modalDiv}>
              <BookModal
                projectId={projectId}
                project={project}
                plotDetail={plotModalDetail}
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
          <div style={{ marginTop: "20px" }}>
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
            {project.plots.map((item, arrId) => (
              <div
                onClick={() =>
                  showInfo({
                    price: item.price,
                    area: item.area,
                    id: item.id,
                    arrId: arrId,
                    status: item.status,
                  })
                }
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
