import React, { useState } from "react";
import styles from "./admin.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function NewProject(props) {
  // const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [totalPlot, setTotal] = useState();
  const [first, setFirst] = useState(0);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  async function uploadProject(obj) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "projects", name), obj);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (!url) {
      alert("Please select a valid image and click upload");
      return;
    }
    // Initialize an array to store plot objects
    const array = [];

    // Loop to generate plot objects based on totalPlot and first
    for (let i = first; i < totalPlot + first; i++) {
      const plot = {
        id: `${prefix}-${i}`,
        status: "available",
      };
      array.push(plot);
    }

    // Create the project object
    const obj = {
      name: name,
      image: url,
      location: location,
      plots: array,
      status: props.type || "approved",
      type: "colony",
    };
    alert(
      props.type
        ? `New Project ${name} is pending for approval.Once approved will be visible in the project section`
        : `New Project ${name} has been added`
    );
    // You can perform further actions with the project object here
    uploadProject(obj);
  }
  function handleUplaod() {
    if (!file) {
      alert("Please select a valid image");
      return;
    }
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then(() =>
      getDownloadURL(ref(storage, `images/${file.name}`)).then((url) => {
        setUrl(url);
      })
    );
  }

  return (
    <div>
      <h2 style={{ marginTop: "25px", color: "orangered" }}>Add New Project</h2>
      <div>
        <h4>Upload Image</h4>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <img
          className={styles.asideIcon}
          src={url ? "/images/upload.png" : "/images/remove.png"}
          alt=""
        />
        <button onClick={handleUplaod}>Upload</button>
        <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
          <h4>Enter Project Name</h4>
          <input
            type="text"
            required
            placeholder="Project Name"
            className={props.type ? styles.inputFieldUser : styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h4>Enter Location</h4>
          <input
            type="text"
            required
            placeholder="Location"
            className={props.type ? styles.inputFieldUser : styles.inputField}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <>
            <h4>Provide Plot Name Prefix</h4>
            <input
              type="text"
              placeholder="Prefix for eg-a,e,g (Optional)"
              className={props.type ? styles.inputFieldUser : styles.inputField}
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <h4>Total Number Of Plots</h4>
            <input
              type="number"
              placeholder="Total plots (Optional)"
              className={props.type ? styles.inputFieldUser : styles.inputField}
              value={totalPlot}
              onChange={(e) => setTotal(parseInt(e.target.value))}
            />
            <h4>Provide First Plot Number</h4>
            <input
              type="number"
              placeholder="numbering starts from this number, default value is 0"
              className={props.type ? styles.inputFieldUser : styles.inputField}
              value={first}
              onChange={(e) => setFirst(parseInt(e.target.value))}
            />
          </>
          <div className={styles.buttonDiv}>
            <button type="submit" className={styles.submitButton}>
              Submit Details
            </button>
            {props.type && (
              <button className={styles.cancelButton} onClick={props.toggleAdd}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
