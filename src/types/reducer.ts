import { APP_REDUCER_NAME } from 'src/store';
import { IAppState } from 'src/store/types';

export interface IRootReducer {
  [APP_REDUCER_NAME]: IAppState;
}
