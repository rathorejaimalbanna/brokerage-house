import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { projectActions } from "../../Redux/projectReducer/projectReducer";

export default function Modal(props) {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch()
  async function updatePlot(array) {
    const frankDocRef = doc(db, "projects", props.project.name);
    await updateDoc(frankDocRef, {
      plots: array,
    });
  }


  useEffect(() => {
    const plotStatus = props.project.plots[props.plotId];
    setStatus(plotStatus.status);
  }, [props.plotId, props.project.plots]);
  function handleSubmit() {
    var plotsObject = [...props.project.plots];
    plotsObject[props.plotId] = {
      id: plotsObject[props.plotId].id,
      status: status,
    };
    updatePlot(plotsObject);
    dispatch(projectActions.editPlots({plot:plotsObject,plotId:props.plotId,projectId:props.projectId}))
    props.handleClose();
  }
  function handleDelete() {
    alert(`Plot with id ${props.project.plots[props.plotId].id} is deleted`)
    var plotsObject = [...props.project.plots];
    plotsObject.splice(props.plotId, 1);
    updatePlot(plotsObject);
    dispatch(projectActions.editPlots({plot:plotsObject,projectId:props.projectId}))
    props.handleClose();
  }
  return (
    <div>
      <h2>Edit Plot Details</h2>
      <form action="" onSubmit={handleSubmit}>
        <p>Change Status</p>
        <input
          type="text"
          defaultValue={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </form>
      <button
        style={{ backgroundColor: "yellow", marginTop: "20px",marginRight:"3%"}}
        onClick={props.handleClose}
      >
        Close
      </button>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleDelete} style={{ backgroundColor: "red",marginLeft:"40%",color:"white" }}>
        Delete Plot
      </button>
    </div>
  );
}
