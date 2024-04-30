import React from "react";
import styles from "./pages.module.css"

export default function Bonus() {
  return (
    <>
      <h2 style={{ marginTop: "25px" }}>Prospect Bonus</h2>
      <div className={styles.bonusDiv}>
        <div className={styles.infoDiv}>
        <h5>Total Bonus</h5>
        <h3>&#8377; 0</h3>
        </div>
        <div className={styles.infoDiv}>
          <h5>Joining Bonus</h5>
          <h3>&#8377; 11000 </h3>
        </div>
        <div className={styles.infoDiv}>
          <h5>Profit Bonus</h5>
          <h3>&#8377; 0</h3>
        </div>
        <div className={styles.infoDiv}>
          <h5>Badge Bonus</h5>
          <h3>&#8377; 0</h3>
        </div>
        <div className={styles.infoDiv}>
          <h5>Last Prospect Bonus</h5>
          <h3>&#8377; 0</h3>
        </div>
      </div>
    </>
  );
}
