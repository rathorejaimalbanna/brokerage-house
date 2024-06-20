import React from "react";
import Auth from "./auth";
import styles from "./pages.module.css";
import { useParams } from "react-router";

const App = () => {
  const params = useParams();
  return (
    <div className={styles.authDiv}>
      <h2 style={{ marginBottom: "20px" }}> Verify Phone Number</h2>
      <Auth email={params.email} />
    </div>
  );
};

export default App;
