import { useRouter } from "next/router";
import { useContext } from "react";
import UIContext from "@/context/ui";

import ButtonIcon from "../ButtonIcon";

import styles from "./Table.module.scss";

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

const Table = (data: ITable) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {data.header?.map((header, idx: number) => (
            <TableHeader key={idx} text={header.text} width={header.width} />
          ))}
        </tr>
      </thead>
      <TableDetail header={data.header} detail={data.detail} />
      <TableFooter />
    </table>
  );
};

const TableHeader = ({ text, width }: ITableHeader) => {
  return <th style={{ width }}>{text}</th>;
};

const TableDetail = ({ header, detail }: any) => {
  const { setCrud } = useContext(UIContext);
  const router = useRouter();

  return (
    <tbody>
      {detail?.map((row: any, id: number) => (
        <>
          <tr
            key={id}
            style={{
              background: id % 2 === 0 ? "#d9d9d933" : "#d9d9d966",
            }}
          >
            {Object.values(row).map((data: any, idx: number) => (
              <>
                <td
                  key={idx}
                  style={{
                    width: header[idx].width,
                    textAlign: header[idx].align,
                    maxWidth: header[idx].width,
                  }}
                >
                  {idx == 0 ? id + 1 : data}
                </td>
              </>
            ))}
            <td>
              <ButtonIcon
                icon="edit"
                onClick={() => {
                  router.push(router.pathname + "/?id=" + row.id);
                  setCrud(true);
                }}
                typeButton="circle"
              />
            </td>
          </tr>
        </>
      ))}
    </tbody>
  );
};
const TableFooter = () => {
  const router = useRouter();
  const { setCrud } = useContext(UIContext);

  return (
    <tfoot className={styles.tableFooter}>
      <ButtonIcon
        icon="add"
        typeButton="circle"
        onClick={() => {
          router.push(router.pathname + "/?id=new");
          setCrud(false);
        }}
      />
    </tfoot>
  );
};

export { Table, TableHeader, TableDetail };
