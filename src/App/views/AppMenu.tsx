import { Icon, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getDefaultOpen, getDefaultSelected, menus } from '../helper';

const AppMenu = () => {

  const hash = location.hash.replace(/\#/g, '');
  const selectedKey = getDefaultSelected(hash);
  const openKey = getDefaultOpen(selectedKey, menus);

  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={[selectedKey]} defaultOpenKeys={[openKey]}>
      {menus.map(i => (
        i.sub ?
          <Menu.SubMenu
            key={i.id}
            title={<span><Icon type={i.icon} /><span>{i.label}</span></span>}
          >
            {i.sub.map(sub => (
              <Menu.Item key={sub.id}>
                <Link to={sub.path}>
                  {sub.label}
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          :
          <Menu.Item key={i.id}>
            <Link to={i.path}>
              <Icon type={i.icon} />
              <span>{i.label}</span>
            </Link>
          </Menu.Item>))}
    </Menu>
  );
};

export default AppMenu; 
