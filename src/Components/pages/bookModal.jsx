import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./pages.module.css";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../../Redux/userReducer/userReducer";
import { projectActions } from "../../Redux/projectReducer/projectReducer";

export default function BookModal(props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  // const [offer, setOffer] = useState();
  const [addhar, setAddhar] = useState();
  // const [mode, setMode] = useState("cash");
  const { user } = useSelector(userSelector);
  // const [utr, setUtr] = useState("N/A");
  let bookingArr = [...user.booking];
  const dispatch = useDispatch();

  // function handleSelect(eventKey) {
  //   setMode(eventKey);
  // }
  async function updatePlot(array) {
    const frankDocRef = doc(db, "projects", props.project.name);
    await updateDoc(frankDocRef, {
      plots: array,
    });
  }
  async function addBooking() {
    await setDoc(doc(db, "Booking Request", props.plotDetail.id), {
      name,
      contact,
      addhar,
      // mode,
      // offer,
      // utr,
      plot: props.plotDetail.id,
      email: user.email,
      project: props.project.name,
      status: "Pending",
      type: props.project.type,
      sponserEmail: user.sponserEmail,
    });
  }
  async function addUserBooking(id) {
    let bookingArr = [...user.booking];
    bookingArr.push(id);
    const frankDocRef = doc(db, "userData", user.email);
    await updateDoc(frankDocRef, {
      booking: bookingArr,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    alert("Booking Successfull");
    addBooking();
    var plotsObject = [...props.project.plots];
    plotsObject[props.plotDetail.arrId] = {
      id: props.plotDetail.id,
      status: "booked",
      price: props.plotDetail.price ? props.plotDetail.price : 0,
      area: props.plotDetail.area ? props.plotDetail.area : 0,
    };
    updatePlot(plotsObject);
    addUserBooking(props.plotDetail.id);
    dispatch(
      projectActions.editPlots({
        plot: plotsObject,
        plotId: props.plotId,
        projectId: props.projectId,
      })
    );
    bookingArr.push(props.plotDetail.id);
    dispatch(userActions.editBooking(bookingArr));
    props.handleClose();
  }
  return (
    <>
      <div>
        <h2>Book This Property</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <h5>Enter Name</h5>
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            className={styles.inputFieldModal}
          />
          <h5>Enter contact number</h5>
          <input
            onChange={(e) => setContact(e.target.value)}
            type="number"
            placeholder="Contact No."
            className={styles.inputFieldModal}
          />
          {/* <h5>Select Payment Mode</h5> */}
          {/* <DropdownButton
            id="dropdown-button"
            title={`Select Payment Method`}
            onSelect={handleSelect}
          > */}
          {/* <Dropdown.Item eventKey="Bank">Bank</Dropdown.Item>
            <Dropdown.Item eventKey="Cash">Cash</Dropdown.Item>
            <Dropdown.Item eventKey="Cheque">Cheque</Dropdown.Item>
          </DropdownButton>
          {mode === "Bank" && (
            <>
              {" "}
              <h5>Provide UTR number</h5>
              <input
                placeholder="Utr number"
                type="number"
                onChange={(e) => setUtr(e.target.value)}
              />
            </>
          )} */}
          {/* <h5>Booking Amount</h5>
          <input
            required
            onChange={(e) => setOffer(e.target.value)}
            type="number"
            placeholder="Enter Ammount "
            className={styles.inputFieldModal}
          /> */}
          <h5>Provide Addhar Number</h5>
          <input
            required
            onChange={(e) => setAddhar(e.target.value)}
            type="number"
            placeholder="Addhar NO."
            className={styles.inputFieldModal}
          />
          <div>
            {" "}
            <Button
              type="submit"
              style={{ display: "inline" }}
              className={styles.submitButton}
            >
              Submit
            </Button>
            <Button
              variant="danger"
              style={{
                display: "inline",
                marginTop: "20px",
                marginLeft: "20px",
              }}
              onClick={props.handleClose}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
