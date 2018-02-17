import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const Header = () => (
  <Menu
    mode="horizontal"
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
