import * as React from 'react';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { WaitingComponent } from '../../components';
import { history } from '../../utils';
import reducer from './reducer';
import { Provider, initialState } from './context';

const HomeComponent = React.lazy(() => import('../Home'));

const App: React.SFC = () => {
  const [state, initDispatch] = React.useReducer(reducer, initialState);
  const dispatch = (action: any) => {
    if (typeof action === 'function') {
      return action(initDispatch);
    }
    return initDispatch(action);
  };
  return (
    <Provider value={{ state, dispatch }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to={{ pathname: '/home' }} />
          </Route>
          <Route path="/home" component={WaitingComponent(HomeComponent)} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
