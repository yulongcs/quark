import { observable, action } from 'mobx';

class Store {
  @observable title: string = '';

  @action loadTitle = () => {
    this.title = 'Welcome to home page !';
  }

  static init() {
    return new Store();
  }
}

// const store = new Store();

export default Store;