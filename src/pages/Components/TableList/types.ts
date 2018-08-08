export interface ITableDataItem {
  id: number;
  code: number;
  name: string;
  sex: string;
  ceateAt: number;
}

export interface ITableDemand {
  current: number;
  pageSize: number;
  total: number;
  data: ITableDataItem[];
}

export interface ITableProps extends ITableDemand {
  handleTableChange: (reset: boolean) => (page: number, pageSize: number) => void;
}
