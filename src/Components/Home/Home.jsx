import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import FormData from "./FormData";
import { useParams } from "react-router";

// SignIn component renders the sign-up form
export default function Home({ prospect }) {
  const params = useParams();
  const [isLink, setIsLink] = useState(null);
  useEffect(() => {
    if (prospect) {
      setIsLink(params.prospect);
    }
  }, [setIsLink, params.prospect, prospect]);

  return (
    <div className={styles.signIn}>
      <div className={styles.formDiv}>
        {/* Render sign-up form */}
        <FormData isLink={isLink} />
      </div>
    </div>
  );
}
