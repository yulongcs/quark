import { History } from 'history';
import { credentials, history, storage } from '../utils';
import AuthStore from './AuthStore';
import RouteStore from './RouteStore';
import UserRouteStore from './UserRouteStore';

export class AppStore {
  public authStore: AuthStore;
  public routeStore: RouteStore;
  public userRouteStore: UserRouteStore;

  public init = (h: History) => {
    const { all: credentialInfo } = credentials;
    const isAuthenticated = credentialInfo && credentialInfo.user && credentialInfo.access_token;
    this.authStore = new AuthStore(isAuthenticated);
    this.routeStore = new RouteStore(h);
    this.userRouteStore = new UserRouteStore(location.hash.split('#')[1] || '/login');
  }

  public setUnauthenticated = () => {
    this.authStore.setAuthed(false);
    storage.removeItem('credentials');
    this.routeStore.goPage('/login');
  }

}

const appStore = new AppStore();
appStore.init(history);

export default appStore;
