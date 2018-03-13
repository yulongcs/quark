import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

interface Props {
  // defaultSelectedKey: string;
}

const Header = (props: Props) => {
  // console.log(props.defaultSelectedKey);
  // defaultSelectedKeys
  const currentPage = (!process.env.PUBLIC_URL && !location.pathname) ? 'home' :
    (location.pathname.replace(new RegExp(`${process.env.PUBLIC_URL}`, 'g'), '').replace(/\//g, '') || 'home');

  return currentPage !== 'welcome' ? (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[currentPage]}
    >
      <Menu.Item key="home">
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="help">
        <Link to="/help">Help</Link>
      </Menu.Item>
    </Menu>
  ) : null;
};

export default Header;
