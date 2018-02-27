import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import HeaderComponent from './Header';
import LoadingComponent from './Loading';

const App = () => {
  
  const AsyncHome = Loadable({
    loader: () => import('./Home/Home'),
    loading: LoadingComponent
  });
  const AsyncNotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: LoadingComponent
  });

  // defaultSelectedKeys
  const defaultSelectedKey = (!process.env.PUBLIC_URL && !location.pathname) ? 'home' :
    (location.pathname.replace(new RegExp(`${process.env.PUBLIC_URL}`, 'g'), '').replace(/\//g, '') || 'home');

  return (
    <Router basename={process.env.PUBLICURL}>
      <div>
        <HeaderComponent defaultSelectedKey={defaultSelectedKey} />
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
