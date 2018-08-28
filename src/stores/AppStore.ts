import { configure } from 'mobx';
import { credentials, route, storage } from '../utils';
import AuthStore from './AuthStore';
import CustomerStore from './CustomerStore';
import SubFrameStore from './SubFrameStore';
import UserRouteStore from './UserRouteStore';

configure({ enforceActions: true }); // mobx 严格模式

export class AppStore {
  public authStore: AuthStore;
  public userRouteStore: UserRouteStore;
  public subFrameStore: SubFrameStore;
  public customerStore: CustomerStore;

  public init = () => {
    const { all: credentialInfo } = credentials;
    const isAuthenticated = credentialInfo && credentialInfo.user && credentialInfo.access_token;
    this.authStore = new AuthStore(isAuthenticated);
    this.userRouteStore = new UserRouteStore(location.hash.split('#')[1] || '/login');
    this.subFrameStore = new SubFrameStore();
    this.customerStore = new CustomerStore();
  }

  public setUnauthenticated = () => {
    this.authStore.setAuthed(false);
    storage.removeItem('credentials');
    route.goPage('/login');
  }

}

const appStore = new AppStore();
appStore.init();

export default appStore;
