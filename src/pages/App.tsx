import { History } from 'history';
import * as React from 'react';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { WaitingComponent } from '../components';

export interface IAppProps {
  history: History;
}

const HomeComponent = React.lazy(() => import('./Home'));
const NotFoundComponent = React.lazy(() => import('./NotFound'));

const App: React.SFC<IAppProps> = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={{ pathname: '/home' }} />
      </Route>
      <Route path='/home' component={WaitingComponent(HomeComponent)} />
      <Route path='*' component={WaitingComponent(NotFoundComponent)} />
    </Switch>
  </Router>
);

export default App;
