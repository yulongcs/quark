export interface IActionTypes {
  LOAD_LIST_REQUEST: string;
  LOAD_LIST_SUCCESS: string;
  REFRESH_LIST_REQUEST: string;
  REFRESH_LIST_SUCCESS: string;
}

export interface IReducerTypes extends IActionTypes {
  LOAD_LIST_FAIL: string;
}
