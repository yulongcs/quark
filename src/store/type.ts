import { LIST_DEMO_CONSTANT, IListDemoPageState } from '@/page';
import { APP_REDUCER_NAME } from './constant';

export interface IAppMetaState {
  route: string;
}

export interface IAppState {
  metaState: IAppMetaState;
}

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
  [LIST_DEMO_CONSTANT.PAGE_REDUCER_NAME]: IListDemoPageState;
}
