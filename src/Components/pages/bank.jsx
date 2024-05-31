import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export default function Bank() {
  const { user } = useSelector(userSelector);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getDetails() {
      const q = query(
        collection(db, "Bank Details"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      var arr = [];
      querySnapshot.forEach(async (doc) => {
        arr.push(doc.data());
      });
      setData(arr);
    }
    getDetails();
  }, [user.email]);

  return (
    <>
      <h2 style={{ marginTop: "25px" }}>Bank Details</h2>
      <Button
        style={{ marginLeft: "55%", backgroundColor: "rgb(245,85,58)" }}
        onClick={() => navigate("/addBank")}
      >
        Add Bank Account
      </Button>
      <div className={styles.depositTable}>
        <table>
          <thead>
            <tr>
              <th>Acc. Holder Name</th>
              <th>Bank</th>
              <th>Acount Number</th>
              <th>IFSC Code</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 &&
              data.map((d) => (
                <tr>
                  <td>{d.holder}</td>
                  <td>{d.bank}</td>
                  <td>{d.account}</td>
                  <td>{d.ifsc}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
