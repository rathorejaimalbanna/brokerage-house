import { collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import styles from "./admin.module.css";
import { useNavigate } from "react-router";

export default function ProjectRequest() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  async function getRequest() {
    const querySnapshot = await getDocs(collection(db, "projects"));

    const userArray = [];
    querySnapshot.forEach((doc) => {
      userArray.push({ id: doc.id, ...doc.data() });
    });
    setUserData(userArray);
  }
  async function handleDelete(id) {
    var deleteR = window.confirm("Proceed to delete Project request?");
    if (deleteR) {
      await deleteDoc(doc(db, "projects", id));
    }
    navigate("/admin/projectRequest");
  }

  async function handleApprove(id) {
    var book = window.confirm("Proceed to confirm project request?");
    if (book) {
      const washingtonRef = doc(db, "projects", id);
      await updateDoc(washingtonRef, {
        status: "approved",
      });
      navigate("/admin/projectRequest");
    }
  }

  useEffect(() => {
    getRequest();
  }, [userData]);
  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <th>Project Type</th>
          <th>Project Name</th>
          <th>Price</th>
          <th>Location</th>
          <th>Size</th>
          <th>Total Plots</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map(
              (item) =>
                item.status === "user" && (
                  <tr>
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.location} </td>
                    <td>{item.size}</td>
                    <td>{item.plots.length}</td>

                    <td>
                      <button
                        onClick={() => handleApprove(item.name)}
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
                        onClick={() => handleDelete(item.name)}
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
