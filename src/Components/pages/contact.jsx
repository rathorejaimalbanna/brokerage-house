import React from 'react'
import styles from "./pages.module.css"

export default function Contact() {
  return (
    <>
      <h2 style={{marginTop:"25px"}}>Contact Us</h2>
      <div className={styles.contactDiv}>
        <div className={styles.contactInnerDiv}>
        <h5>Location</h5>
        <h3>Bijaynagar/Ajmer </h3>
        </div>
        <div className={styles.contactInnerDiv}>
          <h5>Email</h5>
          <h3> Brokers.house.deals@gmail.com</h3>
        </div>
        <div className={styles.contactInnerDiv}>
          <h5>Phone</h5>
          <h3>+91 </h3>
        </div>

      </div>
    </>
  )
}
