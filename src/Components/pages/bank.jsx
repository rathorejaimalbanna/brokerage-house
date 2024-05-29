import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export default function Bank() {
  const {user} = useSelector(userSelector);
  const [data,setData] = useState([])
  const navigate = useNavigate()
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
      <Button style={{marginLeft:"55%",backgroundColor:"rgb(245,85,58)"}} onClick={()=>navigate("/addBank")}>{data.length ===0? "Add":"Edit"} Bank Account</Button>
      <div className={styles.depositTable}>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Acc. Holder Name</th>
            <th>Bank</th>
            <th>Acount Number</th>
            <th>IFSC Code</th>
          </tr></thead>
          <tbody>
          {data.length !==0 && <tr>
            <td>{data.name}</td>
            <td>{data.holder}</td>
            <td>{data.bank}</td>
            <td>{data.account}</td>
            <td>{data.ifsc}</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
