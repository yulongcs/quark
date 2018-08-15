import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { loadable } from '../utils';

const Routes = () => {
  return (
    <Switch>
      <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
      <Route key='/home' path='/home' component={loadable(() => import('../mobilePages/Home'))} />
      {/* <Route key='/components/table-list' path='/components/table-list' component={loadable(() => import('../pages/Components/TableList'))} /> */}
      {/* <Route key='/subframe' path='/subframe' render={subframe} /> */}
      {/* <Route key='not-found' path='*' component={loadable(() => import('../pages/common/NotFound'))} /> */}
    </Switch>
  );
};

const App = () => (
  <React.Fragment>
    <Routes />
    {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
  </React.Fragment>
);

export default App;
