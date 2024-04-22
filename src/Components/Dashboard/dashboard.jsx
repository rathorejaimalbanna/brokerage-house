import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Outlet, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import styles from "./dashboard.module.css";
import Aside from "./aside";

export default function Dashboard() {
  const navigate = useNavigate();

  async function fetchDdata(email) {
    const docRef = doc(db, "userData", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Update user data using dispatch and navigate to home page
      // dispatch(userActions.addUser(docSnap.data()));
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
        <Outlet userData={"userData string"}/>
      </div>
    </div>
  );
}
