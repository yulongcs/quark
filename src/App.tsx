import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import HeaderComponent from './Header';
import LoadingComponent from './Loading';

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "homeChunk" */'./Home/Home'),
  loading: LoadingComponent,
  modules: ['homeChunk'],
  delay: 200, // 200ms
  timeout: 10000 // 10s
});

const AsyncNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notFoundChunk" */'./NotFound'),
  loading: LoadingComponent,
  modules: ['notFoundChunk'],
  delay: 200, // 200ms
  timeout: 10000 // 10s
});

const App = (props: {}) => {

  const AsyncHome = Loadable({
    loader: () => import('./Home/Home'),
    loading: LoadingComponent,
    delay: 200, // 200ms
    timeout: 10000 // 10s
  });
  const AsyncWelcome = Loadable({
    loader: () => import('./Welcome/Welcome'),
    loading: LoadingComponent,
    delay: 200, // 200ms
    timeout: 10000 // 10s
  });
  const AsyncNotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: LoadingComponent,
    delay: 200, // 200ms
    timeout: 10000 // 10s
  });

  return (
    <div>
        <HeaderComponent />
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
            <Route path="/welcome" component={AsyncWelcome} />
            <Route path="*" component={AsyncNotFound} />
          </Switch>
        </div>
    </div>
  );
};

export default App;
