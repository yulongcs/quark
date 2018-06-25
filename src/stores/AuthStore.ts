import { action, observable } from 'mobx';
// import { storage } from '../utils/helper';

class AuthStore {

  @observable public authed: boolean;

  constructor(authed: boolean = true) {
    this.authed = authed;
  }

  @action public setAuthed = (authed: boolean) => {
    this.authed = authed;
  }

}

export default AuthStore;
