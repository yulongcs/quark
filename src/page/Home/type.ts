import { PAGE_STATUS_ENUM } from '../../types';

interface IPageInfo {
  pageState: PAGE_STATUS_ENUM;
}

export interface IHomeReducer {
  pageInfo: IPageInfo;
}
