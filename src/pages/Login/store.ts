import { action, observable } from 'mobx';

class LoginStore {
  @observable username: string;
  @observable password: string;
  @observable remember: boolean;


  @action public changeTitle = () => {
    this.title = 'Not Found Page';
  }
}

export default LoginStore;
