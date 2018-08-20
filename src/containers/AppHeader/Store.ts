import { action } from 'mobx';
import { AppStore } from '../../stores';
import { route } from '../../utils';

class Store {

  public app: AppStore;

  constructor(app: AppStore) {
    this.app = app;
  }

  // 退出登录
  @action public logout = () => {
    route.jumpExternalURL('./index-user.html');
  }

}

export default Store;
