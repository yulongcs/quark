import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import fetchUser from './api';
import styles from './style.less';
import { states, actions } from './store/index';

interface User {
  id: string | number;
  name: string;
}

// const App: React.SFC<Props> = observer((props) 
@observer
class HomeComponent extends React.Component<{}, {}> {

  @observable user: User;

  queryUser = async () => {
    actions.home.changeTitle();
    this.user = await fetchUser.query();
  }

  render() {
    // console.log(states);
    // console.log(store.home.title);
    // console.log(actions);
    const name = this.user && this.user.name || 'no user';

    return (
      <div>
        <h1 className={styles.title}>{name}</h1>
        <h1 className={styles.title}>{states.home.title}</h1>
        <Button type="primary" onClick={this.queryUser}>获取user</Button>
      </div>
    );
  }

}

export default HomeComponent; 
