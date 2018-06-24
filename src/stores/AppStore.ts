import { History } from 'history';
import { getCredentials, storage } from '../utils/helper';
import AuthStore from './AuthStore';
import RouteStore from './RouteStore';
import UserRouteStore from './UserRouteStore';

class AppStore {
  authStore: AuthStore;
  routeStore: RouteStore;
  userRouteStore: UserRouteStore;

  init = (h: History) => {
    const credentials = getCredentials();
    const isAuthenticated = credentials && credentials.user && credentials.access_token;
    this.authStore = new AuthStore(isAuthenticated);
    this.routeStore = new RouteStore(h);
    this.userRouteStore = new UserRouteStore(location.hash.split('#')[1] || '/login');
  }

  setUnauthenticated = () => {
    this.authStore.setAuthed(false);
    storage.removeItem('credentials');
    this.routeStore.goPage('/login');
  }

}

export default AppStore;
