import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
import { option as particleOption } from './particles';
import { RootStore } from '../stores/RootStore';
import styles from './style.less';
import 'particles.js';

const FormItem = Form.Item;

interface States {
  userName: string;
  password: string;
  remember: boolean;
}

interface Props {
  rootStore: RootStore;
  history: { [key: string]: string | any };
}

@inject('rootStore')
@observer
class LoginComponent extends React.Component<Props, States> {

  // field is not touched at the beginning
  userNameFieldTouched = false;
  passwordFieldTouched = false;

  state = {
    userName: '',
    password: '',
    remember: true
  };

  userNameChange = (e: any) => {
    if (!this.userNameFieldTouched) {
      this.userNameFieldTouched = true;
    }
    this.setState({ userName: e.target.value });
  }

  passwordChange = (e: any) => {
    if (!this.passwordFieldTouched) {
      this.passwordFieldTouched = true;
    }
    this.setState({ password: e.target.value });
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { userName, password, remember } = this.state;
    console.log({
      userName: userName.trim(),
      password,
      remember
    });
    // set credentials if respond ok from server
    localStorage.setItem('credentials', JSON.stringify({
      user: {
        id: 1,
        name: userName
      },
      access_token: '123456789'
    }));
    this.props.rootStore.setAuthed(true);
    this.props.history.push('/');
  }

  componentDidMount() {
    // particle init
    (window as any).particlesJS('particles-js', particleOption);
  }

  render() {

    const { userNameFieldTouched, passwordFieldTouched, state } = this;
    const { userName, password, remember } = state;

    const userNameError = !userName.trim() && userNameFieldTouched;
    const passwordError = !password && passwordFieldTouched;

    return (
      <section className={styles.container}>
        <div id="particles-js" className={styles.particles} />
        <Card>
          <h1 className={styles.loginTitle}>react-sail</h1>
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <FormItem
              validateStatus={userNameError ? 'error' : 'success'}
              help={userNameError ? 'Please input your username!' : ''}
            >
              <Input
                id="userName"
                value={userName}
                onChange={this.userNameChange}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : 'success'}
              help={passwordError ? 'Please input your password!' : ''}
            >
              <Input
                id="password"
                value={password}
                onChange={this.passwordChange}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <FormItem>
              <Checkbox
                checked={remember}
                onChange={(e) => { this.setState({ remember: e.target.checked }); }}
              >
                Remember me
              </Checkbox>
              <a className={styles.loginFormForgot}>Forgot password</a>
              <Button
                disabled={!userName.trim() || !password}
                type="primary"
                htmlType="submit"
                className={styles.loginFormButton}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </Card>
      </section>
    );
  }

}

export default LoginComponent;
