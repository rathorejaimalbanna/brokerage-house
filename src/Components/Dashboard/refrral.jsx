import React, { useState } from "react";
import styles from "./dashboard.module.css";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let newText = "https://" + text;
    navigator.clipboard.writeText(newText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

  return (
    <div className={styles.refraalContainer}>
      <span style={{ paddingLeft: "10px" }}>{text}</span>
      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? (
          "Copied"
        ) : (
          <img className={styles.asideIcon} src="./images/copy.png" alt="" />
        )}
      </button>
    </div>
  );
}

export default CopyButton;
