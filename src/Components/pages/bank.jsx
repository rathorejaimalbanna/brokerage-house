import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";

export default function Bank() {
  const {user} = useSelector(userSelector);
  const [data,setData] = useState([])
  useEffect(() => {
    async function getBank() {
      const docRef = doc(db, "Bank Details",user.email );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data())
        console.log(docSnap.data())
      } else {
        console.log("No such document!");
      }
    }
    getBank()
  },[user.email]);
  return (
    <>
      <h2 style={{ marginTop: "25px" }}>Bank Details</h2>
      <div className={styles.depositTable}>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bank</th>
            <th>Acount Number</th>
            <th>IFSC Code</th>
            <th>Actions</th>
          </tr></thead>
          <tbody>
          {data.length !==0 && <tr>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.bank}</td>
            <td>{data.account}</td>
            <td>{data.ifsc}</td>
            <td><button>Delete</button><button>Update</button></td>
          </tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
