import { useCustomer } from "@/store/hooks";

interface ITable {
  header: ITableHeader[];
  detail: ITableDetail[];
}

interface ITableHeader {
  text: string;
  align?: "left" | "center" | "right";
  type?: "text" | "number";
  width?: string;
}
interface ITableDetail {
  rowData: string[];
}

const customerData = () => {
  const { customerList } = useCustomer();

  const data: any = [];
  Object.values(customerList).map((row: any, idx: number) =>
    row.map((row: any, id: number) =>
      data.push({
        id: row.person_id || row.company_id,
        rut: row.rut,
        nombre: row.companyname || row.name,
      })
    )
  );
  const dataTable: ITable = {
    header: [
      {
        align: "center",
        text: "id",
        type: "text",
        width: "60px",
      },
      {
        align: "center",
        text: "Rut",
        type: "text",
        width: "162px",
      },
      {
        align: "center",
        text: "Nombre",
        type: "text",
        width: "609px",
      },
      {
        align: "center",
        text: "",
        type: "text",
        width: "35px",
      },
    ],

    detail: data,
  };

  return dataTable;
};

export default customerData;
