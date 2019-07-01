import * as React from 'react';
import {
  Redirect,
  Router,
  Switch
} from 'react-router-dom';
import { Loadable } from '@vdfor/react-component';
import { useDispatch } from 'react-redux';
import { setRouteAction } from './action';
import { AliveComponent, Route } from '../../components';
import { history } from '../../utils';

const HomeComponent = React.lazy(() => import('../Home'));
const AboutComponent = React.lazy(() => import('../About'));

const routes = [
  { path: '/home', component: Loadable(HomeComponent), title: 'Home' },
  { path: '/about', component: Loadable(AboutComponent), title: 'About' }
];

const App: React.SFC = () => {
  const dispatch = useDispatch();
  const setRoute = (route: string) => {
    dispatch(setRouteAction(route));
  };
  const basicProps = {
    setRoute,
    title: 'quark'
  };
  return (
    <AliveComponent>
      <Router history={history}>
        <Switch>
          <Route {...basicProps} exact path="/">
            <Redirect to={{ pathname: '/home' }} />
          </Route>
          {routes.map(i => <Route key={i.path} {...{ ...basicProps, ...i }} />)}
        </Switch>
      </Router>
    </AliveComponent>
  );
};

export default App;
