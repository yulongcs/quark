import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { loadable } from '../../utils';

const Routes = () => {
  return (
    <Switch>
      <Route key='default' exact={true} path='/'><Redirect to={{ pathname: '/home' }} /></Route>
      <Route key='home' path='/home' component={loadable(() => import('../../pages/Home'))} />
      {/* <Route key='/subframe' path='/subframe' render={subframe} /> */}
      {/* <Route key='not-found' path='*' component={loadable(() => import('../pages/common/NotFound'))} /> */}
    </Switch>
  );
};

export default Routes;
