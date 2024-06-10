import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";
import { useNavigate } from "react-router";

export default function Transaction() {
  const { user } = useSelector(userSelector);
  const [plots, setPlots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getDetails() {
      try {
        let booking = [...user.withdrawl];
        let arr = await Promise.all(
          booking.map(async (ele) => {
            const docRef = doc(db, "Withdrawl Request", ele);
            const docSnap = await getDoc(docRef);
            return docSnap.data();
          })
        );
        setPlots(arr);
      } catch {
        navigate("/");
      }
    }

    getDetails();
  }, [navigate, user.withdrawl]);

  return (
    <>
      <h2 style={{ marginTop: "25px" }}>Transactions</h2>
      <div className={styles.depositTable}>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Ammount</th>
              <th>Bank</th>
              <th>Account</th>
              <th>status</th>
            </tr>
            {plots.length > 0 &&
              plots.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.ammount}</td>
                  <td>{item.bank.bank}</td>
                  <td>{item.bank.account}</td>
                  <td>{item.status}</td>
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
