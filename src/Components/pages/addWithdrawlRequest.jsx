import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "./pages.module.css";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../../Redux/userReducer/userReducer";

export default function AddWithdrawlRequest(props) {
  const { user } = useSelector(userSelector);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [ammount, setAmmount] = useState();
  const [bank, setBank] = useState("");
  const [data, setData] = useState([]);
  const [showName, setShowName] = useState("");
  const dispatch = useDispatch();
  let withdrawlArr = [...user.withdrawl];

  useEffect(() => {
    async function getDetails() {
      let booking = [...user.bank];
      let arr = await Promise.all(
        booking.map(async (ele) => {
          const docRef = doc(db, "Bank Details", ele);
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        })
      );
      setData(arr);
    }

    getDetails();
  }, [user.bank]);

  function handleSelect(eventKey) {
    const json = JSON.parse(eventKey);
    setBank(json);
    setShowName(json.holder);
  }

  async function addBooking() {
    await setDoc(doc(db, "Withdrawl Request", ammount), {
      name,
      contact,
      ammount,
      bank,
      email: user.email,
      status: "Pending",
    });
  }
  async function addUserWithdrawl(id) {
    let withdrawlArr = [...user.withdrawl];
    withdrawlArr.push(ammount);
    const frankDocRef = doc(db, "userData", user.email);
    await updateDoc(frankDocRef, {
      withdrawl: withdrawlArr,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    alert("Request Sent for withdrawl");
    addBooking();
    addUserWithdrawl();
    withdrawlArr.push(ammount);
    dispatch(userActions.editWithdrawl(withdrawlArr));
    props.handleClose();
  }
  return (
    <>
      <div>
        <h2>Raise Withdrawl Request</h2>
        {!props.firstSale && (
          <p style={{ color: "rgb(217,52,68)" }}>
            Note: Please complete your first sale!
          </p>
        )}
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
            required
            onChange={(e) => setContact(e.target.value)}
            type="number"
            placeholder="Contact No. "
            className={styles.inputFieldModal}
          />
          <h5>Select Bank Account</h5>
          <DropdownButton
            id="dropdown-button"
            title={showName || "Select Bank Account"}
            onSelect={handleSelect}
          >
            {data.map((item) => (
              <Dropdown.Item eventKey={JSON.stringify(item)}>
                {item.holder},{item.bank}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <h5>Withdrawl Amount</h5>
          <input
            required
            onChange={(e) => setAmmount(e.target.value)}
            type="number"
            placeholder="Enter ammount"
            className={styles.inputFieldModal}
          />
          <div>
            {" "}
            <Button
              disabled={!props.firstSale}
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
