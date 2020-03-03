import { APP_REDUCER_NAME } from '@/store/constant';
import { IAppState } from '@/store/type';
import { LIST_DEMO_CONSTANTS, IListDemoPageState } from '@/page';

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
  [LIST_DEMO_CONSTANTS.PAGE_REDUCER_NAME]: IListDemoPageState;
}
