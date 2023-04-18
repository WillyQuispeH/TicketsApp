import React from "react";

import styles from "./Text.module.scss";

interface IntText {
  text: string;
  color?: string;
}

const Text = ({ text, color }: IntText) => {
  return (
    <div className={styles.text}>
      <h1 style={{ color }}>{text}</h1>
    </div>
  );
};

export default Text;
