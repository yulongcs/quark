import { APP_REDUCER_NAME } from '@/stores/constants';
import { IAppState } from '@/stores/types';
import { LIST_DEMO_CONSTANTS, IListDemoPageState } from '@/pages';

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
  [LIST_DEMO_CONSTANTS.PAGE_REDUCER_NAME]: IListDemoPageState;
}
