import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import fetchUser from './api';
import styles from './style.less';

interface User {
  id: string | number;
  name: string;
}

@observer
class HomeComponent extends React.Component<{}, {}> {

  @observable user: User;

  queryUser = async () => {
    this.user = await fetchUser.query();
  }

  render() {
    const name = this.user && this.user.name || 'no user';

    return (
      <div>
        <h1 className={styles.title}>{name}</h1>
        <Button type="primary" onClick={this.queryUser}>获取user</Button>
      </div>
    );
  }

}

export default HomeComponent; 
