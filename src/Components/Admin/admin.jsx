import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import AdminAside from "./adminAside";
import { Outlet } from "react-router";
import { Button } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { projectActions } from "../../Redux/projectReducer/projectReducer";
import { useDispatch } from "react-redux";

const Admin = () => {
  const [side, setSide] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "projects"));
      // const data = querySnapshot.map((doc)=> doc.data())
      const userArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        userArray.push({ ...doc.data() });
      });
      dispatch(projectActions.loadProject(userArray));
    }
    getData();
  }, [dispatch]);
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
