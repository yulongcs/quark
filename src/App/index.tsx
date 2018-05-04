import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { enquireScreen } from 'enquire-js';
import { RootStore } from '../stores/RootStore';
import MenusComponent from './Menus';
import Drawer from '../components/Drawer';
import RoutesComponent from './Routes';
// import requireAuth from './common/Auth';
// import styles from './style.less';

const { Header, Sider, Content } = Layout;

interface Props extends RouteComponentProps<any>, React.Props<any> {
  rootStore: RootStore;
}

@observer
class App extends React.Component<Props, {}> {

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

    const headerStyle = !this.isMobile ? { height: '64px', lineHeight: '64px' } : { height: '64px', lineHeight: '64px' };

    return (
      <Layout>
        {!this.isMobile ? (
          <Sider
            trigger={null}
            width="256"
          // onCollapse={this.handleCollapseChange}
          >
            <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
            <MenusComponent
              isMobile={false}
              pathname={this.props.location.pathname}
            />
          </Sider>) : (
            <Drawer
              visible={this.drawerVisible}
              onClose={this.toggleDrawer(false)}
            >
              <MenusComponent
                isMobile={true}
                pathname={this.props.location.pathname}
                onMenuClick={this.toggleDrawer(false)}
              />
            </Drawer>)
        }
        <Layout>
          <Header style={{ background: '#fff', padding: 0, ...headerStyle }}>
            {this.isMobile ?
              <Button onClick={this.toggleDrawer(true)} style={{ border: 'none' }} shape="circle" icon="bars" size="large" /> : null}
            {/* <Row gutter={16}>
              {indicator.show ?
                <Col span={6}>
                  <Button
                    onClick={history.goBack}
                    style={{ border: 'none', margin: '0 15px 0 20px', fontSize: '18px', fontWeight: 'bold' }}
                    type="default"
                    shape="circle"
                    icon={indicator.icon}
                  />
                  <h2 style={{ margin: 0, fontSize: '18px', display: 'inline-block' }}>{indicator.text}</h2>
                </Col> : null}
            </Row> */}
          </Header>
          <Content style={{ margin: 0, padding: 0, minHeight: `calc(100vh - ${!this.isMobile ? '64px' : '56px'})` }}>
            <RoutesComponent />
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default withRouter(App);
