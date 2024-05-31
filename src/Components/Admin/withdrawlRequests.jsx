import { collection, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import styles from "./admin.module.css";
import { useNavigate } from "react-router";

export default function WithdrawlRequest() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  async function getRequest() {
    const querySnapshot = await getDocs(collection(db, "Withdrawl Request"));

    const userArray = [];
    querySnapshot.forEach((doc) => {
      userArray.push({ id: doc.id, ...doc.data() });
    });
    setUserData(userArray);
  }
  async function handleDelete(id) {
    const washingtonRef = doc(db, "Withdrawl Request", id);
    var deleteR = window.confirm("Proceed to delete withdrawl request?");
    if (deleteR) {
      await updateDoc(washingtonRef, {
        status: "Rejected",
      });
      navigate("/admin/withdrawlRequest");
    }
  }

  async function handleApprove(item) {
    var book = window.confirm("Proceed to confirm booking?");
    if (book) {
      //   await addDoc(collection(db, "Withdrawl History"), {
      //     name: item.name,
      //     a: item.ammount,
      //     contact: item.contact,
      //     plot: item.plot,
      //     mode: item.mode,
      //     offer: item.offer,
      //     email: item.email,
      //     project: item.project,
      // });
      await deleteDoc(doc(db, "Withdrawl Request", item.ammount));
      navigate("/admin/withdrawlRequest");
    }
  }

  useEffect(() => {
    getRequest();
  }, [userData]);
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
            userData.map(
              (item) =>
                item.status === "Pending" && (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.contact} </td>
                    <td>{item.ammount}</td>
                    <td>{item.bank.bank}</td>
                    <td>{item.bank.account}</td>
                    <td>{item.bank.ifsc}</td>
                    <td>
                      <button
                        onClick={() => handleApprove(item)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <img
                          className={styles.asideIcon}
                          src="/images/chek.png"
                          alt=""
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(item.ammount)}
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        <img
                          className={styles.asideIcon}
                          src="/images/delete.png"
                          alt=""
                        />
                      </button>
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </div>
  );
}
