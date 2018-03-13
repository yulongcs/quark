import * as React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { Menu } from 'antd';
import * as Loadable from 'react-loadable';
import LoadingComponent from './Loading';

interface Props {
  pathname?: string;
}

const AsyncHome = Loadable({
  loader: () => import('./Home/Home'),
  loading: LoadingComponent,
  delay: 200, // 200ms
  timeout: 10000 // 10s
});
// const AsyncWelcome = Loadable({
//   loader: () => import('./Welcome/Welcome'),
//   loading: LoadingComponent,
//   delay: 200, // 200ms
//   timeout: 10000 // 10s
// });
const AsyncNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: LoadingComponent,
  delay: 200, // 200ms
  timeout: 10000 // 10s
});

const App = (props: Props) => {

  const pathname = window ? location.pathname : (props.pathname || '/');

  const currentPage = (!process.env.PUBLIC_URL && !pathname) ? 'home' :
    (pathname.replace(new RegExp(`${process.env.PUBLIC_URL}`, 'g'), '').replace(/\//g, '') || 'home');

  return (
    <div>
        {
          currentPage !== 'welcome' ? (
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[currentPage]}
            >
              <Menu.Item key="home">
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="help">
                <Link to="/help">Help</Link>
              </Menu.Item>
            </Menu>
          ) : null
        }
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
            {/* <Route path="/welcome" component={AsyncWelcome} /> */}
            <Route path="*" component={AsyncNotFound} />
          </Switch>
        </div>
    </div>
  );
};

export default App;
