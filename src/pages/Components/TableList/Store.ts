import { action, computed, observable, runInAction } from 'mobx';
import { AppStore } from '../../../stores';
import { fetchUser, fetchUsers } from './api';
import {
  IEditModalProps,
  IEditModalValues,
  ITableDemand,
  ITableProps
} from './types';

export default class Store {

  public app: AppStore;

  @observable public tableDemand: ITableDemand;
  @observable public eitModalValues: IEditModalValues;
  @observable public editModalVisible: boolean;

  constructor(app: AppStore) {
    this.app = app;

    this.tableDemand = {
      current: 1,
      total: 0,
      pageSize: 10,
      data: []
    };

    this.eitModalValues = {
      name: '',
      sex: undefined,
      website: '',
      mobile: '',
      email: '',
      ipRules: '',
      note: '',
      arpu: 1000 // default arpu is 1000
    };
    this.editModalVisible = false;
  }

  @action public toggleEditModalVisible = (visible: boolean) => {
    this.editModalVisible = visible;
  }

  @action public setEditModalValues = (values: IEditModalValues) => {
    this.eitModalValues = values;
  }

  // 获取表格数据
  @action public loadTableData = async (reset: boolean = false) => {
    if (reset) {
      this.tableDemand.current = 1;
    }
    const r = await fetchUsers({ current: this.tableDemand.current, pageSize: this.tableDemand.pageSize });
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

  @action public openEditModal = (id?: number) => async () => {
    this.toggleEditModalVisible(true);
    if (typeof id !== 'undefined') { // 编辑
      const r = await fetchUser(id); // 获取user详细信息
      if (!r) {
        this.toggleEditModalVisible(false);
        return;
      }
      this.setEditModalValues(r);
    }
  }


  @action public init = () => {
    this.loadTableData();
  }

  @computed get tableProps(): ITableProps {
    const { tableDemand, handleTableChange, openEditModal } = this;

    return {
      ...tableDemand,
      openEditModal,
      handleTableChange
    };
  }

  @computed get editModalProps(): IEditModalProps {
    const { eitModalValues } = this;

    return {
      initData: eitModalValues
    };
  }

}
