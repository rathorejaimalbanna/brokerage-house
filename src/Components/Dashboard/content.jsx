import React, { useCallback, useState } from "react";
import styles from "./dashboard.module.css";
import CopyButton from "./refrral";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";
import SelectType from "./selectType";

export default function Content() {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const [addProject, setAddProject] = useState(false);
  const toggleAdd = useCallback(() => {
    setAddProject((prevAddProject) => !prevAddProject);
  }, []);

  return (
    <>
      {" "}
      {addProject && (
        <div className={styles.modalContainer}>
          <div className={styles.modalDiv}>
            <SelectType type="user" toggleAdd={toggleAdd} />
          </div>
        </div>
      )}
      <div className={styles.refrralDiv}>
        <div>
          <p>Referral Link</p>
        </div>
        <div>
          <CopyButton text={`brokerage-house.web.app/home/${user.link}`} />
        </div>
      </div>
      <div className={styles.sponserDiv}>
        <div className={styles.infoDiv}>
          <h5>Sponsor By</h5>
          <p>{user.sponser || "Brokerage House"}</p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Wallet Balance</h5>
          <p>&#8377; {user.bonus || 0}</p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Total Payout</h5>
          <p>&#8377; 0</p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Total Referral Bonous</h5>
          <p>&#8377; {user.bonus || 0}</p>
        </div>
        <div className={styles.infoDiv}>
          <h5>Last Referral Bonous</h5>
          <p>&#8377; 0</p>
        </div>
        <button
          style={{ border: "none" }}
          className={styles.infoDiv}
          onClick={() => toggleAdd()}
        >
          <h5>Add Project</h5>
          <p style={{ fontSize: "large" }}>(click here to add your Project)</p>
        </button>
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
        <div
          className={styles.buttonDiv}
          onClick={() => navigate("transaction")}
        >
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
          <p>Referral Bonus</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("contact")}>
          <img
            className={styles.buttonIcon}
            src="./images/phone-call.png"
            alt=""
          />
          <p>Contact Us</p>
        </div>
        <div className={styles.buttonDiv} onClick={() => navigate("myProfile")}>
          <img
            className={styles.buttonIcon}
            src="./images/project-management.png"
            alt=""
          />
          <p>My Profile</p>
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
