import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./admin.module.css";

export default function Transaction() {
  const [userData, setUserData] = useState([]);
  async function getRequest() {
    const querySnapshot = await getDocs(collection(db, "Withdrawl History"));
    // const data = querySnapshot.map((doc)=> doc.data())
    const userArray = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userArray.push({ id: doc.id, ...doc.data() });
      setUserData(userArray);
    });
  }
  useEffect(() => {
    getRequest();
  }, []);
  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <th>Name</th>
          <th>Contact</th>
          <th>Ammount</th>
          <th>Bank </th>
          <th>Account No.</th>
          <th>IFSC</th>
          <th></th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.contact} </td>
                <td>{item.ammount}</td>
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
