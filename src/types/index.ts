import { RouteProps } from 'react-router-dom';

export enum PAGE_STATUS_ENUM {
  LOADING = 'loading',
  EMPTY = 'empty',
  ERROR = 'error',
  CONTENT = 'content',
  REFRESH = 'refresh'
}

export enum LOAD_ACTION_ENUM {
  REFRESH = 'refresh',
  LOADMORE = 'loadMore',
  RESET = 'reset'
}

export interface IAppBasicStateProps {
  title: string;
  showTabBar: boolean;
  route: string;
}

export interface ICustomRouteProps extends RouteProps, Partial<IAppBasicStateProps> {
  setAppBasicState: (state: Partial<IAppBasicStateProps>) => void;
}

export interface IAppBasicProps {
  basicState: IAppBasicStateProps;
}
