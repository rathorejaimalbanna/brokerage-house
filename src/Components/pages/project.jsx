import React, { useEffect } from "react";
import styles from "./pages.module.css"
import ProjectCard from "./card";
import { useDispatch, useSelector } from "react-redux";
import { projectActions, projectSelectors } from "../../Redux/projectReducer/projectReducer";
import { collection,  getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Project() {
  const dispatch = useDispatch()

  useEffect(()=>{
    async function getData()
    {const querySnapshot = await getDocs(collection(db, "projects"));
      // const data = querySnapshot.map((doc)=> doc.data())
      const userArray = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userArray.push({...doc.data()});
      });
      dispatch(projectActions.loadProject(userArray))
    }
    getData()
  },[dispatch])

  
  const loadedProjects = useSelector(projectSelectors)

  return (
    <>
      <h2 style={{ marginTop: "25px" }}>Projects</h2>
      <div className={styles.cardContainer}>
        {
          loadedProjects.length>0 &&(loadedProjects.map((item,id)=> <ProjectCard type="project" key={id} id={id} project={item}/>))
        }
      </div>
    </>
  );
}
