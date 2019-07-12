import { IQuxListProps, IQuxPageInfoProps } from '../../../type';

export interface IListItemData {
  key: number;
  createAt: number;
  page: string;
  title: string;
  desc: string;
}

export interface IListInfoProps extends IQuxListProps {
  data: IListItemData[];
}

export interface ILogReportPageProps {
  pageInfo: IQuxPageInfoProps;
  listInfo: IListInfoProps;
}
