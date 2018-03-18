import { observable, action } from 'mobx';

class HomeStore {
  @observable title: string = '';

  @action loadTitle = () => {
    this.title = 'Welcome to home page !';
  }

  // static init() {
  //   return new Store();
  // }
}

export default HomeStore;