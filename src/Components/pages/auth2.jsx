// src/App.js
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { db } from "../../firebase";

function App(props) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verify, setVerify] = useState(false);
  const [verificationId, setVerificationId] = useState();
  const navigate = useNavigate();
  async function updatePhone() {
    const frankDocRef = doc(db, "userData", props.email);
    await updateDoc(frankDocRef, {
      phone: mobileNumber,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Define the URL based on whether we are sending an SMS or verifying OTP
    const url = `https://cpaas.messagecentral.com/verification/v2/verification/send?countryCode=91&customerId=C-456FA7536D6B441&flowType=SMS&mobileNumber=${mobileNumber}`;

    const authToken =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTQ1NkZBNzUzNkQ2QjQ0MSIsImlhdCI6MTcxOTYzNzc3MywiZXhwIjoxODc3MzE3NzczfQ.q8SF2QEx1LXVob5ESudjAku8JwpyCCYydQFPNN4kP7ryXKtKG_jy_yU53CM8VkpcMATyCvEJQiGW83NpPcChlg";
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          authToken,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setVerificationId(result.data.verificationId);
      setResponse(result.message);
      if (!verify) {
        setVerify(true);
      } // Set to verify mode if SMS sent successfully
    } catch (err) {
      setError(err.message);
      setVerify(false);
    }
  };
  const handleSubmitOtp = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Define the URL based on whether we are sending an SMS or verifying OTP
    const url = `https://cpaas.messagecentral.com/verification/v2/verification/validateOtp?country
Code=91&mobileNumber=${mobileNumber}&verificationId=${verificationId}&customerId=CC0157BFAF1B94F0&code=${otp}`;
    const authToken =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDLTQ1NkZBNzUzNkQ2QjQ0MSIsImlhdCI6MTcxOTYzNzc3MywiZXhwIjoxODc3MzE3NzczfQ.q8SF2QEx1LXVob5ESudjAku8JwpyCCYydQFPNN4kP7ryXKtKG_jy_yU53CM8VkpcMATyCvEJQiGW83NpPcChlg";
    setError(null);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          authToken,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const result = await res.json();

      if (result.responseCode === 200) {
        if (props.type === "profile") {
          props.setPhone(mobileNumber);
          props.handleShowPhone();
        } else {
          updatePhone();
          navigate("/");
        }
      } else {
        setError("Invalid OTP");
      }
      // Set to verify mode if SMS sent successfully
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Verify Phone</h1>
      <div style={{ marginBottom: "10px" }}>
        <form onSubmit={verify ? handleSubmitOtp : handleSubmit}>
          {verify ? (
            <label>
              <input
                required
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </label>
          ) : (
            <label>
              <input
                required
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
              />
            </label>
          )}
          <div style={{ marginBottom: "10px" }}></div>
          <button type="submit" style={{ width: "80%" }}>
            {verify ? "Verify OTP" : "Send SMS"}
          </button>
        </form>
      </div>
      {response && (
        <pre style={{ marginTop: "30px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {props.type === "profile" && (
        <Button onClick={props.handleShowPhone} variant="danger">
          Cancel
        </Button>
      )}
    </div>
  );
}

export default App;
