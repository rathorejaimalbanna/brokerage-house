import React from 'react';
import styles from "./admin.module.css"
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';

export default function AdminAside() {
  const navigate = useNavigate()

  return (
    <div className={styles.asideMain}>
      <div className={styles.asideLogo}>
        <h1>Brokerage House</h1>
      </div>
      <div className={styles.asideList}>
        <ul className={styles.uList}>
            <li className={styles.uListItem} onClick={()=> navigate("/admin")}><img className={styles.asideIcon} src="/images/dashboard.png" alt="" /> Dashboard</li>
            <li className={styles.uListItem} onClick={()=> navigate("addProject")}><img className={styles.asideIcon} src="/images/project-management.png" alt="" />Manage Project</li>
            <li className={styles.uListItem} onClick={()=> navigate("kyc")}><img className={styles.asideIcon} src="/images/admin.png" alt="" /> User Details</li>
            <li className={styles.uListItem} onClick={()=> navigate("userAccounts")}><img className={styles.asideIcon} src="/images/bank.png" alt="" />User Bank Accounts</li>
            <li className={styles.uListItem} onClick={()=> navigate("bookingRequest")}><img className={styles.asideIcon} src="/images/building.png" alt="" />Booking Requests</li>
            <li className={styles.uListItem} onClick={()=> navigate("prospect")}><img className={styles.asideIcon} src="/images/bonus.png" alt="" />Manage Prospects</li>
            <li className={styles.uListItem} onClick={()=> navigate("bookingHistory")}><img className={styles.asideIcon} src="/images/bonus.png" alt="" />Booking History</li>
            <li className={styles.uListItem} onClick={()=> navigate("tranction")}><img className={styles.asideIcon} src="/images/coin.png" alt="" />Tranctions</li>
            <li className={styles.uListItem} onClick={()=> navigate("/")}><Button >Go To User Panel</Button></li>
        </ul>
      </div>
    </div>
  )
}
