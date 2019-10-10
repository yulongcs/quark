import { RouteProps } from 'react-router-dom';

export enum PAGE_STATUS_ENUM {
  LOADING = 'loading',
  EMPTY = 'empty',
  ERROR = 'error',
  CONTENT = 'content'
}

export interface IAppBasicStateProps {
  title: string;
  route: string;
}

export interface ICustomRouteProps extends RouteProps, Partial<IAppBasicStateProps> {
  setAppBasicState: (state: Partial<IAppBasicStateProps>) => void;
}

export interface IAppBasicProps {
  basicState: IAppBasicStateProps;
}
