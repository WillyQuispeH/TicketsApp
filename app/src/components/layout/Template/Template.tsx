import React from "react";

import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import Screen from "../Screen";

import styles from "./Template.module.scss";

const Template = ({ children }: any) => {
  return (
    <Screen>
      <Header />
      <Content>
        <SideBar />
        {children}
      </Content>
    </Screen>
  );
};

const Content = ({ children }: any) => {
  return <div className={styles.content}>{children}</div>;
};

export default Template;
