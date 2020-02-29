import { APP_REDUCER_NAME } from '@/store/constants';
import { IAppState } from '@/store/types';
import { LIST_DEMO_CONSTANTS, IListDemoPageState } from '@/pages';

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
  [LIST_DEMO_CONSTANTS.PAGE_REDUCER_NAME]: IListDemoPageState;
}
