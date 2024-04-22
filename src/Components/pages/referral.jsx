import React from 'react'
import styles from "./pages.module.css"
import CopyButton from '../Dashboard/refrral'

export default function Referral() {
  return (
    <>
    <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="User" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
      </div>
      <h2 style={{ marginTop: "25px" }}>My Referral Link</h2>
      <div className={styles.refrralDiv}>
        <div>
          <p>Refrral Link</p>
        </div>
        <div>
          <CopyButton text="BrokersHouse/referral/link/r34cc1" />
        </div>
      </div>
    </>
  )
}
