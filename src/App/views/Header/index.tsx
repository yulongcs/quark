import { Icon, Layout } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
// import { storage } from '../../../utils';
import { IHeaderProps } from '../../types';
import styles from './index.module.less';

interface IProps extends IHeaderProps {
  style?: React.CSSProperties;
}

const Header = observer(({ style, openResetPasswordModal, logout, menuCollapsed, toggleMenuCollapsed }: IProps) => {
  return (
    <Layout.Header className={styles.header} style={style || {}}>
      <Icon
        className={styles.icon}
        type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleMenuCollapsed}
      />
      <div className={styles.welcome}>欢迎 Admin</div>
      <div className={styles.right}>
        <div className={styles.item} onClick={openResetPasswordModal}>
          <Icon type='lock' style={{ paddingRight: '8px' }} />
          修改密码
        </div>
        <div onClick={logout} className={styles.item}>
          <Icon type='logout' style={{ paddingRight: '8px' }} />
          退出系统
        </div>
        {/* <Dropdown overlay={
          <Menu>
            <Menu.Item key={3} onClick={logout}>退出登录</Menu.Item>
          </Menu>
        }>
          <a className={styles.item}>
            <Avatar style={{ background: '#f56a00' }}>
              {loggedInUser && loggedInUser.username ? loggedInUser.username.substring(0, 1).toUpperCase() : 'T'}
            </Avatar>
            <span style={{ paddingLeft: '5px' }}>{loggedInUser && loggedInUser.username || 'Test'}</span>
          </a>
        </Dropdown> */}
      </div>
    </Layout.Header>
  );
});

export default Header; 
