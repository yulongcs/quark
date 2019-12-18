import { IQuxUIState } from '@/quxs';
import { IListBasicState } from '@/types';

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
