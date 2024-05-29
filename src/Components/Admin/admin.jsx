import React from 'react'
import styles from "./admin.module.css"
import AdminAside from './adminAside'
import { Outlet } from 'react-router'

const Admin = () => {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.asideDiv}>
        <AdminAside />
      </div>
      <div className={styles.contentDiv}>
      <div className={styles.headContent}>
        <div>
        <h2><img className={styles.growIcon} src="/images/security.png" alt="" />Admin Dashboard</h2>
        </div>
          
        <div>
        <img className={styles.growIcon} src="/images/success.png" alt="" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
           Grow On Web
        </span></div>
      </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
