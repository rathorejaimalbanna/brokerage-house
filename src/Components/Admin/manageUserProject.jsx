import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./admin.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import UserProjectCard from "./userProjectCard";
import {
  userProjectActions,
  userProjectSelector,
} from "../../Redux/userProjectReducer/userProjectReducer";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function ManageUserProject() {
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState(null);
  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "userProjects"));
      // const data = querySnapshot.map((doc)=> doc.data())
      const userArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userArray.push({ ...doc.data() });
      });
      dispatch(userProjectActions.loadProject(userArray));
    }
    getData();
  }, [dispatch]);
  const loadedProjects = useSelector(userProjectSelector);

  const filteredProjects = searchType
    ? loadedProjects.filter((project) => project.status === searchType)
    : loadedProjects;

  function handleSelect(eventKey) {
    setSearchType(eventKey);
  }

  return (
    <>
      <div className={styles.projectHead}>
        {" "}
        <h2 style={{ marginTop: "25px" }}>User Projects</h2>
      </div>
      <div className={styles.searchContainer}>
        <DropdownButton
          id="dropdown-button"
          title={searchType || "Search By Property Status"}
          onSelect={handleSelect}
          style={{ marginTop: "10px" }}
        >
          <Dropdown.Item eventKey={"approved"}>Approved</Dropdown.Item>
          <Dropdown.Item eventKey={"pending"}>Pending</Dropdown.Item>
          <Dropdown.Item eventKey={"hold"}>Hold</Dropdown.Item>
          <Dropdown.Item eventKey={null}>No Filter</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className={styles.cardContainer}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((item, id) => (
            <UserProjectCard key={id} id={id} project={item} />
          ))
        ) : (
          <p>No projects found for this status</p>
        )}
      </div>
    </>
  );
}
