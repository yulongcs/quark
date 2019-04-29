export interface IAliveDataItem {
  scrollTop: number;
  data: any;
}

export interface IState {
  aliveData: {
    [key: string]: IAliveDataItem;
  };
  [key: string]: any;
}

export interface IAction {
  type: string;
  [key: string]: any;
}
