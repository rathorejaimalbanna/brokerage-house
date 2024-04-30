import React, { useEffect } from "react";
import styles from "./pages.module.css"
import ProjectCard from "./card";
import { useDispatch, useSelector } from "react-redux";
import { projectActions, projectSelectors } from "../../Redux/projectReducer/projectReducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Project() {
  const dispatch = useDispatch()

  useEffect(()=>{
    async function getData(){
    const docRef = doc(db, "projects", "All_Projects");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch(projectActions.loadProject(docSnap.data().projectList));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }}
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
