import * as React from 'react';
// import { observer } from 'mobx-react';
// import Store from './Store';
import styles from './style.css';

// @observer
class Home extends React.Component<{}, {}> {

  // store: any;

  constructor(props: {}) {
    super(props);
  }

  componentWillMount() {
    // this.store = Store.init();
  }

  componentDidMount(): void {
    // const { loadTitle } = this.store;
    // loadTitle();
  }

  render() {
    return (
      <p className={styles.title}>
        <span className={styles.span}>Home Page</span>
        {/* <span className={styles.span}>{title}</span> */}
      </p>
    );
  }

}

export default Home; 
