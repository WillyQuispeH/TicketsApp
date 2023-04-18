import { useUser } from "@/store/hooks";
import { useRouter } from "next/router";

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

const userData = () => {
  const { userList } = useUser();

  const data: any = [];
  userList.map((row: any, id: number) =>
    data.push({
      
      id:row.person_id,
      rut: row.email,
      nombre:
        row.name + " " + row.paternallastname + " " + row.maternallastname
    })
  );

  const dataTable: ITable = {
    header: [
      {
        align: "center",
        text: "id",
        type: "text",
        width: "50px",
      },
      {
        align: "center",
        text: "Email",
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
      }
    ],

    detail: data,
  };

  return dataTable;
};

export default userData;
