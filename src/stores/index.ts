import { History } from 'history';
import { getCredentials, storage } from '../utils/helper';
import history from '../utils/history';
import AuthStore from './AuthStore';
import RouteStore from './RouteStore';

class RootStore {
  authStore: AuthStore;
  routeStore: RouteStore;

  init = (h: History) => {
    const credentials = getCredentials();
    const isAuthenticated = credentials && credentials.user && credentials.access_token;
    this.authStore = new AuthStore(isAuthenticated);
    this.routeStore = new RouteStore(h);
  }

  setUnauthenticated = () => {
    this.authStore.setAuthed(false);
    storage.removeItem('credentials');
    this.routeStore.goPage('/login');
  }

}

const rootStore = new RootStore();
rootStore.init(history);

export const { setUnauthenticated, authStore, routeStore } = rootStore;
