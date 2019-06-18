import { IHomeReducer } from '../page/Home/type';

export enum PAGE_STATUS_ENUM {
  LOADING = 'loading',
  EMPTY = 'empty',
  ERROR = 'error',
  CONTENT = 'content'
}

export interface IRootReducer {
  homeReducer: IHomeReducer;
}
