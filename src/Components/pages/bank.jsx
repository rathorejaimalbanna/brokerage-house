import React from 'react'
import styles from "./pages.module.css"

export default function Bank() {
  return (
    <>
          <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
      </div>
      <h2 style={{marginTop:"25px"}}>Bank Details</h2>
      <div className={styles.depositTable}>
        <table>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Bank</th>
            <th>Acount Number</th>
            <th>IFSC Code</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>No Data Found</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </>
  )
}
