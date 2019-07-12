import { IAppBasicProps } from '../../types';
import { IListPageProps } from '../List/type';
import { ILogReportPageProps } from '../report/LogReport/type';

export interface IRootReducer {
  appBasicReducer: IAppBasicProps;
  listPageReducer: IListPageProps;
  logReportPageReducer: ILogReportPageProps;
}
