import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

interface Props {
  defaultSelectedKey: string;
}

const Header = (props: Props) => (
  <Menu
    mode="horizontal"
    defaultSelectedKeys={[props.defaultSelectedKey]}
  >
    <Menu.Item key="home">
      <Link to="/home">Home</Link>
    </Menu.Item>
    <Menu.Item key="help">
      <Link to="/help">Help</Link>
    </Menu.Item>
  </Menu>
);

export default Header;
