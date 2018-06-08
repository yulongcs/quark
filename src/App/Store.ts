import { action, observable } from 'mobx';

class Store {

  @observable collapsed: boolean;

  constructor(collapsed: boolean = false) {
    this.collapsed = collapsed;
  }

  @action setCollapsed = () => {
    this.collapsed = !this.collapsed;
  }

}

export default Store;
