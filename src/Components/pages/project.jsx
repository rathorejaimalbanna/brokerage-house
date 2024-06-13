import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  projectActions,
  projectSelectors,
} from "../../Redux/projectReducer/projectReducer";
import ProjectCard from "./card";
import NewProject from "../Admin/newProject";
import styles from "./pages.module.css";

export default function Project() {
  const dispatch = useDispatch();
  const [addProject, setAddProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const userArray = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Ensure unique identifier
          ...doc.data(),
        }));
        dispatch(projectActions.loadProject(userArray));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    getData();
  }, [dispatch]);

  const toggleAdd = useCallback(() => {
    setAddProject((prevAddProject) => !prevAddProject);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadedProjects = useSelector(projectSelectors);

  // Filter projects based on search term and project status
  const filteredProjects = useMemo(() => {
    return loadedProjects.filter(
      (project) =>
        project.status === "approved" &&
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [loadedProjects, searchTerm]);

  return (
    <>
      {addProject && (
        <div className={styles.modalContainer}>
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

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.cardContainer}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((item, id) => (
            <ProjectCard type="project" key={id} id={id} project={item} />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
}
