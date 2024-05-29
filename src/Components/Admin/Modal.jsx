import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { projectActions } from "../../Redux/projectReducer/projectReducer";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function Modal(props) {
  const [status, setStatus] = useState("");
  const [area, setArea] = useState(0)
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch();
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
      price,
      area,
    };
    updatePlot(plotsObject);
    dispatch(
      projectActions.editPlots({
        plot: plotsObject,
        plotId: props.plotId,
        projectId: props.projectId,
      })
    );
    props.handleClose();
  }
  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to delete plot with id ${
          props.project.plots[props.plotId].id
        }?`
      )
    ) {
      var plotsObject = [...props.project.plots];
      plotsObject.splice(props.plotId, 1);
      updatePlot(plotsObject);
      dispatch(
        projectActions.editPlots({
          plot: plotsObject,
          projectId: props.projectId,
        })
      );
    }
    props.handleClose();
  }
  const handleSelect = (eventKey) => {
    setStatus(eventKey);
  };
  return (
    <div>
      <h2>Edit Plot Details</h2>
      <form action="" onSubmit={handleSubmit}>
        <p>Change Status</p>

        <DropdownButton
          id="dropdown-basic-button"
          title={`Select Plot Status`}
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="booked">booked</Dropdown.Item>
          <Dropdown.Item eventKey="sold">sold</Dropdown.Item>
          <Dropdown.Item eventKey="available">available</Dropdown.Item>
        </DropdownButton>
      <p>Plot Area</p>
      <input type="number" onChange={(e)=>setArea(e.target.value)} placeholder="Plot Area in yards" />
      <p>Plot Price</p>
      <input type="number" onChange={(e)=> setPrice(e.target.value)} placeholder="Plot Price" />
      </form>
      <button
        style={{
          backgroundColor: "yellow",
          marginTop: "20px",
          marginRight: "3%",
        }}
        onClick={props.handleClose}
      >
        Close
      </button>
      <button onClick={handleSubmit}>Submit</button>
      <button
        onClick={handleDelete}
        style={{ backgroundColor: "red", marginLeft: "40%", color: "white" }}
      >
        Delete Plot
      </button>
    </div>
  );
}
