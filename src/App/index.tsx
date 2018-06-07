import { Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, RouteComponentProps, withRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getAsyncComponent } from './helper';

const { Content } = Layout;

interface Iprops extends RouteComponentProps<any>, React.Props<any> {
  // rootStore: RootStore;
}

@observer
class AppComponent extends React.Component<Iprops, {}> {

  @observable isMobile: boolean = false;
  @observable drawerVisible: boolean = false;

  @action toggleDrawer = (open: boolean) => () => {
    this.drawerVisible = open;
  }

  componentDidMount() {
    enquireScreen((b: boolean) => {
      this.isMobile = !!b;
    });
  }

  render() {

    return (
      <Layout>
        <Content style={{ background: '#fff', padding: '24px' }}>
          <Switch>
            <Route key="default" exact={true} path="/"><Redirect to={{ pathname: '/home' }} /></Route>
            <Route key="home" path="/home" component={getAsyncComponent(() => import('../pages/Home/index'))} />
            <Route key="not-found" path="*" component={getAsyncComponent(() => import('../pages/NotFound/index'))} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

const WithRouterApp = withRouter(AppComponent);

const App = () => (
  <Router basename={process.env._URL}><WithRouterApp /></Router>
);

export default App;
