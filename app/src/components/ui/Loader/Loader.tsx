import React from "react";
import styles from "./Loader.module.scss";

interface IntLoader {
  width: string;
  height: string;
}
const Loader = ({ width, height }: IntLoader) => {
  return (
    <div className={styles.loader} style={{ width, height }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
