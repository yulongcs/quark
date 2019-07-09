import { IQuxListProps, IQuxPageInfoProps } from '../../types';

export interface IListItemData {
  id: number;
  time: number;
  title: string;
  desc: string;
}

export interface IListInfoProps extends IQuxListProps {
  data: IListItemData[];
}

export interface IListPageProps {
  pageInfo: IQuxPageInfoProps;
  listInfo: IListInfoProps;
}
