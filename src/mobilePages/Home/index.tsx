import { Button } from 'antd-mobile';
import * as React from 'react';
import { fetchUser } from './api';

class Home extends React.Component<{}> {

  public toCharon = () => {
    location.href = 'https://github.com/vdfor/react-sail';
  }

  public async componentDidMount() {
    if (!1) {
      await fetchUser();
    }
  }

  public render() {
    return (
     <Button type='primary'>按钮</Button>
    );
  }
}

export default Home;
