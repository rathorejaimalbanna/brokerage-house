import React, { useEffect } from "react";
import styles from "./home.module.css";
import FormData from "./FormData";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

// SignIn component renders the sign-up form
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        navigate("/");
      }
    });
  }, [navigate]);
  return (
    <div className={styles.signIn}>
      <div className={styles.formDiv}>
        {/* Render sign-up form */}
        <FormData />
      </div>
    </div>
  );
}
