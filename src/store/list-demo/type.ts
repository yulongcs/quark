import { IListBasicState } from '../base';

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
  listState: IListState;
}
