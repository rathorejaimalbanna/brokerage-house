import React from "react";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router";

export default function SelectType(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h4>Select Project Type</h4>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          className={styles.typeButton}
          onClick={() => navigate("/villaProject")}
        >
          Villa
        </button>
        <button
          className={styles.typeButton}
          onClick={() => navigate("/flatProject")}
        >
          Flat
        </button>
        <button
          className={styles.typeButton}
          onClick={() => navigate("/plotProject")}
        >
          Plot
        </button>
        <button
          className={styles.typeButton}
          onClick={() => navigate("/shopProject")}
        >
          Shop
        </button>
        <button
          className={styles.typeButton}
          onClick={() => navigate("/farmProject")}
        >
          Farm House
        </button>
        <button
          className={styles.typeButton}
          onClick={props.toggleAdd}
          style={{ backgroundColor: "orangered", color: "white" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
