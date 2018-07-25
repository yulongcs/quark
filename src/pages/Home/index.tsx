import * as React from 'react';
import Jumbotron from '../../components/Jumbotron';

class Home extends React.Component<{}, {}> {

  public toCharon = () => {
    location.href = 'https://github.com/vdfor/react-sail';
  }

  public render() {
    return (
      <Jumbotron
        title='react-sail is ready!'
        description='采用dark主题、侧边栏布局，定位于中后台管理应用。'
        buttonTitle='了解更多'
        onButtonClick={this.toCharon}
      />
    );
  }
}

export default Home;
