import React from "react";
import { useState } from "react";

import styles from "./Alert.module.scss";
interface IntMessage {
  msg: string;
  title: string;
  background: string;
  visible: boolean;
}

const Alert = ({ msg, background, title, visible }: IntMessage) => {
  const [display, setDisplay] = useState("flex");
  return (
    <div className={styles.message} style={{ background, display }}>
      <h1>{title}</h1>
      <h2>{msg}</h2>
    </div>
  );
};
export default Alert;
