import { observable, action } from 'mobx';
import axios from 'axios';
// import client from '../common/client';

export class HomeStore {
  @observable title: string;

  @action loadTitle = async () => {
    try {
      const result = await axios.get('/api/v0/test');
      this.title = result.data.title;
    } catch (error) {
      console.error(error);
      this.title = 'Error';
    }
  }

  constructor() {
    this.title = 'Hello, react-sail';
  }

}

export default new HomeStore();
