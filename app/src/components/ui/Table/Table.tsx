import { ITable, ITableHeader } from "../../../interfaces/Table";

import ButtonIcon from "../ButtonIcon";

import styles from "./Table.module.scss";

const Table = (data: ITable) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {data.header?.map((header, idx: number) => (
            <TableHeader text={header.text} width={header.width} />
          ))}
        </tr>
      </thead>
      <TableDetail header={data.header} detail={data.detail}  />
    </table>
  );
};

const TableHeader = ({ text, width }: ITableHeader) => {
  return <th style={{ width }}>{text}</th>;
};

const TableDetail = ({ header, detail }: any) => {
  return (
    <tbody>
      {detail?.map((row: any, idx: any) => (
        <>
          <tr
            style={{
              background: idx % 2 === 0 ? "#d9d9d933" : "#d9d9d966",
            }}
          >
            {Object.values(row).map((data: any, idx: any) => (
              <>
              <td
                style={{
                  width: header[idx].width,
                  textAlign: header[idx].align,
                  maxWidth: header[idx].width,
                }}
              >
                {data}
              </td>
              </>
            ))}
            <ButtonIcon  icon="delete" typeButton="circle"/>
          </tr>
        </>
      ))}
    </tbody>
  );
};

export { Table, TableHeader, TableDetail };
