import { Button } from 'antd';
import * as React from 'react';
import styles from './style.module.less';

class HomeComponent extends React.Component<{}, {}> {

  toCharon = () => {
    location.href = '/index-charon.html';
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.jumbotron}>
          <h1>charon is ready!</h1>
          <p>charon，冥卫一。采用dark主题、侧边栏布局，定位于中后台管理应用。</p>
          <Button type="primary" onClick={this.toCharon}>了解更多</Button>
        </div>
      </div>
    )
  }
}

export default HomeComponent;
