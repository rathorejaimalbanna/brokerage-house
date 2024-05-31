import React, { useEffect, useState } from "react";
import styles from "./pages.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";

export default function Booking() {
  const { user } = useSelector(userSelector);
  const [plots, setPlots] = useState([]);
  useEffect(() => {
    async function getDetails() {
      let booking = [...user.booking];
      let arr = await Promise.all(
        booking.map(async (ele) => {
          const docRef = doc(db, "Booking Request", ele);
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        })
      );
      setPlots(arr);
    }

    getDetails();
  }, [user.booking]);

  return (
    <>
      <h2 style={{ marginTop: "25px" }}>My Bookings</h2>
      <div className={styles.depositTable}>
        <table>
          <tr>
            <th>Project</th>
            <th>Plot</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Booking Status</th>
          </tr>
          {plots.length > 0 &&
            plots.map((p) => (
              <tr>
                <td>{p.project}</td>
                <td>{p.plot}</td>
                <td>{p.offer}</td>
                <td>{p.mode}</td>
                <td>{p.status}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
}
