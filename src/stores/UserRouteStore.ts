import { action, observable } from 'mobx';

export default class UserRouteStore {

  @observable public current: string;

  constructor(current: string) {
    this.current = current;
  }

  @action public updateCurrent = (page: string) => {
    this.current = page;
  }

}
