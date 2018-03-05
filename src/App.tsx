import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import HeaderComponent from './Header';
import LoadingComponent from './Loading';

interface Props {
  pathname: string;
}

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

const App = (props: Props) => {

  const { pathname } = props;
  // defaultSelectedKeys
  const defaultSelectedKey = (!process.env.PUBLIC_URL && !pathname) ? 'home' :
    (pathname.replace(new RegExp(`${process.env.PUBLIC_URL}`, 'g'), '').replace(/\//g, '') || 'home');

  return (
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
  );
};

export default App;
