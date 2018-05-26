import { observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = observer(({ component: Component, exact = false, path }) => {
  // const { authed } = rootStore;

  // storage access_token
  // const storageCredential = localStorage.getItem('credentials');
  // const credentials = storageCredential ? JSON.parse(storageCredential) : null;

  // const isAuthenticated =  credentials && credentials.access_token && authed;

  const isAuthenticated = true;

/* tslint:disable */ 
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        // props.rootStore = rootStore;
        return (
          isAuthenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
        );
      }}
    />
  );
});

/* tslint:enable */ 
export default PrivateRoute;
