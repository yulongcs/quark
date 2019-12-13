import { SectionStateEnum } from '@vdfor/util';

export interface IListBasicState {
  pageSize: number;
  pageNum: number;
  hasMore: boolean;
  loadMoreLoading: boolean;
  refreshLoading: boolean;
  status: SectionStateEnum;
}
