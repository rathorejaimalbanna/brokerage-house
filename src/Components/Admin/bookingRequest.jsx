import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import styles from "./admin.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";
import { projectSelectors } from "../../Redux/projectReducer/projectReducer";

export default function BookingRequest() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const loadedProjects = useSelector(projectSelectors);

  const { user } = useSelector(userSelector);

  async function getRequest() {
    const querySnapshot = await getDocs(collection(db, "Booking Request"));

    const userArray = [];
    querySnapshot.forEach((doc) => {
      userArray.push({ id: doc.id, ...doc.data() });
    });
    setUserData(userArray);
  }
  async function updatePlot(array, projectName) {
    const frankDocRef = doc(db, "projects", projectName);
    await updateDoc(frankDocRef, {
      plots: array,
    });
  }
  async function handleDelete(projectName, id) {
    const project = loadedProjects.filter((item) => item.name === projectName);
    var plotsObject = project[0].plots;
    var plotsArray = [...plotsObject];
    var index = plotsObject.findIndex((obj) => obj.id === id);
    var plotId = plotsArray[index].id;
    var status = "available";
    var price = plotsArray[index].price ? plotsObject[index].price : 0;
    var area = plotsArray[index].area ? plotsObject[index].area : 0;
    var book = window.confirm("Are you sure you want to delete booking?");
    if (book) {
      plotsArray[index] = {
        id: plotId,
        price,
        area,
        status,
      };
      await deleteDoc(doc(db, "Booking Request", user.email));
      updatePlot(plotsArray, project[0].name);
      navigate("/admin/bookingRequest");
    }
  }
  async function handleApprove(item) {
    var book = window.confirm("Proceed to confirm booking");
    if (book) {
      await addDoc(collection(db, "Booking History"), {
        name: item.name,
        addhar: item.addhar,
        contact: item.contact,
        plot: item.plot,
        mode: item.mode,
        offer: item.offer,
      });
      // await deleteDoc(doc(db, "Booking Request", user.email));
      const q = query(
        collection(db, "Booking Request"),
        where("plot", "==", item.plot)
      );
      async function docDelete(docId) {
        await deleteDoc(doc(db, "Booking Request", docId));
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        docDelete(doc.id);
      });
      navigate("/admin/bookingRequest");
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
          <th>Addhar</th>
          <th>Contact</th>
          <th>Plot No.</th>
          <th>Payment Mode</th>
          <th>Ammount</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.addhar} </td>
                <td>{item.contact}</td>
                <td>{item.plot}</td>
                <td>{item.mode}</td>
                <td>{item.offer}</td>
                <td>
                  <button
                    onClick={() =>
                      handleApprove({
                        name: item.name,
                        addhar: item.addhar,
                        contact: item.contact,
                        plot: item.plot,
                        mode: item.mode,
                        offer: item.offer,
                      })
                    }
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <img
                      className={styles.asideIcon}
                      src="/images/chek.png"
                      alt=""
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(item.project, item.plot)}
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <img
                      className={styles.asideIcon}
                      src="/images/delete.png"
                      alt=""
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}