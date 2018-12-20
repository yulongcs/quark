// import { Layout } from 'antd';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { ThemeContext } from '../Context';
// import styles from './header.module.scss';

class Component extends React.Component<{}> {
  public static contextType = ThemeContext;
  public render() {
    console.log(this.context);
    return <div style={{color: this.context}}>123</div>;
  }

  // public static contextType = AppContext;

  // public componentDidMount() {
  //   // console.log(this.props.match);
  //   // this.context.route = '/link';
  //   // console.log(this.context);
  // }

  // public render() {
  //   console.log(this.context);
  //   return (
  //     <Layout.Header className={styles.box}>
  //       <div className={styles.logo} />
  //       <h1>{this.context.route}</h1>
  //       {/* <h1>{this.context}</h1> */}
  //       {/* <Menu
  //         theme='light'
  //         mode='horizontal'
  //         selectedKeys={[this.context.route]}
  //         style={{ lineHeight: '64px' }}
  //       >
  //         <Menu.Item key='/home'><Link to='/home'>Home</Link></Menu.Item>
  //         <Menu.Item key='/link'><Link to='/link'>Link</Link></Menu.Item>
  //         <Menu.Item key='/help'><Link to='/help'>Help</Link></Menu.Item>
  //       </Menu> */}
  //     </Layout.Header>
  //   );
  // }
}

export default Component;
