import { observable, action } from 'mobx';

class Store {
  @observable title: string = '';

  @action loadTitle = () => {
    this.title = 'Home Page';
  }
}

const store = new Store();

export default store;