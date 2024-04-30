import React, { useState } from 'react'
import styles from "./home.module.css"
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';

export default function ResetPas() {
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    function handleSendMail(e)
    {   e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
          navigate("/home")
        })
        .catch((error) => {
          console.log(error.message)
        });
    }
  return (
    <div className={styles.signIn}>
      <div className={styles.formDiv}>
            {/* Render form title */}
            <h3 style={{ textAlign: "center", fontWeight: "600" }}> Reset Password</h3>
            <h3
              style={{
                textAlign: "center",
                fontWeight: "900",
                color: "rgb(240,201,32)",
              }}
            >
              {" "}
              BROKERAGE HOUSE
            </h3>
            {/* Render form */}
            <form
              action=""
              className={styles.form}
              onSubmit={handleSendMail}
            >
              {/* Render username input */}
              <input
                type="email"
                placeholder="Email Address"
                className={styles.formInput}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className={styles.submitButton}>Send Reset Email</button>
            </form>
      </div>
    </div>
  )
}
