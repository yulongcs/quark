import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

interface Props {
  isMobile: boolean;
  onMenuClick?: Function;
}

// config menus
const menuItems = [
  {
    id: '/home',
    label: 'Home',
    icon: 'home',
    path: '/home'
  },
  {
    id: 'users',
    label: '用户管理',
    icon: 'user',
    path: '/users',
    sub: [
      { id: '/users/customer', label: '前台用户', path: '/users/customer' },
      { id: '/users/admin', label: '后台用户', path: '/users/admin' }
    ]
  }
];

class MenusComponent extends React.Component<Props, {}> {

  handleMenuClick = () => {
    const { onMenuClick } = this.props;
    if (onMenuClick) {
      onMenuClick();
    }
  }
  // <Menu theme="dark" mode="inline">
  // {menus.map(i => (
  //   i.sub ?
  //     <Menu.SubMenu
  //       key={i.id}
  //       title={<span><Icon type={i.icon} /><span>{i.label}</span></span>}
  //     >
  //       {i.sub.map(sub => (
  //         <Menu.Item key={sub.id}>
  //           <Link to={sub.path}>
  //             {sub.label}
  //           </Link>
  //         </Menu.Item>
  //       ))}
  //     </Menu.SubMenu>
  //     :
  //     <Menu.Item key={i.id}>
  //       <Link to={i.path}>
  //         <Icon type={i.icon} />
  //         <span>{i.label}</span>
  //       </Link>
  //     </Menu.Item>))}
  // </Menu>
  render() {
    const { isMobile } = this.props;
    // const menuChild = getMenuChild(isMobile);

    return (
      <Menu
        theme={isMobile ? 'light' : 'dark'}
        mode="inline"
      // style={{ minHeight: 'calc(100vh - 64px)' }}
      // openKeys={this.state.openKeys}
      // selectedKeys={[activeMenuItem]}
      // onOpenChange={this.handleMenuOpenChange}
      >
        {menuItems.map(i => (
          i.sub ?
            <Menu.SubMenu
              key={i.id}
              title={<span><Icon type={i.icon} /><span>{i.label}</span></span>}
            >
              {i.sub.map(sub => (
                <Menu.Item key={sub.id}>
                  <Link to={sub.path} onClick={this.handleMenuClick}>
                    {sub.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
            :
            <Menu.Item key={i.id}>
              <Link to={i.path} onClick={this.handleMenuClick}>
                <Icon type={i.icon} />
                <span>{i.label}</span>
              </Link>
            </Menu.Item>))}
      </Menu>
    );
  }
}

export default MenusComponent; 
