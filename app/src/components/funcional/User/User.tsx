import { Body, Option, Title } from "@/components/layout/Option";
import Loader from "@/components/ui/Loader";
import { Table } from "@/components/ui/Table";
import userData from "@/data/userData";
import { useUser } from "@/store/hooks";

const User = () => {
  return (
    <Option>
      <Title title="Usuarios" />
      <Body>
        <Table {...userData()} />
      </Body>
    </Option>
  );
};

export { User };
