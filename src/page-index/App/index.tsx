// import { Layout } from 'antd';
import * as React from 'react';
// import {
//   Redirect,
//   Route,
//   Router,
//   Switch
// } from 'react-router-dom';
import { ThemeContext } from './Context';
// import { WaitingComponent } from '../../components';
// import { history } from '../../utils';
// import styles from './index.module.scss';
import { HeaderBar } from './views';

// const HomeComponent = React.lazy(() => import('../Home'));
// const LinkComponent = React.lazy(() => import('../Link'));
// const GlobalSettingComponent = React.lazy(() => import('../GlobalSetting'));
// const NotFoundComponent = React.lazy(() => import('../NotFound'));

class App extends React.Component<{}> {

  // constructor(props: {}) {
  //   super(props);
  // }

  public render() {
    return (
      // <Router history={history}>
      // <Layout>
      <ThemeContext.Provider value='dark'>
        <HeaderBar />
      </ThemeContext.Provider>
    );
    {/* <Layout.Content className={styles.content}>
            <Switch>
              <Route exact={true} path='/'>
                <Redirect to={{ pathname: '/home' }} />
              </Route>
              <Route path='/home' component={WaitingComponent(HomeComponent)} />
              <Route path='/link' component={WaitingComponent(LinkComponent)} />
              <Route path='/global-setting' component={WaitingComponent(GlobalSettingComponent)} />
              <Route path='*' component={WaitingComponent(NotFoundComponent)} />
            </Switch>
          </Layout.Content> */}
    // </Layout>
    // )
    {/* </Router> */ }
    // )
  }
}

export default App;
