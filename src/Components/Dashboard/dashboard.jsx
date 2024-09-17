import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import Waiting from "../pages/waiting";
import { Outlet, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import styles from "./dashboard.module.css";
import Aside from "./aside";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../../Redux/userReducer/userReducer";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();
  const [side, setSide] = useState(false);
  const [error, setError] = useState(false);

  async function fetchDdata(email) {
    const docRef = doc(db, "userData", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Update user data using dispatch and navigate to home page
      dispatch(userActions.setUser(docSnap.data()));
    } else {
      // Alert for invalid credentials
      const userDetails = {
        name: "Guest",
        email: "guest@gmail.com",
      };
      dispatch(userActions.setUser(userDetails));
    }
  }

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchDdata(user.email);
        } else {
          // User is signed out
          const userDetails = {
            name: "Guest",
            email: "guest@gmail.com",
            booking: [],
            withdrawl: [],
            bank: [],
            link: "",
            sponser: "Brokerage House",
          };
          dispatch(userActions.setUser(userDetails));
        }
      });
    } catch {
      setError(true);
    }
  }, [dispatch]);

  function handleLogin() {
    navigate("/home");
  }
  function handleSide() {
    setSide(!side);
  }
  if (error) {
    return <Waiting />;
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.asideDiv}>
        <Aside />
      </div>

      <div style={{ position: "relative" }}>
        <div className={styles.sideBar} style={{ left: side ? "0" : "-300px" }}>
          <Aside side handleSide={handleSide} />
        </div>
      </div>

      <div className={styles.contentDiv}>
        <div className={styles.headContent}>
          <span
            style={{ fontWeight: "600", fontSize: "large", minWidth: "100px" }}
          >
            <img
              style={{
                objectFit: "contain",
                height: "25px",
                borderRadius: "50%",
                width: "30px",
              }}
              src={user?.imageUrl ? user.imageUrl : "/images/user.png"}
              alt=""
            />{" "}
            {user?.name}
          </span>
          <span style={{ display: "flex" }}>
            <Button
              className={styles.adminButton}
              variant="info"
              onClick={() => navigate("/admin")}
            >
              Go to admin dashboard
            </Button>
            {user?.name === "Guest" && (
              <Button variant="danger" onClick={handleLogin}>
                Login
              </Button>
            )}
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
          </span>
        </div>
        <Outlet userData={"userData string"} />
      </div>
    </div>
  );
}
