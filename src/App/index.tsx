import { Layout } from 'antd';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppHeader, AppSiderMenu } from '../containers';
import { loadable } from '../utils';


const { Content } = Layout;

const HomeComponent = loadable(() => import('../pages/Home'));
const TableListComponent = loadable(() => import('../pages/Components/TableList'));
const DragComponent = loadable(() => import('../pages/Extends/Drag'));
const JumbotronComponent = loadable(() => import('../pages/Self/Jumbotron'));

const Routes = () => {
  return (
    <Switch>
      <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
      <Route key='/home' path='/home' component={HomeComponent} />
      <Route key='/components/table-list' path='/components/table-list' component={TableListComponent} />
      <Route key='/extends/drag' path='/extends/drag' component={DragComponent} />
      <Route key='/self/jumbotron' path='/self/jumbotron' component={JumbotronComponent} />
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
    {process.env.NODE_ENV === 'development' && <DevTools />}
  </Layout>
);

export default App;
