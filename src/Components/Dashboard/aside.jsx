import React from "react";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
export default function Aside({ side, handleSide }) {
  const navigate = useNavigate();
  function handleSignout() {
    signOut(auth)
      .then(() => {
        // toast.success(signout successfull)
        navigate("/home");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div>
      <div className={styles.asideLogo}>
        <h1>Brokerage House</h1>
      </div>
      <hr />
      <div className={styles.asideList}>
        <ul className={styles.uList}>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("/");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/dashboard.png"
              alt=""
            />{" "}
            Dashboard
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("project");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/real-estate.png"
              alt=""
            />{" "}
            Projects
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("booking");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/calendar.png"
              alt=""
            />{" "}
            My Booking{" "}
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("withdrawl");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/coin.png" alt="" />
            Withdrawl Money
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("transaction");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/transfer.png"
              alt=""
            />
            Transaction
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("referral");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/network.png"
              alt=""
            />
            My Referral
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("bonus");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/bonus.png" alt="" />
            Referral Bonus
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("bank");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/bank.png" alt="" />
            Manage Bank
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("myProfile");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/project-management.png"
              alt=""
            />
            My Profile
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("contact");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/phone-call.png"
              alt=""
            />
            Contact Us
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("privacy");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/insurance.png"
              alt=""
            />
            Privacy Policy
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("terms");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/terms-and-conditions.png"
              alt=""
            />
            Terms And Conditions
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("about");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/about.png" alt="" />
            About Us
          </li>
          <li className={styles.uListItem} onClick={handleSignout}>
            <img className={styles.asideIcon} src="/images/logout.png" alt="" />
            Sign Out
          </li>
          <li className={styles.uListItem} onClick={handleSignout}></li>
        </ul>
      </div>
    </div>
  );
}
