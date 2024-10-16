import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function CommissionModal(props) {
  const [value, setValue] = useState(null);
  function handleSubmit() {
    if (!value || !Number) {
      alert("Enter a valid % value");
      return;
    }
    props.giveBonus(value / 100);
    props.toggleModal();
  }
  return (
    <div>
      <h3>Set Commission Percentage</h3>
      <input
        type="number"
        placeholder="%"
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Ammount : {props.ammount} </p>
      <Button variant="primary" onClick={handleSubmit}>
        Apply
      </Button>
      <Button variant="danger" onClick={props.toggleModal}>
        Hold
      </Button>
    </div>
  );
}
