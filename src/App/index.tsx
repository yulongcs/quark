import { Layout } from 'antd';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppHeader, AppSiderMenu } from '../containers';
import { loadable } from '../utils';


const { Content } = Layout;

const Routes = () => {
  return (
    <Switch>
      <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
      <Route key='/home' path='/home' component={loadable(() => import('../pages/Home'))} />
      <Route key='/components/table-list' path='/components/table-list' component={loadable(() => import('../pages/Components/TableList'))} />
      {/* <Route key='/subframe' path='/subframe' render={subframe} /> */}
      {/* <Route key='not-found' path='*' component={loadable(() => import('../pages/common/NotFound'))} /> */}
    </Switch>
  );
};

const App = () => (
  <Layout>
    <AppSiderMenu />
    <Layout style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <AppHeader />
      <Content style={{ margin: '24px 16px 0' }}>
        <Routes />
      </Content>
    </Layout>
    {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
  </Layout>
);

export default App;
