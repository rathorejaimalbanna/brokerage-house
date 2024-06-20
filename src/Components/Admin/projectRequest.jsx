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
    const querySnapshot = await getDocs(collection(db, "userProjects"));

    const userArray = [];
    querySnapshot.forEach((doc) => {
      userArray.push({ id: doc.id, ...doc.data() });
    });
    console.log(userArray);
    setUserData(userArray);
  }
  async function handleDelete(id) {
    var deleteR = window.confirm("Proceed to delete Project request?");
    if (deleteR) {
      await deleteDoc(doc(db, "userProjects", id));
    }
    navigate("/admin/projectRequest");
  }

  async function handleApprove(id) {
    var book = window.confirm("Proceed to confirm project request?");
    if (book) {
      const washingtonRef = doc(db, "userProjects", id);
      await updateDoc(washingtonRef, {
        status: "approved",
      });
      navigate("/admin/projectRequest");
    }
  }

  useEffect(() => {
    getRequest();
  }, []);
  return (
    <div className={styles.userTable}>
      <table>
        <thead>
          <th>Contact</th>
          <th>Project</th>
          <th>Location</th>
          <th>Type</th>
          <th>Specs</th>
          <th>Size</th>
          <th>Dimentions</th>
          <th>Road</th>
          <th>Direction</th>
          <th>Price</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map(
              (item) =>
                item.status === "pending" && (
                  <tr>
                    <td>{item.contact}</td>
                    <td>{item.name}</td>
                    <td>{item.location} </td>
                    <td>{item.type} </td>
                    <td>{item.specs} </td>
                    <td>
                      {item.size}
                      {item.sizeType}
                    </td>
                    <td>{item.dimention}</td>
                    <td>{item.road}</td>
                    <td>{item.direction}</td>
                    <td>{item.price}</td>

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
