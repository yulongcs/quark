import { Card } from 'antd';
import { inject, observer } from 'mobx-react';
import * as  monaco from 'monaco-editor';
import * as React from 'react';
import { AppStore } from '../../../stores';
import Store from './Store';

interface IProps {
  app: AppStore;
}

@inject('app')
@observer
class Container extends React.Component<IProps> {
  public store: Store;

  constructor(props: IProps) {
    super(props);
    this.store = new Store(props.app);
  }

  public toCharon = () => {
    location.href = 'https://github.com/vdfor/react-sail';
  }

  public refIns = (e: any) => {
    monaco.editor.create(e, {
      // model: null,
      value: '<p>Hello, World!</p>',
      language: 'html',
      theme: 'vs-dark'
    });
  }

  public render() {

    return (
      <Card bordered={false}>
        <div style={{ width: '100%', height: 500, padding: '16px 0' }} ref={this.refIns} />
      </Card>
    );
  }
}

export default Container;
