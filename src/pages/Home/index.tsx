import * as React from 'react';
import AppContext from '../../App/Context';
import { Jumbotron } from '../../components';
import { fetchUser } from './api';

class Home extends React.PureComponent<{}> {
  public static contextType = AppContext;

  public setTheme = () => {
    this.context.action.setTheme('light');
  }

  public async componentDidMount() {
    if (!!1) {
      await fetchUser();
    }
  }

  public render() {
    return (
      <Jumbotron
        title='react-sail is ready!'
        description='采用dark主题、侧边栏布局，定位于中后台管理应用。'
        buttonTitle='更换主题'
        onButtonClick={this.setTheme}
      />
    );
  }
}

export default Home;
