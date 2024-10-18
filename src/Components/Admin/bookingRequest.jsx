import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import styles from "./admin.module.css";
import { useSelector } from "react-redux";
import { projectSelectors } from "../../Redux/projectReducer/projectReducer";
// import CommissionModal from "../pages/commissionModal";

export default function BookingRequest() {
  const [userData, setUserData] = useState([]);
  // const [modal, setModal] = useState(false);
  const loadProjects = useSelector(projectSelectors);
  // const [ammount, setAmmount] = useState(0);
  // const [sponserEmail, setSponserEmail] = useState("Brokerage House");
  // const [userEmail, setUserEmail] = useState(null);

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
  async function updateUserPlot(projectName) {
    const frankDocRef = doc(db, "userProjects", projectName);
    await updateDoc(frankDocRef, {
      projectStatus: "available",
    });
  }
  async function handleDelete(projectName, id, type) {
    if (type === "colony") {
      var project = loadProjects.filter((doc) => doc.name === projectName);
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
        const washingtonRef = doc(db, "Booking Request", id);
        await updateDoc(washingtonRef, {
          status: "Rejected",
        });
        updatePlot(plotsArray, project[0].name);
        var newData = userData.filter((doc) => doc.project !== projectName);
        setUserData(newData);
      }
    } else {
      var userBook = window.confirm("Are you sure you want to delete booking?");
      if (userBook) {
        const washingtonRef = doc(db, "Booking Request", projectName);
        await updateDoc(washingtonRef, {
          status: "Rejected",
        });
        updateUserPlot(projectName);
      }
    }
  }
  async function firstSaleApproval(email) {
    const washingtonRef = doc(db, "userData", email);
    await updateDoc(washingtonRef, {
      firstSale: true,
    });
  }
  // async function giveBonus(commission) {
  //   const washingtonRef1 = doc(db, "userData", userEmail);
  //   var bonusAmmount1 = ammount * commission;
  //   bonusAmmount1 = Math.floor(bonusAmmount1);
  //   var bonusAmmount3 = bonusAmmount1 * 0.9;
  //   bonusAmmount3 = Math.floor(bonusAmmount3);
  //   await updateDoc(washingtonRef1, {
  //     bonus: increment(bonusAmmount3),
  //   });
  //   const washingtonRef2 = doc(db, "userData", sponserEmail);
  //   const bonusAmmount2 = bonusAmmount1 - bonusAmmount3;
  //   await updateDoc(washingtonRef2, {
  //     bonus: increment(bonusAmmount2),
  //     lastReferral: bonusAmmount2,
  //     referral: increment(bonusAmmount2),
  //   });
  // }
  async function handleApprove(item) {
    var book = window.confirm("Proceed to confirm booking");
    if (book) {
      await addDoc(collection(db, "Booking History"), {
        name: item.name,
        addhar: item.addhar,
        contact: item.contact,
        plot: item.plot,
        // mode: item.mode,
        // offer: item.offer,
        email: item.email,
        project: item.project,
      });
      const washingtonRef = doc(db, "Booking Request", item.plot);
      await updateDoc(washingtonRef, {
        status: "Approved",
      });
      var newData = userData.filter((doc) => doc.project !== item.project);
      // if (item.sponserEmail !== "Brokerage House") {
      //   toggleModal(item.sponserEmail, item.offer, item.email);
      // }
      setUserData(newData);
      firstSaleApproval(item.email);
    }
  }

  // function toggleModal(email, ammount, userEmail) {
  //   setSponserEmail(email);
  //   setAmmount(ammount);
  //   setUserEmail(userEmail);
  //   setModal(!modal);
  // }
  // function closeModal() {
  //   setModal(false);
  // }

  useEffect(() => {
    getRequest();
  }, [userData]);
  return (
    <>
      {/* {modal && (
        <div className={styles.modalContainer}>
          {" "}
          <div className={styles.modalDiv}>
            <CommissionModal
              giveBonus={giveBonus}
              ammount={ammount}
              toggleModal={closeModal}
            />
          </div>
        </div>
      )} */}
      <div className={styles.userTable}>
        <table>
          <thead>
            <th>Name</th>
            <th>Addhar</th>
            <th>Contact</th>
            <th>Property</th>
            {/* <th>Payment Mode</th> */}
            {/* <th>Utr</th> */}
            {/* <th>Ammount</th> */}
            <th>Actions</th>
          </thead>
          <tbody>
            {userData.length > 0 &&
              userData.map(
                (item, id) =>
                  item.status === "Pending" && (
                    <tr>
                      <td key={id}>{item.name}</td>
                      <td key={id}>{item.addhar} </td>
                      <td key={id}>{item.contact}</td>
                      <td key={id}>{item.plot}</td>
                      {/* <td key={id}>{item.mode}</td> */}
                      {/* <td key={id}>{item.utr}</td> */}
                      {/* <td key={id}>{item.offer}</td> */}
                      <td key={id}>
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
                          onClick={() =>
                            handleDelete(item.project, item.plot, item.type)
                          }
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
    </>
  );
}
