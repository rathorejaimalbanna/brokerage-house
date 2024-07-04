import React from "react";
import Auth from "./auth2";
import styles from "./pages.module.css";
import { useParams } from "react-router";

const App = () => {
  const params = useParams();
  return (
    <div className={styles.authDiv}>
      <Auth email={params.email} type="signUp" />
    </div>
  );
};

export default App;

// BNFUXEHV4K9TJJKDZ8E5YRVN
