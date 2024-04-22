import React from "react";
import styles from "./pages.module.css"

export default function Bonus() {
  return (
    <>
      <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="User" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
      </div>
      <h2 style={{ marginTop: "25px" }}>Referral Bonous</h2>
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
          <h5>Last Referral Bonous</h5>
          <h3>&#8377; 0</h3>
        </div>
      </div>
    </>
  );
}
