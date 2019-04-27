import { Layout } from 'antd';
import * as React from 'react';
import {
  Redirect,
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { WaitingComponent } from '../../components';
import { history } from '../../utils';
import { APP_CONTEXT_INIT_VALUES, AppContext } from '../common';
import styles from './index.module.scss';
import { Header } from './views';

const HomeComponent = React.lazy(() => import('../Home'));
const LinkComponent = React.lazy(() => import('../Link'));
const NotFoundComponent = React.lazy(() => import('../NotFound'));

const App = () => (
  <AppContext.Provider value={APP_CONTEXT_INIT_VALUES}>
    <Router history={history}>
      <Layout>
        <Header />
        <Layout.Content className={styles.content}>
          <Switch>
            <Route exact path="/">
              <Redirect to={{ pathname: '/home' }} />
            </Route>
            <Route path="/home" component={WaitingComponent(HomeComponent)} />
            <Route path="/link" component={WaitingComponent(LinkComponent)} />
            <Route path="*" component={WaitingComponent(NotFoundComponent)} />
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  </AppContext.Provider>
);

export default App;
