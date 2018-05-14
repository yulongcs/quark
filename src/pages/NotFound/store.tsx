import { observable, action } from 'mobx';

class Store {
  @observable title = '404';

  @action changeTitle = () => {
    this.title = 'Not Found Page';
  }
}

export default new Store();
