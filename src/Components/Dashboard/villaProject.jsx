import React, { useState } from "react";
import styles from "../Admin/admin.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import UploadPhoto from "./uploadPhoto.jsx";

export default function VillaProject(props) {
  // const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [sizeType, setSizeType] = useState();
  const [villaType, setVillaType] = useState();
  const [road, setRoad] = useState();
  const [dimention, setDimention] = useState();
  const [direction, setDirection] = useState();
  const [contact, setContact] = useState();
  const [furType, setFurType] = useState(null);
  const [corner, setCorner] = useState(null);
  const [backRoad, setBackRoad] = useState(null);
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
      type: "Villa",
      price,
      sizeType,
      specs: villaType,
      size,
      dimention,
      direction,
      road,
      projectStatus: "available",
      furType,
      corner,
      backRoad,
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
  function handleSelect(eventKey) {
    setVillaType(eventKey);
  }
  function handleSelectFurType(eventKey) {
    setFurType(eventKey);
  }
  function handleCorner(eventKey) {
    setCorner(eventKey);
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
        New Villa Project
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
          <h4>Villa name (Colony name/number)</h4>
          <input
            type="text"
            required
            placeholder="Project Name"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <DropdownButton
            id="dropdown-button"
            title={villaType || "Select Villa Type"}
            onSelect={handleSelect}
            style={{ marginTop: "10px" }}
          >
            <Dropdown.Item eventKey={"1Bhk"}>1Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"2Bhk"}>2Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"3Bhk"}>3Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"4Bhk"}>4Bhk</Dropdown.Item>
            <Dropdown.Item eventKey={"5Bhk"}>5Bhk</Dropdown.Item>
          </DropdownButton>
          <h4>Enter Address</h4>
          <input
            type="text"
            required
            placeholder="Address"
            className={styles.inputField}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <h4>Provide Villa size</h4>
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
          <h4>Back Road Size in feets</h4>
          <input
            type="number"
            placeholder="Enter back road size"
            className={styles.inputField}
            value={backRoad}
            onChange={(e) => setBackRoad(e.target.value)}
          />
          <DropdownButton
            id="dropdown-button"
            title={corner || "Corner/Non corner"}
            onSelect={handleCorner}
            style={{ marginTop: "10px" }}
          >
            <Dropdown.Item eventKey={"Corner"}>Corner</Dropdown.Item>
            <Dropdown.Item eventKey={"Non Corner"}>Non Corner</Dropdown.Item>
          </DropdownButton>
          <h4>Villa Dimensions</h4>
          <input
            required
            type="text"
            placeholder="Enter dimentions"
            className={styles.inputField}
            value={dimention}
            onChange={(e) => setDimention(e.target.value)}
          />
          <DropdownButton
            id="dropdown-button"
            title={furType || "Select Furnished Type"}
            onSelect={handleSelectFurType}
            style={{ marginTop: "10px" }}
          >
            <Dropdown.Item eventKey={"Fully Furnished"}>
              Fully Furnished
            </Dropdown.Item>
            <Dropdown.Item eventKey={"Semi Furnished"}>
              Semi Furnished
            </Dropdown.Item>
            <Dropdown.Item eventKey={"None"}>None</Dropdown.Item>
          </DropdownButton>
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
