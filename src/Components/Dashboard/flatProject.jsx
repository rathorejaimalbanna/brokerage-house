import React, { useState } from "react";
import styles from "../Admin/admin.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function FlatProject(props) {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [price, setPrice] = useState();
  const [villaType, setVillaType] = useState();
  const [floor, setFloor] = useState();
  const [direction, setDirection] = useState();
  const [contact, setContact] = useState();
  async function uploadProject(obj) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "userProjects", name), obj);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (!url) {
      alert("Please select a valid image and click upload");
      return;
    }

    // Create the project object
    const obj = {
      name,
      contact,
      image: url,
      location,
      status: "pending",
      type: "Flat",
      price,
      sizeType: "",
      specs: villaType,
      direction,
      floor,
      projectStatus: "available",
    };
    alert(
      `New Project ${name} is pending for approval.Once approved will be visible in the project section`
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

  function handleSelect(eventKey) {
    setVillaType(eventKey);
  }
  return (
    <div>
      <h2 style={{ marginTop: "25px", color: "orangered" }}>
        New Flat Project
      </h2>
      <div>
        <h4>Upload Image</h4>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <img
          className={styles.upImg}
          src={url ? "/images/upload.png" : "/images/remove.png"}
          alt=""
        />
        <button onClick={handleUplaod}>Upload</button>
        <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>
          <h4>Enter Your Contact Details</h4>
          <input
            type="number"
            required
            placeholder="Contact Details"
            className={styles.inputField}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <h4>Enter Society Name And Flat Number</h4>
          <input
            type="text"
            required
            placeholder="Project Name"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h4>Enter Floor Number</h4>
          <input
            type="text"
            required
            placeholder="Floor Number"
            className={styles.inputField}
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />

          <DropdownButton
            id="dropdown-button"
            title={villaType || "Select Flat Type"}
            onSelect={handleSelect}
            style={{ marginTop: "10px" }}
          >
            <Dropdown.Item eventKey={"1Bhk"}>1Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"2Bhk"}>2Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"3Bhk"}>3Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"4Bhk"}>4Bhk</Dropdown.Item>
          </DropdownButton>
          <h4>Enter Location</h4>
          <input
            type="text"
            required
            placeholder="Location"
            className={styles.inputField}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <h4>Facing Direction</h4>
          <input
            required
            type="text"
            placeholder="Enter direction"
            className={styles.inputField}
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          />
          <h4> Demand price</h4>
          <input
            required
            type="number"
            placeholder="Enter Price"
            className={styles.inputField}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <br />
          <input
            style={{ marginRight: "10px", marginTop: "10px" }}
            required
            type="checkbox"
            value="Aggrement"
          />
          <label for="vehicle1">
            Agree all the terms and conditions mentioned{" "}
            <span style={{ color: "red" }}>here</span>{" "}
          </label>
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
