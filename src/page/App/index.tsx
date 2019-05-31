import * as React from 'react';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { Loadable } from '@vdfor/react-component';
import { AliveComponent } from '../../components';
import { history } from '../../utils';

const HomeComponent = React.lazy(() => import('../Home'));

const App: React.SFC = () => (
  <AliveComponent>
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: '/home' }} />
        </Route>
        <Route path="/home" component={Loadable(HomeComponent)} />
      </Switch>
    </Router>
  </AliveComponent>
);

export default App;
