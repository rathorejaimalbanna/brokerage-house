import React, { useState } from "react";
import styles from "./admin.module.css";
import AdminAside from "./adminAside";
import { Outlet } from "react-router";
import { Button } from "react-bootstrap";

const Admin = () => {
  const [side, setSide] = useState(true);
  function handleSide() {
    setSide(!side);
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.asideDiv}>
        <AdminAside />
      </div>

      <div style={{ position: "relative" }}>
        <div className={styles.sideBar} style={{ left: side ? "0" : "-300px" }}>
          <AdminAside side handleSide={handleSide} />
        </div>
      </div>
      <div className={styles.contentDiv}>
        <div className={styles.headContent}>
          <div>
            <h2>
              <img
                className={styles.growIcon}
                src="/images/security.png"
                alt=""
              />
              Admin Dashboard
            </h2>
          </div>
          <Button
            className={styles.sideButton}
            variant="info"
            style={{ marginLeft: "20px", marginRight: "10px" }}
            onClick={handleSide}
          >
            <img
              src="/images/menu.png"
              alt="menu"
              style={{ objectFit: "contain", height: "20px" }}
            />
          </Button>
          <div className={styles.growDiv}>
            <img className={styles.growIcon} src="/images/success.png" alt="" />{" "}
            <span style={{ fontWeight: "600", fontSize: "large" }}>
              Grow On Web
            </span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
