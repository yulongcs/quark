import { APP_REDUCER_NAME } from '@/store/constants';
import { IAppState } from '@/store/types';
import { PAGE_REDUCER_NAME as DEMO_LIST_PAGE_REDUCER_NAME } from '@/pages/demo/list/constants';
import { IPageState as IDemoListPageState } from '@/pages/demo/list/types';

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
  [DEMO_LIST_PAGE_REDUCER_NAME]: IDemoListPageState;
}
