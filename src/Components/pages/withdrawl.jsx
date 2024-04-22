import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./pages.module.css";

export default function Withdrawl() {
  return (
    <>
      <div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
      </div>
      <div>
        <Card style={{maxWidth:"200px",marginTop:"25px"}}>
          <Card.Header as="h5">Payout Money</Card.Header>
          <Card.Body>
            <img className={styles.payoutImg} src="/images/payout.png" alt="" />
            <Button style={{backgroundImage: "linear-gradient(to right,rgb(247,107,45),rgb(239,164,93))"}}>Add Bank Account</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
