import { ISex } from '../../../types';

export interface ITableDataItem {
  id: number;
  code: number;
  name: string;
  sex: ISex;
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
  openEditModal: (id?: number) => () => void;
}

export interface IEditModalValues {
  id?: number;
  code: number;
  name: string;
  sex: ISex;
  website: string;
  mobile: string;
  email: string;
  ipRules: string;
  note: string;
  arpu: number;
  ceateAt?: number;
}

// export interface IEditModalDemand {
//   visible: boolean;
// }

export interface IEditModalProps {
  initData: IEditModalValues;
}
