import { Layout } from 'antd';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { loadable } from '../utils';


const { Content } = Layout;

const HomeComponent = loadable(() => import('../pages/Home'));
// const TableListComponent = loadable(() => import('../pages/Components/TableList'));
// const DragComponent = loadable(() => import('../pages/Extends/Drag'));
// const JumbotronComponent = loadable(() => import('../pages/Self/Jumbotron'));

const Routes = () => {
  return (
    <Switch>
      <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
      <Route key='/home' path='/home' component={HomeComponent} />
    </Switch>
  );
};

const App = () => (
  <Layout>
    <Layout style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Content style={{ margin: '24px 16px 0' }}>
        <Routes />
      </Content>
    </Layout>
  </Layout>
);

export default App;
