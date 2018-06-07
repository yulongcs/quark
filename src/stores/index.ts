import { History } from 'history';
import history from '../utils/history';
import AuthStore from './AuthStore';
import RouteStore from './RouteStore';

class RootStore {
  authStore: AuthStore;
  routeStore: RouteStore;

  init(h: History) {
    this.authStore = new AuthStore();
    this.routeStore = new RouteStore(h);
  }
}

const rootStore = new RootStore();
rootStore.init(history);

export const { authStore, routeStore } = rootStore;
