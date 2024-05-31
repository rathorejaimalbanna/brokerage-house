import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./admin.module.css";

export default function UserAccounts() {
  const [userData, setUserData] = useState([]);

  async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "Bank Details"));
    // const data = querySnapshot.map((doc)=> doc.data())
    setUserData(querySnapshot);
    const userArray = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userArray.push({ id: doc.id, ...doc.data() });
    });
    setUserData(userArray);
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <th>User</th>
          <th>Account Holder</th>
          <th>Email</th>
          <th>Bank</th>
          <th>Account No.</th>
          <th>IFSC Code</th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.holder}</td>
                <td>{item.email} </td>
                <td>{item.bank}</td>
                <td>{item.account}</td>
                <td>{item.ifsc}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
