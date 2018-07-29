import { action, autorun, computed, IReactionDisposer, observable } from 'mobx';
import { menus as menusData } from '../common';
import { AppStore } from '../stores';
import { tools } from '../utils';
import { IHeaderProps, IMenu, ISiderMenuProps } from './types';

class Store {

  public app: AppStore;

  @observable public menus: IMenu[];
  @observable public menuCollapsed: boolean;
  @observable public selectedMenu: string;
  @observable public openMenuKeys: string[];

  public disposer: IReactionDisposer;

  constructor(app: AppStore) {
    this.app = app;
    this.menus = [];
    this.menuCollapsed = false;
    this.selectedMenu = '';
    this.openMenuKeys = [];

    this.disposer = autorun(() => {
      if (this.app.customerStore.menuTriggerKey) {
        this.syncMenuStatus();
      }
    });
  }

  // 获取菜单(实际开发中一般从服务端获取)
  @action public getMenus = () => {
    this.menus = menusData;
  }

  // 改变菜单收缩状态
  @action public toggleMenuCollapsed = () => {
    this.menuCollapsed = !this.menuCollapsed;
    this.app.customerStore.updateMenuTriggerKey();
  }

  // 菜单项点击
  @action public handleMenuItemClick = (path: string) => () => {
    this.app.routeStore.goPage(path);
  }

  // 处理菜单展开/收缩事件
  @action public handleMenuOpenChange = () => (keys: string[]) => {
    const rootSubmenuKeys = this.menus.map(i => i.path);
    const latestOpenKey = keys.find(key => this.openMenuKeys.indexOf(key) === -1); // 只展开当前父级菜单
    this.setOpenMenuKeys(rootSubmenuKeys.indexOf(latestOpenKey || '') === -1 ? keys : (latestOpenKey ? [latestOpenKey] : []));
  }

  // 退出登录
  @action public logout = () => {
    this.app.routeStore.jumpExternalURL('./index-user.html');
  }

  @action public syncMenuStatus = () => { // 同步菜单显示
    const hashValue = location.hash.substring(1);
    this.setSelectedMenu(hashValue && hashValue !== '/' ? hashValue : '/home');
    this.setOpenMenuKeys(this.menuCollapsed ? [] : tools.urlToList(this.selectedMenu));
  }

  // 初始化
  @action public init = () => {
    this.getMenus();
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

  @computed get headerProps(): IHeaderProps {
    const { logout, toggleMenuCollapsed, menuCollapsed, app: { customerStore: { openResetPasswordModal } } } = this;
    return { logout, openResetPasswordModal, menuCollapsed, toggleMenuCollapsed };
  }

  @computed get siderMenuProps(): ISiderMenuProps {
    const { menus, menuCollapsed, handleMenuItemClick, handleMenuOpenChange, selectedMenu, openMenuKeys } = this;
    return {
      menus,
      menuCollapsed,
      handleMenuItemClick,
      handleMenuOpenChange,
      selectedKey: selectedMenu,
      openKeys: openMenuKeys
    };
  }

}

export default Store;
