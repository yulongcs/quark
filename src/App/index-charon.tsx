import { Avatar, Icon, Layout, Menu } from 'antd';
import { History } from 'history';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, Router } from 'react-router-dom';
import { authStore } from '../stores';
import { getCredentials, storage } from '../utils/helper';
import { getDefaultOpen, getDefaultSelected, menus } from './helper';
import styles from './index-charon.module.less';
import Routes from './Routes';

const { Header, Sider, Content } = Layout;

// interface IProps extends RouteComponentProps<any>, React.Props<any> {
//   // rootStore: RootStore;
// }

interface IProps {
  history: History;
}

interface IState {
  collapsed: boolean;
}

@observer
class App extends React.Component<IProps, IState> {

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleLogout = () => {
    storage.removeItem('credentials');
    // rootStore.setAuthed(false);
  }

  render() {
    console.log(authStore.authed);
    const hash = location.hash.replace(/\#/g, '');
    const defaultSelected = getDefaultSelected(hash);
    const defaultOpen = getDefaultOpen(defaultSelected, menus);

    const loggedInUser = getCredentials('user');

    return <Router history={this.props.history}>
      {
        defaultSelected !== '/login' ?
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
                    <Menu mode="horizontal" selectedKeys={['']}>
                      <Menu.Item key={0}><a target="_blank" href="https://github.com/vdfor/react-sail"><Icon className={styles.icon} type={'github'} /></a></Menu.Item>
                      <Menu.SubMenu
                        key={1}
                        style={{ lineHeight: '64px' }}
                        title={[
                          <Avatar key={1.1} style={{ background: '#f56a00' }}>
                            {loggedInUser && loggedInUser.username ? loggedInUser.username.substring(0, 1).toUpperCase() : ''}
                          </Avatar>,
                          <span key={1.2} style={{ paddingLeft: '5px' }}>{loggedInUser && loggedInUser.username || ''}</span>
                        ]}
                      >
                        <Menu.Item key={2}>个人中心</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key={3} onClick={this.handleLogout}>
                          退出登录
                    </Menu.Item>
                      </Menu.SubMenu>
                    </Menu>
                  </div>
                </Header>
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
