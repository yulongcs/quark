import * as React from 'react';
import { Jumbotron } from '../../../components';

class Container extends React.Component<{}> {

  public toCharon = () => {
    location.href = 'https://github.com/vdfor/react-sail';
  }

  public render() {
    return (
      <Jumbotron
        title='react-sail is ready!'
        description='react的种子工程, 采用typescript编写。基于 create-react-app-typescript 生成的应用而深度定制。'
        buttonTitle='了解更多'
        onButtonClick={this.toCharon}
      />
    );
  }
}

export default Container;
