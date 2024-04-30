import React from 'react';
import styles from "./admin.module.css"
import { useNavigate } from 'react-router';

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
            <li className={styles.uListItem} onClick={()=> navigate("addProject")}><img className={styles.asideIcon} src="/images/project-management.png" alt="" />Add Project</li>
            <li className={styles.uListItem} onClick={()=> navigate("kyc")}><img className={styles.asideIcon} src="/images/security.png" alt="" /> User Kyc</li>
            <li className={styles.uListItem} onClick={()=> navigate("userDetails")}><img className={styles.asideIcon} src="/images/admin.png" alt="" />Users Details</li>
            <li className={styles.uListItem} onClick={()=> navigate("userAcounts")}><img className={styles.asideIcon} src="/images/bank.png" alt="" />User Accounts</li>
            <li className={styles.uListItem} onClick={()=> navigate("withdrawlHistory")}><img className={styles.asideIcon} src="/images/bonus.png" alt="" />Manage Prospects</li>
            <li className={styles.uListItem} onClick={()=> navigate("bank")}><img className={styles.asideIcon} src="/images/coin.png" alt="" />Tranctions</li>
        </ul>
      </div>
    </div>
  )
}
