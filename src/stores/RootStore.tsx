import { observable, action } from 'mobx';

export class RootStore {
  @observable version: string = '0.2.0';

  @observable authed: boolean;

  @action setAuthed = (authed: boolean) => {
    this.authed = authed;
  }

  constructor() {
    this.authed = true;
  }

  // @action loadTitle = () => {
  //   this.title = 'Welcome to home page !';
  // }

  // static init() {
  //   return new Store();
  // }
}

export default new RootStore();
