import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Row } from "@/components/layout/Generic/Generic";
import UIContext from "@/context/ui";
import ButtonIcon from "../ButtonIcon";

import styles from "./Header.module.scss";
import Text from "../Text";

const Header = () => {
  const router = useRouter();
  const { sidebar, setSidebar } = useContext(UIContext);

  const hanOnclickSideBar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className={styles.header}>
      <Row gap="22px">
        <ButtonIcon
          onClick={hanOnclickSideBar}
          typeButton="square"
          icon="menu"
        />
        <Text text="Sistema de tickets" />
      </Row>
    </div>
  );
};

export default Header;
