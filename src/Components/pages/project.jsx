import React from "react";
import styles from "./pages.module.css";

export default function Project() {
  return (
    <>
      <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="User" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
      </div>
      <h2 style={{ marginTop: "25px" }}>Projects</h2>
    </>
  );
}
