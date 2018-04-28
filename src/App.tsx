import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Route, Redirect, Switch, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import * as Loadable from 'react-loadable';
import LoadingComponent from './Loading';
import { RootStore } from './stores/RootStore';
// import requireAuth from './common/Auth';
import PrivateRoute from './common/PrivateRoute';
import styles from './App.less';

const { Header, Content, Sider } = Layout;

const getAsyncComponent = (entry: any) => {
  return Loadable({
    loader: entry,
    loading: LoadingComponent,
    delay: 200, // 200ms
    timeout: 10000 // 10s
  });
};

// config menus
const menus = [
  {
    id: '/home',
    label: 'Home',
    icon: 'home',
    path: '/home'
  },
  {
    id: 'users',
    label: '用户管理',
    icon: 'user',
    path: '/users',
    sub: [
      { id: '/users/customer', label: '前台用户', path: '/users/customer' },
      { id: '/users/admin', label: '后台用户', path: '/users/admin' }
    ]
  }
];

const getDefaultSelected = (location: { [key: string]: string | any }) => {
  const initStr = '/home';

  const pathname = location.pathname;
  const arr = pathname.split('/');
  if (arr.length > 1) {
    const k = arr[1];
    return k ? pathname : initStr;
  }
  return pathname;
};

const getDefaultOpen = (s: string) => {
  let str = '';
  const k = s.split('/')[1] || null;
  if (k) {
    try {
      menus.forEach(m => {
        if (m.id === k && m.sub) {
          str = m.id;
          throw new Error('exit-forEach');
        }
      });
    } catch (e) {
      if (e.message !== 'exit-forEach') {
        throw e;
      }
    }
  }
  return str;
};

const routes = (
  <Switch>
    <Route exact={true} path="/"><Redirect to={{ pathname: '/home' }} /></Route>
    <Route key="home" path="/home" component={getAsyncComponent(() => import('./Home'))} />
    <PrivateRoute key="welcome" path="/welcome" component={getAsyncComponent(() => import('./Welcome'))} />
    <Route key="not-found" path="*" component={getAsyncComponent(() => import('./NotFound'))} />
  </Switch>
);

interface Props extends RouteComponentProps<any>, React.Props<any> {
  rootStore: RootStore;
}

interface ResponsiveData {
  siderStyle: { [key: string]: string | any };
  mLayoutStyle: { marginLeft: number; };
}

@observer
class App extends React.Component<Props, {}> {

  // 定义一个用于触发更新的变量
  @observable key = Math.random();
  // 视图触发器，里面什么也不用做
  @action renderTrigger = (num: number) => {
    // console.log('view updated');
  }
  // update key
  @action updateKey = () => { this.key = Math.random(); };

  responsiveData: ResponsiveData;

  changeResponsiveData = (device: 'pc' | 'mobile') => {
    if (device === 'pc') {
      this.responsiveData = {
        siderStyle: { overflow: 'auto', height: '100vh', position: 'fixed', left: 0 },
        mLayoutStyle: { marginLeft: 256 }
      };
      return;
    }
    this.responsiveData = {
      siderStyle: { position: 'fixed', top: 0, bottom: 0 },
      mLayoutStyle: { marginLeft: 0 }
    };
  }

  handleCollapseChange = (collapsed: boolean, type: string) => {
    if (type === 'responsive') {
      if (collapsed) {
        this.changeResponsiveData('mobile');
      } else {
        this.changeResponsiveData('pc');
      }
      this.updateKey();
    }
  }

  componentWillMount() {
    this.changeResponsiveData('pc');
  }

  render() {

    this.renderTrigger(this.key);  // 这里必须传入updateKey，效果类似autorun

    const { rootStore, history, location } = this.props;
    const defaultSelected = getDefaultSelected(location);
    const defaultOpen = getDefaultOpen(defaultSelected);
    const { indicator } = rootStore;
    const { siderStyle, mLayoutStyle } = this.responsiveData;
    // console.log({ siderStyle, menuTheme, mLayoutStyle });

    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={siderStyle}
          width="256"
          onCollapse={this.handleCollapseChange}
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
        <Layout style={mLayoutStyle}>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row gutter={16}>
              {indicator.show ?
                <Col span={6}>
                  <Button
                    onClick={history.goBack}
                    style={{ border: 'none', margin: '0 15px 0 20px', fontSize: '18px', fontWeight: 'bold' }}
                    type="default"
                    shape="circle"
                    icon={indicator.icon}
                  />
                  <h2 style={{ margin: 0, fontSize: '18px', display: 'inline-block' }}>{indicator.text}</h2>
                </Col> : null}
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px 0', padding: 0, minHeight: 'calc(100vh - 88px)' }}>
            {routes}
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default withRouter(App);
