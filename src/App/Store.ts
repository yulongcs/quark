import { action, observable } from 'mobx';
import { AppStore } from '../stores';

class Store {

  @observable public collapsed: boolean;

  public app: AppStore;

  constructor(app: AppStore) {
    this.app = app;
    this.collapsed = false;
  }

  @action public setCollapsed = () => {
    this.collapsed = !this.collapsed;
  }

  // 退出登录
  @action public logout = () => {
    this.app.routeStore.jumpExternalURL('./index-user.html');
  }

}

export default Store;
