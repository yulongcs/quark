import { action, computed, observable, runInAction } from 'mobx';
import { AppStore } from '../../../stores';
import { fetchUser } from './api';
import {
  ITableDemand,
  ITableProps
} from './types';

export default class Store {

  public app: AppStore;

  @observable public tableDemand: ITableDemand;

  constructor(app: AppStore) {
    this.app = app;

    this.tableDemand = {
      current: 1,
      total: 0,
      pageSize: 10,
      data: []
    };
  }

  // 获取表格数据
  @action public loadTableData = async (reset: boolean = false) => {
    if (reset) {
      this.tableDemand.current = 1;
    }
    const r = await fetchUser({ current: this.tableDemand.current, pageSize: this.tableDemand.pageSize });
    if (r) {
      runInAction(() => {
        this.tableDemand.data = r.data;
        this.tableDemand.total = r.total;
      });
    }
  }

  // 处理table翻页/改变每页页码数
  @action public handleTableChange = (reset: boolean = false) => (page: number, pageSize: number) => {
    runInAction(() => {
      if (reset) {
        this.tableDemand.pageSize = pageSize;
      } else {
        this.tableDemand.current = page;
      }
    });
    this.loadTableData(reset);
  }


  @action public init = () => {
    this.loadTableData();
  }

  @computed get tableProps(): ITableProps {

    const { tableDemand, handleTableChange } = this;

    return {
      ...tableDemand,
      handleTableChange
    };
  }

}
