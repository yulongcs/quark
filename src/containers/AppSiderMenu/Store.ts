import { action, observable } from 'mobx';
import { menus as menusData } from '../../common';
import { AppStore } from '../../stores';
import { tools } from '../../utils';
import { IMenu } from './types';

class Store {

  public app: AppStore;

  @observable public menus: IMenu[];
  @observable public selectedMenu: string;
  @observable public openMenuKeys: string[];

  constructor(app: AppStore) {
    this.app = app;
    this.menus = [];
    this.selectedMenu = '';
    this.openMenuKeys = [];
  }

  // 获取菜单(实际开发中一般从服务端获取)
  @action public getMenus = () => {
    this.menus = menusData;
  }

  // 菜单项点击
  @action public handleMenuItemClick = (path: string) => () => {
    this.app.routeStore.goPage(path);
  }

  // 处理菜单目录展开/闭合事件
  @action public handleMenuOpenChange = () => (keys: string[]) => {
    const rootSubmenuKeys = this.menus.map(i => i.path);
    const latestOpenKey = keys.find(key => this.openMenuKeys.indexOf(key) === -1); // 只展开当前父级菜单
    this.setOpenMenuKeys(rootSubmenuKeys.indexOf(latestOpenKey || '') === -1 ? keys : (latestOpenKey ? [latestOpenKey] : []));
  }

  @action public syncMenuStatus = () => { // 同步菜单显示
    const hashValue = location.hash.substring(1);
    this.setSelectedMenu(hashValue && hashValue !== '/' ? hashValue : '/home');
    this.setOpenMenuKeys(this.app.customerStore.menuCollapsed ? [] : tools.urlToList(this.selectedMenu));
  }

  // 初始化
  @action public init = async () => {
    await this.getMenus();
    this.app.customerStore.updateMenuTriggerKey(); // 触发菜单同步
  }

  // 设置 selected key
  @action private setSelectedMenu = (key: string) => {
    this.selectedMenu = key;
  }

  // 设置openMenuKeys
  @action private setOpenMenuKeys = (keys: string[]) => {
    this.openMenuKeys = keys;
  }

}

export default Store;
