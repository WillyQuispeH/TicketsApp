import { Table } from "@/components/ui/Table";
import { Body, Option, Title } from "@/components/layout/Option";
import customerData from "@/data/customerData";

const Customer = () => {
  return (
    <Option>
      <Title title="Clientes"></Title>
      <Body>
        <Table {...customerData()} />
      </Body>
    </Option>
  );
};

export default Customer;
