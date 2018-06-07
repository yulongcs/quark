import { Form } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { FormExtra, FormInput, FormSubmit } from './components';
import Store from './LoginStore';
import logo from './logo.svg';
import styles from './style.module.less';

@observer
class Login extends React.Component<{}> {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = new Store();
  }

  render() {
    const { usernameFieldTouched, passwordFieldTouched, username, password, remember, handleSubmit, handleInputChange } = this.store;

    const usernameError = !username.trim() && usernameFieldTouched;
    const passwordError = !password && passwordFieldTouched;

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.title}>react sail</span>
        </div>
        <div className={styles.login}>
          <Form onSubmit={handleSubmit} className={styles.form}>
            <FormInput
              id="username"
              value={username}
              validateError={usernameError}
              validateTips="Please input your username!"
              icon="user"
              placeholder="admin"
              handleInputChange={handleInputChange}
            />
            <FormInput
              id="password"
              value={password}
              validateError={passwordError}
              validateTips="Please input your password!"
              icon="lock"
              type="password"
              placeholder="admin"
              handleInputChange={handleInputChange}
            />
            <FormExtra
              checked={remember}
              handleInputChange={handleInputChange}
            />
            <FormSubmit disabled={!username.trim() || !password} />
          </Form>
        </div>
      </div>
    );
  }

}

export default Login;
