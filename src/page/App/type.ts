import { IAppBasicReducer } from '../../types';
import { IHomeReducer } from '../Home/type';
import { IListPageReducer } from '../List/type';

export interface IRootReducer {
  appBasicReducer: IAppBasicReducer;
  homeReducer: IHomeReducer;
  listPageReducer: IListPageReducer;
}
