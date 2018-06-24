import { action, observable } from 'mobx';

export default class UserRouteStore {

  @observable current: string;

  constructor(current: string) {
    this.current = current;
  }

  @action updateCurrent = (page: string) => {
    this.current = page;
  }

}
