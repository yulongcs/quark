import { action, observable } from 'mobx';
import { AppStore } from '../stores';

class Store {
  app: AppStore;
  @observable collapsed: boolean;

  constructor(app: AppStore) {
    this.app = app;
    this.collapsed = false;
  }

  @action setCollapsed = () => {
    this.collapsed = !this.collapsed;
  }

  // 退出登录
  @action logout = () => {
    this.app.routeStore.jumpExternalURL('./index-user.html');
  }

}

export default Store;
