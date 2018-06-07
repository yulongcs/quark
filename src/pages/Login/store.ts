import { message } from 'antd';
import { action, observable } from 'mobx';
import { routeStore } from '../../stores';
import { storage } from '../../utils/helper';

class LoginStore {
  usernameFieldTouched: boolean;
  passwordFieldTouched: boolean;

  @observable username: string;
  @observable password: string;
  @observable remember: boolean;


  constructor() {
    // field is not touched at the beginning
    this.usernameFieldTouched = false;
    this.passwordFieldTouched = false;
    
    this.username = '';
    this.password = '';
    this.remember = true;
  }

  @action handleInputChange = (id: 'username' | 'password' | 'remember') => (e: any) => {
    if (id === 'remember') {
      this.remember = e.target.checked;
      return;
    }

    if (!this[`${id}FieldTouched`]) {
      this[`${id}FieldTouched`] = true;
    }
    this[id] = e.target.value;
  }

  @action handleSubmit = () => {
    // e.preventDefault();
    const { username, password, remember } = this;
    if (username.trim() === 'admin' && password === 'admin') {
      const credentials = JSON.stringify({
        access_token: 'test-token',
        user: { id: 1, username: username.trim() }
      });
      storage.setItem(remember ? 'local' : 'session', 'credentials', credentials);
      routeStore.goPage('/');
      return;
    }
    message.error('用户名或密码错误');
  }
}

export default LoginStore;
