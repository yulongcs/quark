import { PAGE_STATUS_ENUM } from '../../types';

export interface IPageInfoProps {
  pageState: PAGE_STATUS_ENUM;
}

export interface IListData {
  id: number;
  time: number;
  title: string;
  desc: string;
}

export interface IListProps {
  loading: boolean;
  data: IListData[];
  pageNum: number;
  pageSize: number;
}

export interface IListPageReducer {
  pageInfo: IPageInfoProps;
  listInfo: IListProps;
}
