import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { projectActions, projectSelectors } from '../../Redux/projectReducer/projectReducer';
import styles from "./admin.module.css"
import ProjectCard from '../pages/card';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AddProject() {
  const dispatch = useDispatch()
  useEffect(()=>{
    async function getData(){
    const docRef = doc(db, "projects", "All_Projects");
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
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
     <div className={styles.projectHead}> <h2 style={{ marginTop: "25px" }}>Projects</h2><button className={styles.buildingButton}><img className={styles.building} src="/images/building.png" alt="" /> Add Project</button></div>
      <div className={styles.cardContainer}>
        {
          loadedProjects.length>0 &&(loadedProjects.map((item,id)=> <ProjectCard type="add" key={id} id={id} project={item}/>))
        }
      </div>
    </>
  );
}
