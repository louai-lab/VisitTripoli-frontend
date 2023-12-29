import style from "./Button.module.css";

import Monuments from "../vector/Monuments";

import Activitie from "../vector/Activities";

import Worshop from "../vector/Worshop";

import { useState } from "react";

const Button = ({ buttonPressed }) => {
  const [button1Active, setButton1Active] = useState("");
  const [button2Active, setButton2Active] = useState("");
  const [button3Active, setButton3Active] = useState("");

  const buttonHandler = (id) => {
    if (id == 1) {
      if (button1Active == "active1") {
        setButton1Active("");
        setButton2Active("");
        setButton3Active("");
      } else {
        setButton1Active("active1");
        setButton2Active("");
        setButton3Active("");
      }
    }
    if (id == 2) {
      if (button2Active == "active2") {
        setButton1Active("");
        setButton2Active("");
        setButton3Active("");
      } else {
        setButton2Active("active2");
        setButton1Active("");
        setButton3Active("");
      }
    }
    if (id == 3) {
      if (button3Active == "active3") {
        setButton1Active("");
        setButton2Active("");
        setButton3Active("");
      } else {
        setButton3Active("active3");
        setButton2Active("");
        setButton1Active("");
      }
    }
  };

  const pressedHandler = (id) => {
    if (id == 1) {
      if (!button1Active) {
        buttonPressed(1);
      } else {
        buttonPressed("");
      }
    }
    if (id == 2) {
      if (!button2Active) {
        buttonPressed(2);
      } else {
        buttonPressed("");
      }
    }
    if (id == 3) {
      if (!button3Active) {
        buttonPressed(3);
      } else {
        buttonPressed("");
      }
    }
  };

  return (
    <div className={style.buttonsPage}>
      <div className={style.buttons}>
        <div
          className={`${style.button} ${style[button1Active]}`}
          onClick={() => {
            pressedHandler(1);
            buttonHandler(1);
          }}
        >
          <Monuments />
          <span>Monuments</span>
        </div>
        <div
          className={`${style.button} ${style[button2Active]}`}
          onClick={() => {
            pressedHandler(2);
            buttonHandler(2);
          }}
        >
          <Activitie />
          <span>Activities</span>
        </div>
        <div
          className={`${style.button} ${style[button3Active]}`}
          onClick={() => {
            pressedHandler(3);
            buttonHandler(3);
          }}
        >
          <Worshop />
          <span>Places of Worship</span>
        </div>
      </div>
    </div>
  );
};

export default Button;
