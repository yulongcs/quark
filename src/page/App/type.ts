import { IAppBasicProps } from '../../types';
import { IHomeReducer } from '../Home/type';
import { IListPageProps } from '../List/type';
import { ILogReportPageProps } from '../report/LogReport/type';

export interface IRootReducer {
  appBasicReducer: IAppBasicProps;
  homeReducer: IHomeReducer;
  listPageReducer: IListPageProps;
  logReportPageReducer: ILogReportPageProps;
}
