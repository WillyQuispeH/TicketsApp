import { useUser } from "@/store/hooks";
import { ITable } from "@/interfaces/Table";

const userData = () => {
  const { userList } = useUser();

  const data: any = [];
  userList.map((row: any, idx: number) =>
    data.push({
      rut: row.email,
      nombre:
        row.name + " " + row.paternallastname + " " + row.maternallastname,
    })
  );

  const dataTable: ITable = {
    header: [
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
    ],

    detail: data,
  };

  return dataTable;
};

export default userData;
