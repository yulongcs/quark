import { Layout } from 'antd';
import { History } from 'history';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppStore } from '../stores';
import loadable from '../utils/loadable';
import styles from './index.module.less';
import Store from './Store';
import AppHeader from './views/AppHeader';
import AppMenu from './views/AppMenu';

const { Sider, Content } = Layout;

interface IProps {
  history: History;
  app: AppStore;
}

@inject('app')
@observer
class App extends React.Component<IProps> {

  store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app);
  }

  render() {

    const { collapsed, setCollapsed, logout } = this.store;

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          style={{ height: '100vh' }}
          width={256}
        >
          <div className={styles.logo} />
          <AppMenu />
        </Sider>
        <Layout style={{ height: '100vh', overflow: 'auto' }}>
          <AppHeader
            collapsed={collapsed}
            toggle={setCollapsed}
            logout={logout}
          />
          <Content style={{ margin: '24px 16px 0' }}>
            <Switch>
              <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
              <Route key='home' path='/home' component={loadable(() => import('../pages/Home'))} />
            </Switch>
          </Content>
        </Layout>
      </Layout >
    )
  }
}

export default App;
