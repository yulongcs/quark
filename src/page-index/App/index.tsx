import * as React from 'react';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { WaitingComponent, AliveComponent } from '../../components';
import { history } from '../../utils';

const HomeComponent = React.lazy(() => import('../Home'));
const NotFoundComponent = React.lazy(() => import('../../components/NotFound'));

const App: React.SFC = () => (
  <AliveComponent>
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Redirect to={{ pathname: '/home' }} />
        </Route>
        <Route path="/home" component={WaitingComponent(HomeComponent)} />
        <Route path="*" component={WaitingComponent(NotFoundComponent)} />
      </Switch>
    </Router>
  </AliveComponent>
);

export default App;
