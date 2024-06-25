import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  projectActions,
  projectSelectors,
} from "../../Redux/projectReducer/projectReducer";
import ProjectCard from "./card";
import styles from "./pages.module.css";
import SelectType from "../Dashboard/selectType";
import {
  userProjectActions,
  userProjectSelector,
} from "../../Redux/userProjectReducer/userProjectReducer";

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
        dispatch(projectActions.loadProject([...userArray]));
        const querySnapshot2 = await getDocs(collection(db, "userProjects"));
        const userArray2 = querySnapshot2.docs.map((doc) => ({
          id: doc.id, // Ensure unique identifier
          ...doc.data(),
        }));
        dispatch(userProjectActions.loadProject([...userArray2]));
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

  const loadedProjects1 = useSelector(projectSelectors);
  const loadedProjects2 = useSelector(userProjectSelector);

  // Filter projects based on search term and project status
  const filteredProjects = useMemo(() => {
    const loadedProjects = [...loadedProjects1, ...loadedProjects2];
    return loadedProjects.filter(
      (project) =>
        project.status === "approved" &&
        project.location
          ?.toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
    );
  }, [loadedProjects1, loadedProjects2, searchTerm]);

  return (
    <>
      {addProject && (
        <div className={styles.modalContainer}>
          <div className={styles.modalDiv}>
            <SelectType type="user" toggleAdd={toggleAdd} />
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
