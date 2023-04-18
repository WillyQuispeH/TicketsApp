import UIContext from "@/context/ui";
import React, { useContext } from "react";
import menuOpcion from "@/data/menuOpcion";
import { useRouter } from "next/router";

import styles from "./SideBar.module.scss";
import { useCustomer, useUser } from "@/store/hooks";

const SideBar = () => {
  const router = useRouter();
  const { sidebar, setSidebar } = useContext(UIContext);

  const handleClickOption = (text: string) => {
    router.push(text);
    setSidebar(!sidebar);
  };

  return (
    <div
      className={styles.sideBar}
      style={{ left: sidebar ? "0px" : "-258px" }}
    >
      {menuOpcion.map((item: any, idx: number) => (
        <div key={idx}>
          <h1>{item.sectionText}</h1>
          <ul>
            {item.options.map((optionsitem: any, optionsidx: number) => (
              <li
                key={optionsidx}
                onClick={() => handleClickOption(optionsitem.path)}
              >
                {optionsitem.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
