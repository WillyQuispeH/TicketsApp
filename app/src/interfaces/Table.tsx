export interface ITableHeader {
  text: string;
  align?: "left" | "center" | "right";
  type?: "text" | "number";
  width: string;
}

export interface ITable {
  header: ITableHeader[];
  detail: any;
}
