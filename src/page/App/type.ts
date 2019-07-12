import { IAppBasicProps } from '../../type';
import { IListPageProps } from '../list';
import { ILogReportPageProps } from '../report/log-report';

export interface IRootReducer {
  appBasicReducer: IAppBasicProps;
  listPageReducer: IListPageProps;
  logReportPageReducer: ILogReportPageProps;
}
