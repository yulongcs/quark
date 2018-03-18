import * as React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import * as Loadable from 'react-loadable';
import LoadingComponent from './Loading';
import styles from './App.less';

const { Header, Content, Footer, Sider } = Layout;

const getAsyncComponent = (entry: any) => {
  return Loadable({
    loader: entry,
    loading: LoadingComponent,
    delay: 200, // 200ms
    timeout: 10000 // 10s
  });
};

// config routes
const routes = [
  {
    name: 'home',
    component: getAsyncComponent(() => import('./Home/index'))
  }, {
    name: 'login',
    component: getAsyncComponent(() => import('./Login/index'))
  }, {
    name: 'welcome',
    component: getAsyncComponent(() => import('./Welcome/index'))
  }, {
    name: '*',
    component: getAsyncComponent(() => import('./NotFound'))
  }
];

const route = (
  <Switch>
    <Route exact={true} path="/">
      <Redirect
        to={{
          pathname: '/home'
        }}
      />
    </Route>
    {routes.map(i => (
      <Route
        key={i.name}
        path={`/${i.name}`}
        component={i.component}
      />
    ))}
  </Switch>
);

class App extends React.Component<{}, { collapsed: boolean; }> {

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {

    const pathname = location.pathname;
    const currentPage = (!process.env.PUBLIC_URL && !pathname) ? 'home' :
      (pathname.replace(new RegExp(`${process.env.PUBLIC_URL}`, 'g'), '').replace(/\//g, '') || 'home');

    return currentPage !== 'login' && currentPage !== 'welcome' ?
      (
        <Layout>
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={this.state.collapsed}
            style={{ height: '100vh' }}
          >
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPage]}>
              <Menu.Item key="home">
                <Link to="/home">
                  <Icon type="home" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="info">
                <Link to="/login">
                  <Icon type="info" />
                  <span>Info</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.headerNavRight}>
                <Button type="primary"><Link to="/login">登录或注册</Link></Button>
              </div>
            </Header>
            <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff' }}>
              {route}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              react-sail ©2017-present Created by vdfor
            </Footer>
          </Layout>
        </Layout>
      ) : <div>{route}</div>;
  }
}

export default App;
