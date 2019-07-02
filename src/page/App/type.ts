import { IHomeReducer } from '../Home/type';
import { IListPageReducer } from '../List/type';

export interface IAppReducer {
  route: string;
}

export interface IRootReducer {
  appReducer: IAppReducer;
  homeReducer: IHomeReducer;
  listPageReducer: IListPageReducer;
}
