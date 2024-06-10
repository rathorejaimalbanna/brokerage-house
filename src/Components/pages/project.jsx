import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import ProjectCard from "./card";
import { useDispatch, useSelector } from "react-redux";
import {
  projectActions,
  projectSelectors,
} from "../../Redux/projectReducer/projectReducer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import NewProject from "../Admin/newProject";

export default function Project() {
  const dispatch = useDispatch();
  const [addProject, setAddProject] = useState(false);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "projects"));
      // const data = querySnapshot.map((doc)=> doc.data())
      const userArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userArray.push({ ...doc.data() });
      });
      dispatch(projectActions.loadProject(userArray));
    }
    getData();
  }, [dispatch]);
  function toggleAdd() {
    setAddProject(!addProject);
  }

  const loadedProjects = useSelector(projectSelectors);

  return (
    <>
      {addProject && (
        <div className={styles.modalContainer}>
          {" "}
          <div className={styles.modalDiv}>
            <NewProject type="user" toggleAdd={toggleAdd} />
          </div>
        </div>
      )}
      <div className={styles.addProjectDiv}>
        <h2 style={{ marginTop: "25px" }}>Projects</h2>
        <button className={styles.addProjectButton} onClick={toggleAdd}>
          <img
            src="/images/building.png"
            alt="+"
            className={styles.addProjectIcon}
          />
          Add Your Project
        </button>
      </div>

      <div className={styles.cardContainer}>
        {loadedProjects.length > 0 &&
          loadedProjects.map(
            (item, id) =>
              item.status === "approved" && (
                <ProjectCard type="project" key={id} id={id} project={item} />
              )
          )}
      </div>
    </>
  );
}
