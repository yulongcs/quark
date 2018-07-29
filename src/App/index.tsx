import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { AppStore } from '../stores';
import Store from './Store';
import { Header, Routes, SiderMenu } from './views';

const { Content } = Layout;

interface IProps {
  app?: AppStore;
}

@inject('app')
@observer
class App extends React.Component<{}> {

  public store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app as AppStore);

    window.addEventListener('hashchange', () => { // 路由变化时同步菜单
      this.store.app.customerStore.updateMenuTriggerKey();
    });
  }

  public componentDidMount() {
    this.store.init();
  }

  public componentWillUnmount() {
    if (this.store.disposer) {
      this.store.disposer();
    }
  }

  public render() {
    const { siderMenuProps, headerProps } = this.store;

    return (
      <Layout>
        <SiderMenu {...siderMenuProps} />
        <Layout style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          <Header {...headerProps} />
          <Content style={{ margin: '24px 16px 0' }}>
            <Routes />
          </Content>
        </Layout>
        {process.env.NODE_ENV === 'development' ? <DevTools /> : null}
      </Layout>
    );
  }
}

export default App;
