import { Icon, Layout, Menu } from 'antd';
import { autorun, IReactionDisposer } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../stores';
import Store from './Store';
import { IMenu } from './types';

interface IProps {
  app?: AppStore;
}

@inject('app')
@observer
class SiderMenu extends React.Component<IProps> {

  public store: Store;

  private disposer: IReactionDisposer;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app as AppStore);

    window.addEventListener('hashchange', () => { // 路由变化时同步菜单
      this.store.app.customerStore.updateMenuTriggerKey();
    });

    this.disposer = autorun(() => {
      if (this.store.app.customerStore.menuTriggerKey) {
        this.store.syncMenuStatus();
      }
    });
  }

  // 生成单个菜单
  public generateMenu: any = (menu: IMenu) => {
    const vdom = [];
    if (menu && menu.children && menu.children.length > 0) { // 目录
      const list = [];
      for (const item of menu.children) {
        list.push(this.generateMenu(item));
      }
      vdom.push(<Menu.SubMenu key={menu.path} title={<span>{menu.icon ? <Icon type={menu.icon || 'appstore'} /> : null}<span>{menu.name}</span></span>}>{list}</Menu.SubMenu>);
    } else {
      vdom.push(
        <Menu.Item key={menu.path} onClick={this.store.handleMenuItemClick(menu.path || '')}>
          {menu.icon ? <Icon type={menu.icon || 'appstore'} /> : null}
          <span>{menu.name}</span>
        </Menu.Item>
      );
    }
    return vdom;
  }

  public componentDidMount() {
    this.store.init();
  }

  public componentWillUnmount() {
    // 销毁autorun 防止内存泄漏 
    if (this.disposer) {
      this.disposer();
    }
  }

  public render() {

    return (
      <Layout.Sider
        trigger={null}
        collapsible={true}
        collapsed={this.store.app.customerStore.menuCollapsed}
        style={{ height: '100vh', overflow: 'auto' }}
        width={256}
      >
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
        <Menu
          theme='dark'
          mode='inline'
          onOpenChange={this.store.handleMenuOpenChange()}
          selectedKeys={[this.store.selectedMenu]}
          openKeys={this.store.openMenuKeys.map(i => i)}
        >
          {this.store.menus.map(i => this.generateMenu(i))}
        </Menu>
      </Layout.Sider>
    );
  }
}

export default SiderMenu; 
