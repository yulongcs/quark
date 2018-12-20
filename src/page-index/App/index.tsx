import { Layout, Menu } from 'antd';
import * as React from 'react';
import {
  Link,
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { WaitingComponent } from '../../components';
import { history } from '../../utils';
import styles from './index.module.scss';

const HomeComponent = React.lazy(() => import('../Home'));
const GlobalSettingComponent = React.lazy(() => import('../GlobalSetting'));
const NotFoundComponent = React.lazy(() => import('../NotFound'));

const App: React.SFC<{}> = () => (
  <Router history={history}>
    <Layout>
      <Layout.Header className={styles.header}>
        <div className={styles.logo} />
        <Menu
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='1'><Link to='/home'>Home</Link></Menu.Item>
          <Menu.Item key='2'><Link to='/nav1'>NAV1</Link></Menu.Item>
          <Menu.Item key='3'><Link to='/nav2'>NAV2</Link></Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content className={styles.content}>

        <Switch>
          <Route exact={true} path='/'>
            <Redirect to={{ pathname: '/home' }} />
          </Route>
          <Route path='/home' component={WaitingComponent(HomeComponent)} />
          <Route path='/global-setting' component={WaitingComponent(GlobalSettingComponent)} />
          <Route path='*' component={WaitingComponent(NotFoundComponent)} />
        </Switch>
      </Layout.Content>
    </Layout>
  </Router>
);

export default App;
