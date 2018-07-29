/**
 * 存放全局数据
 */

import { action, observable } from 'mobx';

class CustomerStore {

  @observable public menuCollapsed: boolean; // 菜单收缩状态
  @observable public menuTriggerKey: number; // 定义触发菜单更新的变量

  constructor() {
    this.menuTriggerKey = 0;
  }

  // 改变菜单收缩状态
  @action public toggleMenuCollapsed = () => {
    this.menuCollapsed = !this.menuCollapsed;
    this.updateMenuTriggerKey();
  }

  @action public updateMenuTriggerKey = () => {
    this.menuTriggerKey = Math.random();
  }

  @action public openResetPasswordModal = () => {
    alert('开发中');
  }

}

export default CustomerStore;
