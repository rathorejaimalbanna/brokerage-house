import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./pages.module.css";
import AddWithdrawlRequest from "./addWithdrawlRequest";
import { useSelector } from "react-redux";
import { userSelector } from "../../Redux/userReducer/userReducer";

export default function Withdrawl() {
  const [show, setShow] = useState(false);
  const { user } = useSelector(userSelector);
  function handleAdd() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  return (
    <>
      <div>
        {show && (
          <div className={styles.modalContainer}>
            {" "}
            <div className={styles.modalDiv}>
              <AddWithdrawlRequest
                firstSale={user.firstSale}
                handleClose={handleClose}
              />
            </div>
          </div>
        )}
        <Card style={{ maxWidth: "200px", marginTop: "25px" }}>
          <Card.Header as="h5">Payout Money</Card.Header>
          <Card.Body>
            <img className={styles.payoutImg} src="/images/payout.png" alt="" />
            <Button
              onClick={handleAdd}
              style={{
                backgroundImage:
                  "linear-gradient(to right,rgb(247,107,45),rgb(239,164,93))",
              }}
            >
              Raise Withdrawl Request
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
