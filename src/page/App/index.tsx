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

const HomePage = React.lazy(() => import('../Home'));
const ListPage = React.lazy(() => import('../List'));

const routes = [
  { path: '/home', component: Loadable(HomePage), title: 'Home' },
  { path: '/list', component: Loadable(ListPage), title: '列表' }
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
