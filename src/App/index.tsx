import { Icon, Layout, Menu } from 'antd';
import { SiderTheme } from 'antd/lib/layout/Sider';
import * as _ from 'lodash';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WaitingComponent } from '../components';
import { MENUS } from '../constants';
import AppContext, { IAppContextState, initAppContextValue } from './Context';
import styles from './index.module.scss';
import { IMenu } from './types';

interface IState extends IAppContextState {
  menusDom: any[];
}

const HomeComponent = (React as any).lazy(() => import('../pages/Home'));
const NotFound = (React as any).lazy(() => import('../pages/NotFound'));

const generateMenu = (menu: IMenu) => {
  const vdom = [];
  if (menu && menu.children && menu.children.length > 0) { // 目录
    const list = [];
    for (const item of menu.children) {
      list.push(generateMenu(item));
    }
    vdom.push(<Menu.SubMenu key={menu.path} title={<span>{menu.icon ? <Icon type={menu.icon || 'appstore'} /> : null}<span>{menu.name}</span></span>}>{list}</Menu.SubMenu>);
  } else {
    vdom.push(
      <Menu.Item key={menu.path}>
        {menu.icon ? <Icon type={menu.icon || 'appstore'} /> : null}
        <span>{menu.name}</span>
      </Menu.Item>
    );
  }
  return vdom;
};

class App extends React.Component<{}, IState> {

  public state = {
    ...initAppContextValue.state,
    menusDom: []
  };

  public setTheme = (theme: SiderTheme) => {
    this.setState(state => ({
      ...state,
      theme
    }));
  }

  public render() {
    const { setTheme, state } = this;
    const { theme } = state;
    const appContextValue = _.omit(this.state, 'menusDom');

    return (
      <AppContext.Provider
        value={{
          state: appContextValue,
          action: {
            setTheme
          }
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Sider width={256} className={styles.siderMenu + ' ' + styles.fixed}>
            <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
            <Menu
              theme={theme}
              mode='inline'
            >
              {MENUS.map(i => generateMenu(i))}
            </Menu>
          </Layout.Sider>
          <Layout style={{ paddingLeft: 256 }}>
            <Layout.Header style={{ background: '#fff', padding: 0 }} />
            <Layout.Content style={{ margin: '24px 16px 0' }}>
              <Switch>
                <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
                <Route key='/home' path='/home' component={WaitingComponent(HomeComponent)} />
                <Route path='*' component={WaitingComponent(NotFound)} />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default App;
