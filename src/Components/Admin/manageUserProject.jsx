import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./admin.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import UserProjectCard from "./userProjectCard";
import {
  userProjectActions,
  userProjectSelector,
} from "../../Redux/userProjectReducer/userProjectReducer";

export default function ManageUserProject() {
  const dispatch = useDispatch();
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

  return (
    <>
      <div className={styles.projectHead}>
        {" "}
        <h2 style={{ marginTop: "25px" }}>User Projects</h2>
      </div>
      <div className={styles.cardContainer}>
        {loadedProjects.length > 0 &&
          loadedProjects.map((item, id) => (
            <UserProjectCard key={id} id={id} project={item} />
          ))}
      </div>
    </>
  );
}
