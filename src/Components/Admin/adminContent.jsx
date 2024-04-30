import React from 'react'
import styles from "./admin.module.css"

export default function AdminContent() {
  return (
    <div className={styles.adminInfoDiv}>
      <div>Total Collection</div>
      <div>Total User</div>
      <div>Withdrawl Requests</div>
      <div>Total Projects</div>
      <div>Add Projects</div>
      <div>Manage Prospects</div>
      <div>User Kyc</div>
      <div>Tranctions</div>
      <div>Received Payments</div>
    </div>
  )
}
