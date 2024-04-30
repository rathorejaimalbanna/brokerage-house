import React from 'react';
import styles from "./dashboard.module.css"
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

export default function Aside() {
  const navigate = useNavigate()
  function handleSignout()
  {
  signOut(auth).then(() => {
    // toast.success(signout successfull)
    navigate("/home")
  }).catch((error) => {
    // An error happened.
  });
  }
  return (
    <div className={styles.asideMain}>
      <div className={styles.asideLogo}>
        <h1>Brokerage House</h1>
      </div>
      <hr />
      <div className={styles.asideList}>
        <ul className={styles.uList}>
            <li className={styles.uListItem} onClick={()=> navigate("/")}><img className={styles.asideIcon} src="/images/dashboard.png" alt="" /> Dashboard</li>
            <li className={styles.uListItem} onClick={()=> navigate("project")}><img className={styles.asideIcon} src="/images/project-management.png" alt="" /> Project</li>
            <li className={styles.uListItem} onClick={()=> navigate("booking")}><img className={styles.asideIcon} src="/images/real-estate.png" alt="" /> Booking History</li>
            <li className={styles.uListItem} onClick={()=> navigate("tranction")}><img className={styles.asideIcon} src="/images/transfer.png" alt="" />Tranction</li>
            <li className={styles.uListItem} onClick={()=> navigate("withdrawl")}><img className={styles.asideIcon} src="/images/coin.png" alt="" />Withdrawl</li>
            <li className={styles.uListItem} onClick={()=> navigate("withdrawlHistory")}><img className={styles.asideIcon} src="/images/history.png" alt="" />Withdrawl History</li>
            <li className={styles.uListItem} onClick={()=> navigate("referral")}><img className={styles.asideIcon} src="/images/network.png" alt="" />My Prospect</li>
            <li className={styles.uListItem} onClick={()=> navigate("bonus")}><img className={styles.asideIcon} src="/images/bonus.png" alt="" />Prospect Bonus</li>
            <li className={styles.uListItem} onClick={()=> navigate("bank")}><img className={styles.asideIcon} src="/images/bank.png" alt="" />Manage Bank</li>
            <li className={styles.uListItem} onClick={()=> navigate("contact")}><img className={styles.asideIcon} src="/images/phone-call.png" alt="" />Contact Us</li>
            <li className={styles.uListItem} onClick={()=> navigate("privacy")}><img className={styles.asideIcon} src="/images/insurance.png" alt="" />Privacy Policy</li>
            <li className={styles.uListItem} onClick={()=> navigate("terms")}><img className={styles.asideIcon} src="/images/terms-and-conditions.png" alt="" />Terms And Conditions</li>
            <li className={styles.uListItem} onClick={()=> navigate("about")}><img className={styles.asideIcon} src="/images/about.png" alt="" />About Us</li>
            <li className={styles.uListItem} onClick={handleSignout}><img className={styles.asideIcon} src="/images/logout.png" alt="" />Sign Out</li>
        </ul>
      </div>
    </div>
  )
}
