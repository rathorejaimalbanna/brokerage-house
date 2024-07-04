import React, { useState } from "react";
import styles from "../Admin/admin.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import UploadPhoto from "./uploadPhoto.jsx";
import UploadPhotoArray from "./UploadPhotoArray.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  if (images.length === 0) {
    return <div>No images available</div>;
  }

  if (images.length === 1) {
    // Return a single image if there's only one in the array
    return (
      <div style={{ textAlign: "center" }}>
        <img
          src={images[0]}
          alt="Single slide"
          style={{ objectFit: "contain", height: "100px" }}
        />
      </div>
    );
  }

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{ width: "100px", height: "150px", marginLeft: "45%" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default function PlotProject(props) {
  // const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
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
  const [showImgArr, setShowImgArr] = useState(false);
  const [imgArray, setImgArray] = useState([]);
  function handleShow() {
    if (!show) {
      setFile(null);
    }
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
      type: "Plot",
      price,
      sizeType,
      size,
      dimention,
      direction,
      road,
      projectStatus: "available",
      imgArray,
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
  async function handleUplaodArray() {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    try {
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);

      // Functional update to setImgArray to ensure the latest state is used
      setImgArray((prevArray) => [...prevArray, url]);
    } catch (error) {
      alert("There was an error uploading the image. Please try again.");
    }
  }

  function ShowImgArr() {
    if (!showImgArr) {
      setFile(null);
    }
    setShowImgArr(!showImgArr);
  }

  function handleSize(eventKey) {
    setSizeType(eventKey);
  }

  return (
    <>
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
      {showImgArr && (
        <div className={styles.modalContainer}>
          <div className={styles.modalDiv}>
            <UploadPhotoArray
              handleUplaodArray={handleUplaodArray}
              handleShow={ShowImgArr}
              setFile={setFile}
            />
          </div>
        </div>
      )}
      <div>
        <h2 style={{ marginTop: "25px", color: "orangered" }}>
          New Plot Project
        </h2>
        <h4>Main Image</h4>
        <img
          className={styles.upImg}
          src={url ? url : "/images/remove.png"}
          style={{ height: url ? "150px" : "30px" }}
          alt=""
        />
        <Button onClick={handleShow}>
          {url ? "Change Image" : "Upload Image"}
        </Button>
        <h4>Additional Photos (Optional)</h4>
        <Button
          style={{ marginRight: "10px", marginBottom: "8px" }}
          onClick={ShowImgArr}
        >
          Upload Image1
        </Button>
        <Button
          style={{ marginRight: "10px", marginBottom: "8px" }}
          onClick={ShowImgArr}
        >
          Upload Image2
        </Button>
        <Button style={{ marginRight: "10px" }} onClick={ShowImgArr}>
          Upload Image3
        </Button>
        <Button onClick={ShowImgArr}>Upload Image4</Button>
        <div>
          <h2>Image Slider</h2>
          <ImageSlider images={imgArray} />
        </div>
        <br />
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
            <h4>Enter Plot Name(Number)</h4>
            <input
              type="text"
              required
              placeholder="Project Name (Plot Number) "
              className={styles.inputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <h4>Enter Location</h4>
            <input
              type="text"
              required
              placeholder="Location"
              className={styles.inputField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <h4>Provide Plot size</h4>
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
            <h4>Plot Dimensions</h4>
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
                <button
                  className={styles.cancelButton}
                  onClick={props.toggleAdd}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
