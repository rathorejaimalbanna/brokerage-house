import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { projectActions, projectSelectors } from '../../Redux/projectReducer/projectReducer';
import styles from "./admin.module.css"
import ProjectCard from '../pages/card';
import { collection,  getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router';

export default function AddProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
     <div className={styles.projectHead}> <h2 style={{ marginTop: "25px" }}>Projects</h2><button className={styles.buildingButton} onClick={()=> navigate("/admin/newProject")}><img className={styles.building} src="/images/building.png" alt="" /> Add New Project</button></div>
      <div className={styles.cardContainer}>
        {
          loadedProjects.length>0 &&(loadedProjects.map((item,id)=> <ProjectCard type="add" key={id} id={id} project={item}/>))
        }
      </div>
    </>
  );
}
