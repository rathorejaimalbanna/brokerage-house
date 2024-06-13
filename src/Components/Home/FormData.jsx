import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";

export default function FormData({ isLink }) {
  const [error, setError] = useState(false);
  const [data, setData] = useState("Log In");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLink) {
      setData("Sign Up");
      setCode(isLink);
    }
  }, [isLink]);
  function handleData() {
    if (data === "Sign Up") {
      setData("Log In");
    } else {
      setData("Sign Up");
    }
    setError(false);
  }

  function generateRandom6LetterCode() {
    const characters =
      "A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R9S8T7U0V1W2X3Y4Z5a6b7c8d9e0f1g2h3i4j5k6l9m8n7o0p1q2r3s4t5u6v7w8x9yz";
    const codeLength = 6;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  }
  async function fetchLink(link) {
    const docRef = doc(db, "linkData", link);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Update user data using dispatch and navigate to home page
      return [docSnap.data().email, docSnap.data().name];
    } else {
      return ["Brokerage House", "Brokerage House"];
    }
  }
  async function setLinkInfo(link) {
    await setDoc(doc(db, "linkData", link), {
      email,
      name,
    });
  }

  async function setUserInfo() {
    let link = generateRandom6LetterCode();
    await setLinkInfo(link);
    let newSponser = "Brokerage House";
    let newSponserEmail = "Brokerage House";
    if (code !== "") {
      let fetched = await fetchLink(code);
      newSponserEmail = fetched[0];
      newSponser = fetched[1];
    }
    await setDoc(doc(db, "userData", email), {
      email,
      name,
      phone,
      address,
      pin,
      code,
      booking: [],
      withdrawl: [],
      bank: [],
      sponser: newSponser,
      sponserEmail: newSponserEmail,
      link,
    });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoad(true); // Set loading state to true before the async operation starts
    // Create user with email and password
    await createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        setUserInfo();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing up:", error);
        setError("Email address already in use");
      });
    setTimeout(() => {
      navigate("/");
    }, 1200);
  }

  async function handleLogIN(e) {
    e.preventDefault();
    setLoad(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      pass
    ).catch((error) => {
      console.log(error);
    });
    if (userCredential) {
      navigate("/");
    } else {
      setError("Invalid Credentials");
      setLoad(false);
    }
  }
  return (
    <>
      {" "}
      {load === true ? (
        <div className={styles.loading}>
          <PulseLoader
            color="red"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <div>
            {/* Render form title */}
            <h3 style={{ textAlign: "center", fontWeight: "600" }}> {data}</h3>
            <h3
              style={{
                textAlign: "center",
                fontWeight: "900",
                color: "rgb(224, 56, 56)",
              }}
            >
              {" "}
              BROKERAGE HOUSE
            </h3>
            {/* Render form */}
            <form
              action=""
              className={styles.form}
              onSubmit={data === "Log In" ? handleLogIN : handleSignUp}
            >
              {/* Render username input */}
              <input
                type="email"
                placeholder="Email Address"
                className={styles.formInput}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* Render password input */}
              <input
                type="password"
                placeholder="Password"
                className={styles.formInput}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              {data === "Sign Up" && (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={styles.formInput}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Sponser Code"
                    className={styles.formInput}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className={styles.formInput}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className={styles.formInput}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Pincode"
                    className={styles.formInput}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </>
              )}
              {error && (
                <p style={{ color: "red" }}>
                  {error}
                  {error === "Email address already in use" && (
                    <button
                      onClick={handleData}
                      className={styles.signInButton}
                    >
                      Log In
                    </button>
                  )}
                </p>
              )}
              {/* Render submit button */}
              <button type="submit" className={styles.submitButton}>
                {data}
              </button>
              {data === "Log In" && (
                <>
                  <p>
                    Don't have an account,click here to{" "}
                    <button
                      onClick={handleData}
                      className={styles.signInButton}
                    >
                      Sign Up
                    </button>
                  </p>
                  <p>
                    Forgot Password?{" "}
                    <button
                      className={styles.signInButton}
                      onClick={() => navigate("/reset")}
                    >
                      Reset Password
                    </button>
                  </p>
                </>
              )}
            </form>
          </div>
          {data !== "Log In" && (
            <>
              <p style={{ marginLeft: "10px" }}>
                {" "}
                Already have an account,click here to{" "}
                <button onClick={handleData} className={styles.signInButton}>
                  Log In
                </button>
              </p>
            </>
          )}
        </>
      )}
    </>
  );
}
