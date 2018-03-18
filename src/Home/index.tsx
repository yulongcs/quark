import * as React from 'react';
import { observer, inject } from 'mobx-react';
import HomeStore from '../stores/HomeStore';
import styles from './style.less';

interface Props {
  homeStore: HomeStore;
}

@inject('homeStore')
@observer
class HomeComponent extends React.Component<Props, {}> {

  componentDidMount(): void {
    this.props.homeStore.loadTitle();
  }

  render() {

    return (
      <p className={styles.title}>
        <h1 className={styles.span}>{this.props.homeStore.title}</h1>
      </p>
    );
  }

}

export default HomeComponent; 
