import React from 'react';
import styles from "./pages.module.css"

export default function Booking() {
  return (
    <>
          <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
      </div>
      <h2 style={{marginTop:"25px"}}>Diposit History</h2>
      <div className={styles.depositTable}>
        <table>
          <tr>
            <th>S.No.</th>
            <th>Project</th>
            <th>Property</th>
            <th>Total Amount</th>
            <th>Booking Name</th>
            <th>Booking Acount</th>
            <th>Booking Date</th>
            <th>Booking Status</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>No Data Found</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </>
  )
}