import { IQuxUIState } from '@/qux';
import { IListBasicState } from '@/type';

export interface IListDataItem {
  id: string;
  num: number;
  title: string;
  text: string;
  imgUrl: string;
  createAt: number;
}

export interface IListState extends IListBasicState {
  data: IListDataItem[];
}

export interface IPageState {
  uiState: IQuxUIState;
  listState: IListState;
}
