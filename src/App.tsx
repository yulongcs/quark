import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './AsyncComponent';
import Header from './Header';

const App = () => {
  const AsyncHome = asyncComponent(() => import('./Home/Home'));
  const AsyncNotFound = asyncComponent(() => import('./NotFound'));

  return (
    <Router>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact={true} path="/">
              <Redirect
                to={{
                  pathname: '/home'
                }}
              />
            </Route>
            <Route path="/home" component={AsyncHome} />
            <Route path="*" component={AsyncNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
