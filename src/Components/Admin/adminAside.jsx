import React from "react";
import styles from "./admin.module.css";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

export default function AdminAside({ side, handleSide }) {
  const navigate = useNavigate();

  return (
    <div className={styles.asideMain}>
      <div className={styles.asideLogo}>
        <h1>Brokerage House</h1>
      </div>
      <div className={styles.asideList}>
        <ul className={styles.uList}>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("/admin");
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
              navigate("addProject");
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
            Manage Projects
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("manageUserProject");
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
            Manage User Projects
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("kyc");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/admin.png" alt="" />{" "}
            User Details
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("userAccounts");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/bank.png" alt="" />
            User Bank Accounts
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("bookingRequest");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/building.png"
              alt=""
            />
            Booking Requests
          </li>
          {/* <li
            className={styles.uListItem}
            onClick={() => {
              navigate("prospect");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/bonus.png" alt="" />
            Manage Prospects
          </li> */}
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("bookingHistory");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/history.png"
              alt=""
            />
            Booking History
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("withdrawlRequest");
              if (side) {
                handleSide();
              }
            }}
          >
            <img className={styles.asideIcon} src="/images/coin.png" alt="" />
            Withdrawl Requests
          </li>
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("tranction");
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
            Transactions
          </li>
          {/* <li
            className={styles.uListItem}
            onClick={() => {
              navigate("projectRequest");
              if (side) {
                handleSide();
              }
            }}
          >
            <img
              className={styles.asideIcon}
              src="/images/building.png"
              alt=""
            />
            Project Requests
          </li> */}
          <li
            className={styles.uListItem}
            onClick={() => {
              navigate("/");
              if (side) {
                handleSide();
              }
            }}
          >
            <Button>Go To User Panel</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
