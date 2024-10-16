import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./admin.module.css";

export default function Kyc() {
  const [userData, setUserData] = useState([]);

  async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "userData"));
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
          <th>Email</th>
          <th>Name</th>
          <th>Address</th>
          <th>Contact No.</th>
          <th>Prospect Code</th>
          <th>Image</th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address} </td>
                <td>{item.phone}</td>
                <td>{item.code}</td>
                <td>
                  {
                    <img
                      src={item.imageUrl}
                      alt="NA"
                      style={{ objectFit: "contain", width: "50px" }}
                    />
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
