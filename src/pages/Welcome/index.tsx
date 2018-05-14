import * as React from 'react';
import { Button } from 'antd';
import Author from './Author';

interface State {
  title: string;
  author: string;
}

class WelcomeComponent extends React.Component<{}, State> {

  state = {
    title: 'Welcome',
    author: 'Tome'
  };

  changeTitle = () => {
    this.setState({ title: 'Hello, Welcome!' });
  }

  changeAuthor = () => {
    this.setState({ author: 'John' });
  }

  render() {

    const { title, author } = this.state;
  
    return (
      <div>
        <h1>{title}</h1>
        <Author name={author} />
        <Button type="primary" onClick={this.changeTitle}>state change</Button>
        <br />
        <br />
        <Button type="primary" onClick={this.changeAuthor}>props change</Button>
      </div>
    );
  }

}

export default WelcomeComponent;
