import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../../Redux/userReducer/userReducer";
import { Button } from "react-bootstrap";
import UploadPhoto from "../Dashboard/uploadPhoto";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import styles from "../Admin/admin.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import App from "./auth2";

export default function Profile() {
  const { user } = useSelector(userSelector);
  const [show, setShow] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(user.imageUrl);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const navigate = useNavigate();
  const [phone, setPhone] = useState(user.phone);
  const dispatch = useDispatch();
  function handleShow() {
    setShow(!show);
  }
  function handleShowPhone() {
    setShowPhone(!showPhone);
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
  async function handleSave() {
    dispatch(
      userActions.editProfile({
        phone,
        imageUrl: url ? url : user.imageUrl,
        address,
        name,
      })
    );
    const frankDocRef = doc(db, "userData", user.email);
    await updateDoc(frankDocRef, {
      imageUrl: url,
      phone,
      name,
      address,
    });
    navigate("/");
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
      {showPhone && (
        <div className={styles.modalContainer}>
          <div className={styles.modalDiv}>
            <App
              type="profile"
              setPhone={setPhone}
              handleShowPhone={handleShowPhone}
            />
          </div>
        </div>
      )}
      <h2
        style={{ marginTop: "20px", color: "orangered", marginBottom: "20px" }}
      >
        My Profile
      </h2>
      <h5>Change Profile Photo</h5>
      <img
        className={styles.upImg}
        src={url ? url : "/images/remove.png"}
        style={{
          height: url ? "150px" : "30px",
          borderRadius: "15px",
          marginTop: url ? "10px" : "0",
        }}
        alt=""
      />
      <Button onClick={handleShow}>
        {url ? "Change Image" : "Upload Image"}
      </Button>
      <h5 style={{ marginTop: "20px" }}>Name</h5>
      <input
        onChange={(e) => setName(e.target.value)}
        className={styles.inputField}
        type="text"
        value={name}
      />
      <h5 style={{ marginTop: "20px" }}>Address</h5>
      <input
        onChange={(e) => setAddress(e.target.value)}
        className={styles.inputField}
        type="text"
        value={address}
      />
      <h5 style={{ marginTop: "20px" }}>Phone Number</h5>
      <p>{user.phone}</p>
      <button onClick={handleShowPhone}>Edit phone</button>
      <Button
        onClick={handleSave}
        style={{ display: "block", marginTop: "20px" }}
      >
        Save Changes
      </Button>
    </div>
  );
}
