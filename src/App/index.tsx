import { Layout } from 'antd';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WaitingComponent } from '../components';

const HomeComponent = (React as any).lazy(() => import('../pages/Home'));
const NotFound = (React as any).lazy(() => import('../pages/NotFound'));

const Routes = () => {
  return (
    <Switch>
      <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
      <Route key='/home' path='/home' component={WaitingComponent(HomeComponent)} />
      <Route path='*' component={WaitingComponent(NotFound)} />
    </Switch>
  );
};

const App = () => (
  <Layout>
    <Layout style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Layout.Content style={{ margin: '24px 16px 0' }}>
        <Routes />
      </Layout.Content>
    </Layout>
  </Layout>
);

export default App;
