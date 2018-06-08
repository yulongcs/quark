import { Layout } from 'antd';
import { History } from 'history';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Router } from 'react-router-dom';
import { authStore, setUnauthenticated } from '../stores';
import AppHeader from './components/index-charon/AppHeader';
import AppMenu from './components/index-charon/AppMenu';
import Routes from './components/Routes';
import styles from './index-charon.module.less';
import Store from './Store';

const { Sider, Content } = Layout;

interface IProps {
  history: History;
}

@observer
class App extends React.Component<IProps> {

  store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store();
  }

  render() {

    const { collapsed, setCollapsed } = this.store;

    return <Router history={this.props.history}>
      {
        authStore.authed ?
          (
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
                  logout={setUnauthenticated}
                />
                <Content style={{ margin: '24px 16px 0' }}>
                  <Routes />
                </Content>
              </Layout>
            </Layout >
          ) : <Layout><Routes /></Layout>
      }
    </Router>
  }
}

export default App;
