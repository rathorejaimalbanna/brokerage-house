import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../../firebase";

// Define your component
const Auth = (props) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [userJsonUrl, setUserJsonUrl] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    // Load the phone.email sign-in button script
    const script = document.createElement("script");
    script.src = "https://www.phone.email/sign_in_button_v1.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  async function updatePhone(newPhone) {
    const frankDocRef = doc(db, "userData", props.email);
    await updateDoc(frankDocRef, {
      phone: newPhone,
    });
  }
  // Function to handle phone.email listener callback
  window.phoneEmailListener = (userObj) => {
    const { user_phone_number } = userObj;
    updatePhone(user_phone_number);
    navigate("/"); // Set the JSON URL to fetch user data
  };

  useEffect(() => {
    // Fetch user data from JSON URL if it's set
    if (userJsonUrl) {
      fetch(userJsonUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [userJsonUrl]);

  return (
    <div>
      <div
        className="pe_signin_button"
        data-client-id="15639405308577151498"
      ></div>

      {error && <div>Error: {error}</div>}
      {!userData && userJsonUrl && <div>Loading...</div>}
      {userData && (
        <div>
          <p>User Country Code: {userData.user_country_code}</p>
          <p>User Phone Number: {userData.user_phone_number}</p>
        </div>
      )}
    </div>
  );
};

export default Auth;
