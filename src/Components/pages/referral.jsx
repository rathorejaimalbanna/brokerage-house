import React from 'react'
import styles from "./pages.module.css"
import CopyButton from '../Dashboard/refrral'

export default function Referral() {
  return (
    <>
      <h2 style={{ marginTop: "25px" }}>My Prospect Link</h2>
      <div className={styles.refrralDiv}>
        <div>
          <p>Prospect Link</p>
        </div>
        <div>
          <CopyButton text="BrokersHouse/Prospect/link/r34cc1" />
        </div>
      </div>
    </>
  )
}
