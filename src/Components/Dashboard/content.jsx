import React from "react";
import styles from "./dashboard.module.css";
import CopyButton from "./refrral";
import { useNavigate } from "react-router";

export default function Content() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.refrralDiv}>
        <div>
          <p>Prospect Link</p>
        </div>
        <div>
          <CopyButton text="BrokersHouse/Prospect/link/r34cc1" />
        </div>
      </div>
      <div className={styles.sponserDiv}>
        <div className={styles.infoDiv}>
          <h5>Sponsor By</h5>
          <p>Mr. Jai Rathore</p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Wallet Balance</h5>
          <p>&#8377; </p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Total Payout</h5>
          <p>&#8377; </p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Total Prospect Bonous</h5>
          <p>&#8377; </p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Last Prospect Bonous</h5>
          <p>&#8377;</p>
        </div>
      </div>
      <div className={styles.sponserDiv}>
        <div className={styles.buttonDiv} onClick={() => navigate("project")}>
          <img
            className={styles.buttonIcon}
            src="./images/building.png"
            alt=""
          />
          <p>Book Now</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("withdrawl")}>
          <img className={styles.buttonIcon} src="./images/coin.png" alt="" />
          <p>Withdrawl</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("booking")}>
          <img
            className={styles.buttonIcon}
            src="./images/calendar.png"
            alt=""
          />
          <p>Booked Properties</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("tranction")}>
          <img
            className={styles.buttonIcon}
            src="./images/transfer.png"
            alt=""
          />
          <p>Tranction</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("referral")}>
          <img
            className={styles.buttonIcon}
            src="./images/network.png"
            alt=""
          />
          <p>My Bonus</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("bonus")}>
          <img className={styles.buttonIcon} src="./images/bonus.png" alt="" />
          <p>Prospect Bonus</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("contact")}>
          <img
            className={styles.buttonIcon}
            src="./images/phone-call.png"
            alt=""
          />
          <p>Contact Us</p>
        </div>
        <div className={styles.buttonDiv}>
          <img
            className={styles.buttonIcon}
            src="./images/project-management.png"
            alt=""
          />
          <p>Settings</p>
        </div>
      </div>
      <div className={styles.sponserDiv}>
        <div className={styles.bonous}>
          <h3>Current Level</h3>
        </div>
        <div className={styles.bonous}>
          <h3>Level Bonous</h3>{" "}
        </div>
      </div>
    </>
  );
}
