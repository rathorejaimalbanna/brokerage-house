import React, { useState } from "react";
import styles from "../Admin/admin.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import UploadPhoto from "./uploadPhoto.jsx";

export default function ShopProject(props) {
  // const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("Shop No.");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [sizeType, setSizeType] = useState();
  const [road, setRoad] = useState();
  const [dimention, setDimention] = useState();
  const [direction, setDirection] = useState();
  const [contact, setContact] = useState();
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(!show);
  }
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
      name: name,
      contact,
      image: url,
      location,
      status: "pending",
      type: "Shop",
      price,
      sizeType,
      size,
      dimention,
      direction,
      road,
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

  function handleSize(eventKey) {
    setSizeType(eventKey);
  }

  return (
    <div>
      {show && (
        <div className={styles.modalContainer}>
          <div className={styles.modalDiv}>
            <UploadPhoto
              handleUplaod={handleUplaod}
              setFile={setFile}
              handleShow={handleShow}
            />
          </div>
        </div>
      )}
      <h2 style={{ marginTop: "25px", color: "orangered" }}>
        New Shop Project
      </h2>
      <img
        className={styles.upImg}
        src={url ? url : "/images/remove.png"}
        style={{ height: url ? "150px" : "30px" }}
        alt=""
      />
      <Button onClick={handleShow}>
        {url ? "Change Image" : "Upload Image"}
      </Button>
      <div>
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
          <h4>Enter Shop Number</h4>
          <input
            type="text"
            required
            placeholder="Project Name(Shop Number)"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h4>Enter Address</h4>
          <input
            type="text"
            required
            placeholder="Address"
            className={styles.inputField}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <h4>Provide Shop size</h4>
          <DropdownButton
            id="dropdown-button"
            title={sizeType || "Select size measurment unit"}
            onSelect={handleSize}
            style={{ marginTop: "10px" }}
          >
            <Dropdown.Item eventKey={"Sq. Feet"}>Sq. Feet</Dropdown.Item>
            <Dropdown.Item eventKey={"Sq. Yard"}>Sq. Yards</Dropdown.Item>
          </DropdownButton>
          <input
            style={{ marginTop: "10px" }}
            required
            type="number"
            placeholder="Size in selected dimentions"
            className={styles.inputField}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <h4>Front Road Size in feets</h4>
          <input
            required
            type="number"
            placeholder="Enter road size"
            className={styles.inputField}
            value={road}
            onChange={(e) => setRoad(e.target.value)}
          />
          <h4>Shop Dimensions</h4>
          <input
            required
            type="text"
            placeholder="Enter dimentions"
            className={styles.inputField}
            value={dimention}
            onChange={(e) => setDimention(e.target.value)}
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
