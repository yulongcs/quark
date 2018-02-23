import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './common/AsyncComponent';
import Header from './Header';

const App = () => {
  const AsyncHome = asyncComponent(() => import('./Home/Home'));
  const AsyncNotFound = asyncComponent(() => import('./NotFound'));

  // defaultSelectedKeys
  const defaultSelectedKey = (!process.env.PUBLIC_URL && !location.pathname) ? 'home' :
    (location.pathname.replace(new RegExp(`\/\\${process.env.PUBLIC_URL}/g`.replace(/^\/|\/$/g, '')), '').replace(/\//g, '') || 'home');
  console.log(defaultSelectedKey);
  return (
    <Router basename={process.env.PUBLICURL}>
      <div>
        <Header defaultSelectedKey={defaultSelectedKey} />
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
