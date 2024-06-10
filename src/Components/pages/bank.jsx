import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import { doc, getDoc } from "firebase/firestore";
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
      try {
        let booking = [...user.bank];
        let arr = await Promise.all(
          booking.map(async (ele) => {
            const docRef = doc(db, "Bank Details", ele);
            const docSnap = await getDoc(docRef);
            return docSnap.data();
          })
        );
        setData(arr);
      } catch {
        navigate("/");
      }
    }
    getDetails();
  }, [user.bank, navigate]);

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
      {user.name === "Guest" && (
        <h2 style={{ textAlign: "center", color: "orangered" }}>
          Please Login / Signup
        </h2>
      )}
    </>
  );
}
