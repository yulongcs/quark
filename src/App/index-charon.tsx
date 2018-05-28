import { Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { HashRouter as Router, Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { getDefaultOpen, getDefaultSelected, menus } from './helper';
import styles from './index-charon.module.less';
import RoutesComponent from './Routes';

const { Header, Sider, Content } = Layout;

interface IProps extends RouteComponentProps<any>, React.Props<any> {
  // rootStore: RootStore;
}

interface IState {
  collapsed: boolean;
}

class AppComponent extends React.Component<IProps, IState> {

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {

    const { location } = this.props;
    const defaultSelected = getDefaultSelected(location);
    const defaultOpen = getDefaultOpen(defaultSelected, menus);

    return defaultSelected !== '/login' ?
      (
        <Layout>
          <Sider
            trigger={null}
            collapsible={true}
            collapsed={this.state.collapsed}
            style={{ height: '100vh' }}
            width={256}
          >
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelected]} defaultOpenKeys={[defaultOpen]}>
              {menus.map(i => (
                i.sub ?
                  <Menu.SubMenu
                    key={i.id}
                    title={<span><Icon type={i.icon} /><span>{i.label}</span></span>}
                  >
                    {i.sub.map(sub => (
                      <Menu.Item key={sub.id}>
                        <Link to={sub.path}>
                          {sub.label}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                  :
                  <Menu.Item key={i.id}>
                    <Link to={i.path}>
                      <Icon type={i.icon} />
                      <span>{i.label}</span>
                    </Link>
                  </Menu.Item>))}
            </Menu>
          </Sider>
          <Layout style={{ height: '100vh', overflow: 'auto' }}>
            <Header className={styles.header}>
              <Icon
                className={styles.icon}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.right}>
                <a target="_blank" href="https://github.com/vdfor/react-sail" className={styles.action}>
                  <Icon className={styles.icon} type={'github'} />
                </a>
              </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <RoutesComponent />
            </Content>
          </Layout>
        </Layout>
      ) : <Layout><RoutesComponent /></Layout>;
  }
}

const WithRouterApp = withRouter(AppComponent);

const App = () => (
  <Router basename={process.env._URL}><WithRouterApp /></Router>
);

export default App;
