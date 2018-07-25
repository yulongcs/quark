import { Icon, Layout, Menu } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { IMenu, ISiderMenuProps } from '../types';

@observer
class SiderMenu extends React.Component<ISiderMenuProps> {

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
        <Menu.Item key={menu.path} onClick={this.props.handleMenuItemClick(menu.path || '')}>
          {menu.icon ? <Icon type={menu.icon || 'appstore'} /> : null}
          <span>{menu.name}</span>
        </Menu.Item>
      );
    }
    return vdom;
  }

  public componentDidMount() {
    // this.store.init();
  }

  public componentWillUnmount() {
    // // 销毁autorun 防止内存泄漏 
    // const { disposer } = this.store;
    // if (disposer) {
    //   disposer();
    // }
  }

  public render() {

    return (
      <Layout.Sider
        trigger={null}
        collapsible={true}
        collapsed={this.props.menuCollapsed}
        style={{ height: '100vh', overflow: 'auto' }}
        width={256}
      >
        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px' }} />
        <Menu
          theme='dark'
          mode='inline'
          onOpenChange={this.props.handleMenuOpenChange()}
          selectedKeys={[this.props.selectedKey]}
          openKeys={this.props.openKeys.map(i => i)}
        >
          {this.props.menus.map(i => this.generateMenu(i))}
        </Menu>
      </Layout.Sider>
    );
  }
}

export default SiderMenu; 
