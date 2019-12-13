import { APP_REDUCER_NAME } from '@/store/constants';
import { IAppState } from '@/store/types';

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
}
