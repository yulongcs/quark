import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { HomeStore } from '../stores/HomeStore';
// import { RootStore } from '../stores/RootStore';
import styles from './style.less';

interface Props {
  homeStore: HomeStore;
  // rootStore: RootStore;
}

// @inject('rootStore')
@inject('homeStore')
@observer
class HomeComponent extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    // console.log(props);
    // console.log(props.rootStore.history);
    // if (props.rootStore.history === 'login') {
    //   console.log(1111);
    // }
  }

  async componentDidMount() {
    // console.log(this.props);
    await this.props.homeStore.loadTitle();
    // this.props.rootStore.setAuthed(true);
  }

  // componentDidUpdate() {
  //   // console.log(this.props.rootStore.history);
  //   if (this.props.rootStore.history === 'login') {
  //     this.props.history.push('/login');
  //   }
  // }

  render() {
    // console.log(this.props.rootStore.history);

    return (
      <div>
        <h1 className={styles.title}>{this.props.homeStore.title}</h1>
        {/* <p>{this.props.rootStore.history}</p> */}
      </div>
    );
  }

}

export default HomeComponent; 
