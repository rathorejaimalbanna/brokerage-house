import { collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import styles from "./admin.module.css";

export default function ProjectRequest() {
  const [userData, setUserData] = useState([]);

  async function getRequest() {
    const querySnapshot = await getDocs(collection(db, "userProjects"));
    const userArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserData(userArray);
  }

  async function handleDelete(id) {
    const deleteR = window.confirm("Proceed to delete Project request?");
    if (deleteR) {
      // Optimistic UI update
      setUserData((prevData) => prevData.filter((item) => item.id !== id));

      try {
        await deleteDoc(doc(db, "userProjects", id));
      } catch (error) {
        console.error("Error deleting document: ", error);
        // Rollback if deletion fails
        getRequest();
      }
    }
  }

  async function handleApprove(id) {
    const book = window.confirm("Proceed to confirm project request?");
    if (book) {
      // Optimistic UI update
      setUserData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "approved" } : item
        )
      );

      try {
        const projectRef = doc(db, "userProjects", id);
        await updateDoc(projectRef, { status: "approved" });
      } catch (error) {
        console.error("Error approving document: ", error);
        // Rollback if approval fails
        getRequest();
      }
    }
  }

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <tr>
            <th>Contact</th>
            <th>Type</th>
            <th>Project</th>
            <th>Location</th>
            <th>Specs</th>
            <th>Floor</th>
            <th>Size</th>
            <th>Dimensions</th>
            <th>Road</th>
            <th>Direction</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map(
              (item) =>
                item.status === "pending" && (
                  <tr key={item.id}>
                    <td>{item.contact}</td>
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>{item.location}</td>
                    <td>{item.specs || "N/A"}</td>
                    <td>{item.floor || "N/A"}</td>
                    <td>
                      {item.size || "N/A"}
                      {item.sizeType || ""}
                    </td>
                    <td>{item.dimention || "N/A"}</td>
                    <td>{item.road + " feet" || "N/A"}</td>
                    <td>{item.direction || "N/A"}</td>
                    <td>{item.price || "N/A"}</td>
                    <td>
                      <button
                        onClick={() => handleApprove(item.id)}
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
                        onClick={() => handleDelete(item.id)}
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
            )
          ) : (
            <tr>
              <td colSpan="11">No project requests pending.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
