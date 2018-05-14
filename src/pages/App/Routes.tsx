import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import LoadingComponent from '../Loading';
import PrivateRoute from '../../common/PrivateRoute';

const getAsyncComponent = (entry: any) => {
  return Loadable({
    loader: entry,
    loading: LoadingComponent,
    delay: 200, // 200ms
    timeout: 10000 // 10s
  });
};

const RoutesComponent = () => (
  <Switch>
    <Route exact={true} path="/"><Redirect to={{ pathname: '/home' }} /></Route>
    <Route key="home" path="/home" component={getAsyncComponent(() => import('../Home/index'))} />
    <Route key="about" path="/about" component={getAsyncComponent(() => import('../About/index'))} />
    <Route key="echarts" path="/echarts" component={getAsyncComponent(() => import('../Echarts/index'))} />
    <PrivateRoute key="welcome" path="/welcome" component={getAsyncComponent(() => import('../Welcome/index'))} />
    <Route key="not-found" path="*" component={getAsyncComponent(() => import('../NotFound/index'))} />
  </Switch>
);

export default RoutesComponent; 
