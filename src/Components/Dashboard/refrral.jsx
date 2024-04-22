import React, { useState } from 'react';
import styles from './dashboard.module.css'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className={styles.refraalContainer}>
      <span style={{marginRight:"80%",paddingLeft:"10px"}}>{text}</span>
      <button className={styles.copyButton} onClick={handleCopy}>{copied? "Copied":<img className={styles.asideIcon} src="./images/copy.png" alt="" />}</button>
    </div>
  );
}

export default CopyButton;
