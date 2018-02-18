import * as React from 'react';
import { observer } from 'mobx-react';
import store from './Store';
import styles from './style.less';

@observer
class Home extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  componentDidMount(): void {
    const { loadTitle } = store;
    loadTitle();
  }

  render() {
    const { title } = store;

    return (
      <div className={styles.title}>{title}</div>
    );
  }

}

export default Home;
