import * as React from 'react';
import Jumbotron from '../../components/Jumbotron';

class Home extends React.Component<{}, {}> {

  public toCharon = () => {
    location.href = '/index-charon.html';
  }

  public render() {
    return (
      <div>
        <Jumbotron
          title='charon is ready!'
          description='charon，冥卫一。采用dark主题、侧边栏布局，定位于中后台管理应用。'
          buttonTitle='了解更多'
          onButtonClick={this.toCharon}
        />
      </div>
    );
  }
}

export default Home;
