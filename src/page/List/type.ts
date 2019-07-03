import { PAGE_STATUS_ENUM } from '../../types';

export interface IPageInfoProps {
  pageState: PAGE_STATUS_ENUM;
  scrollTop: number;
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
  hasMore: boolean;
}

export interface IListPageReducer {
  pageInfo: IPageInfoProps;
  listInfo: IListProps;
}
