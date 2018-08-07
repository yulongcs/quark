import { action } from 'mobx';
import { AppStore } from '../../stores';

class Store {

  public app: AppStore;

  constructor(app: AppStore) {
    this.app = app;
  }

  // 退出登录
  @action public logout = () => {
    this.app.routeStore.jumpExternalURL('./index-user.html');
  }

}

export default Store;
