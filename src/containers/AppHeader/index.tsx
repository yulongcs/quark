import { Icon, Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../stores';
import styles from './index.module.less';
import Store from './Store';

interface IProps {
  app?: AppStore;
}

@inject('app')
@observer
class Header extends React.Component<IProps> {

  public store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app as AppStore);

    // window.addEventListener('message', (e) => {
    //   console.log(e);
    // }, false);
  }

  public render() {

    const { logout, app: { customerStore: { menuCollapsed, toggleMenuCollapsed, openResetPasswordModal } } } = this.store;

    return (
      <Layout.Header className={styles.header}>
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
  }
}

export default Header; 
