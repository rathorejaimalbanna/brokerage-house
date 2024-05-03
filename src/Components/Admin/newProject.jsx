import React, { useState } from 'react';
import styles from "./admin.module.css";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../../firebase.js"

export default function NewProject() {
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [totalPlot, setTotal] = useState(0);
  const [first, setFirst] = useState(0);

  async function uploadProject(obj)
  {
// Add a new document in collection "cities"
  await setDoc(doc(db, "projects", name),obj );
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Initialize an array to store plot objects
    const array = [];
    
    // Loop to generate plot objects based on totalPlot and first
    for (let i = first; i < totalPlot + first; i++) {
      const plot = {
        id: `${prefix}-${i}`,
        status: "available"
      };
      array.push(plot);
    }

    // Create the project object
    const obj = {
      name: name,
      image: image,
      location: location,
      plots: array
    };
    alert( `New Project ${name} has been added`)
    // You can perform further actions with the project object here
    uploadProject(obj);
  }

  return (
    <div>
      <h2 style={{ marginTop: "25px", color: "orangered" }}>Add New Project</h2>
      <div>
        <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
          <h4>Enter Project Name</h4>
          <input type="text" required placeholder='Project Name' className={styles.inputField} value={name} onChange={(e) => setName(e.target.value)} />
          <h4>Input Image Url</h4>
          <input type="text" required placeholder='Image Url' className={styles.inputField} value={image} onChange={(e) => setImage(e.target.value)} />
          <h4>Enter Location</h4>
          <input type="text" required placeholder='Location' className={styles.inputField} value={location} onChange={(e) => setLocation(e.target.value)} />
          <h4>Provide Plot Name Prefix</h4>
          <input type="text" placeholder='Prefix for eg-a,e,g' className={styles.inputField} value={prefix} onChange={(e) => setPrefix(e.target.value)} />
          <h4>Total Number Of Plots</h4>
          <input type="number" placeholder='Total plots' className={styles.inputField} value={totalPlot} onChange={(e) => setTotal(parseInt(e.target.value))} />
          <h4>Provide First Plot Number</h4>
          <input type="number" placeholder='numbering starts from this number, default value is 0' className={styles.inputField} value={first} onChange={(e) => setFirst(parseInt(e.target.value))} />
          <button type="submit" className={styles.submitButton}>Submit Details</button>
        </form>
      </div>
    </div>
  )
}
