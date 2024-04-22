import React from 'react'
import styles from "./pages.module.css"

export default function About() {
  return (
<>
<div className={styles.headContent}>
        <img className={styles.asideIcon} src="/images/user.png" alt="" />{" "}
        <span style={{ fontWeight: "600", fontSize: "large" }}>
          Mr. Jai Rathore
        </span>
    </div>
      <h2 style={{marginTop:"25px",color:"rgb(245,85,58)"}}>Brokerage House - One point property solutions</h2>
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis impedit obcaecati voluptatibus aperiam in, pariatur voluptatem qui minima dolorem, possimus adipisci blanditiis praesentium. Facilis quo consectetur suscipit temporibus maxime nulla mollitia totam, sunt provident in asperiores molestiae eaque numquam reiciendis eos. Id porro enim asperiores earum deserunt inventore accusantium voluptatum!</p>
      </div>
</>
  )
}
