import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Outlet, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import styles from "./dashboard.module.css";
import Aside from "./aside";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../../Redux/userReducer/userReducer";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(userSelector)

  async function fetchDdata(email) {
    const docRef = doc(db, "userData", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Update user data using dispatch and navigate to home page
      dispatch(userActions.setUser(docSnap.data()));
    } else {
      // Alert for invalid credentials
      navigate("home");
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchDdata(user.email);
      } else {
        // User is signed out
        navigate("/home");
      }
    });
  });


  return (
    <div className={styles.mainDiv}>
      <div className={styles.asideDiv}>
        <Aside />
      </div>
      <div className={styles.contentDiv}>
      <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          {user?.name}
        </span>
      </div>
        <Outlet userData={"userData string"}/>
      </div>
    </div>
  );
}
