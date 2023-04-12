import { useCustomer } from "@/store/hooks";
import { ITable } from "@/interfaces/Table";

const customerData = () => {
  const { customerList } = useCustomer();

  const data: any = [];
  Object.values(customerList).map((row: any, idx: number) =>
    row.map((row: any, idx: number) =>
      data.push({
        rut: row.rut,
        nombre: row.companyname || row.name,
      })
    )
  );

  const dataTable: ITable = {
    header: [
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
    ],

    detail: data,
  };

  return dataTable;
};

export default customerData;
