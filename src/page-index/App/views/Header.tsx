import { Layout, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../common';
import styles from './header.module.scss';

class Component extends React.PureComponent<{}> {
  public static contextType = AppContext;

  public componentDidMount() {
    // console.log(this.props.match);
    // this.context.route = '/link';
    // console.log(this.context);
  }

  public render() {
    return (
      <Layout.Header className={styles.box}>
        <div className={styles.logo} />
        <Menu
          theme="light"
          mode="horizontal"
          // eslint-disable-next-line
          selectedKeys={[this.context.route]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/home"><Link to="/home">Home</Link></Menu.Item>
          <Menu.Item key="/link"><Link to="/link">Link</Link></Menu.Item>
          <Menu.Item key="/help"><Link to="/help">Help</Link></Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default Component;
