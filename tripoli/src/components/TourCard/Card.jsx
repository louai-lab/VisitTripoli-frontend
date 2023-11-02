import React from "react";
import styles from "./Card.module.css";

function Card({ element }) {
  return (
    <div className={styles.container}>
      <a href={element.link} target="_blank">
        <img src={element.image} alt="card" />
      </a>
      <h2>{element.title}</h2>
      <p>{element.description}</p>
      <div className={styles.link}>
        <a href={element.link} target="_blank">
          Book now
        </a>
      </div>
    </div>
  );
}

export default Card;
