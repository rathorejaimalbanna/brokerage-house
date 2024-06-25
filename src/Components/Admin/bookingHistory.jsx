import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./admin.module.css";

export default function BookingHistory() {
  const [userData, setUserData] = useState([]);
  async function getRequest() {
    const querySnapshot = await getDocs(collection(db, "Booking History"));
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
          <th>Addhar</th>
          <th>Contact</th>
          <th>Property</th>
          <th>Payment Mode</th>
          <th>Ammount</th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.addhar} </td>
                <td>{item.contact}</td>
                <td>{item.plot}</td>
                <td>{item.mode}</td>
                <td>{item.offer}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
