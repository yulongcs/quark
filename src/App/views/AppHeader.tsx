import { Avatar, Dropdown, Icon, Layout, Menu } from 'antd';
import * as React from 'react';
import { credentials } from '../../utils';
import styles from './app-header.module.less';

interface IProps {
  collapsed: boolean;
  toggle: () => void;
  logout: () => void;
}

const AppHeader: React.SFC<IProps> = ({ collapsed, toggle, logout }) => {

  const { user: loggedInUser } = credentials;

  return (
    <Layout.Header className={styles.header}>
      <Icon
        className={styles.icon}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />
      <div className={styles.right}>
        {/* <a className={styles.item} target="_blank" href="https://github.com/vdfor/react-sail"><Icon type={'github'} /></a> */}
        <Dropdown overlay={
          <Menu>
            {/* <Menu.Item key={2}>个人中心</Menu.Item>
            <Menu.Divider /> */}
            <Menu.Item key={3} onClick={logout}>退出登录</Menu.Item>
          </Menu>
        }>
          <a className={styles.item}>
            <Avatar style={{ background: '#f56a00' }}>
              {loggedInUser && loggedInUser.username ? loggedInUser.username.substring(0, 1).toUpperCase() : 'T'}
            </Avatar>
            <span style={{ paddingLeft: '5px' }}>{loggedInUser && loggedInUser.username || 'Test'}</span>
          </a>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default AppHeader; 
