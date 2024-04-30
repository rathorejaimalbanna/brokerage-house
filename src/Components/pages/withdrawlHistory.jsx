import React from 'react'
import styles from "./pages.module.css"

export default function WithdrawlHistory() {
  return (
    <>
      <h2 style={{marginTop:"25px"}}>Withdrawl History</h2>
      <div className={styles.depositTable}>
        <table>
          <tr>
            <th>S.No.</th>
            <th>Tranction Id</th>
            <th>Amount</th>
            <th>Remark</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>No Data Found</td>
            <td></td>
          </tr>
        </table>
      </div>  
    </>
  )
}
