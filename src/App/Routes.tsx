import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Redirect, Route, Switch } from 'react-router-dom';
// import PrivateRoute from '../common/PrivateRoute';
import LoadingComponent from '../pages/Loading';

const getAsyncComponent = (entry: any) => {
  return Loadable({
    delay: 200, // 200ms
    loader: entry,
    loading: LoadingComponent,
    timeout: 10000 // 10s
  });
};

const RoutesComponent = () => (
  <Switch>
    <Route key="default" exact={true} path="/"><Redirect to={{ pathname: '/home' }} /></Route>
    <Route key="home" path="/home" component={getAsyncComponent(() => import('../pages/Home/index'))} />
    <Route key="echarts" path="/echarts" component={getAsyncComponent(() => import('../pages/Echarts/index'))} />
    {/* <PrivateRoute key="welcome" path="/welcome" component={getAsyncComponent(() => import('../pages/Welcome/index'))} /> */}
    <Route key="not-found" path="*" component={getAsyncComponent(() => import('../pages/NotFound/index'))} />
  </Switch>
);

export default RoutesComponent; 
