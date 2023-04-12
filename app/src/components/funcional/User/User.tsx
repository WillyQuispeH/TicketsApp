import { Body, Option, Title } from "@/components/layout/Option";
import { Table } from "@/components/ui/Table";
import UserCrud from "@/components/ui/UserCrud";

import userData from "@/data/userData";

const User = () => {
  return (
    <Option>
      <Title title="Usuarios" />
      <Body>
        <UserCrud/>
      </Body>
    </Option>
  );
};

export default User;
