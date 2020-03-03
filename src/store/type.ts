import { IAppState } from './app';
import { IListDemoState, LIST_DEMO_CONSTANT } from './list-demo';

export interface IRootReducer {
  app: IAppState;
  [LIST_DEMO_CONSTANT.ID]: IListDemoState;
}
