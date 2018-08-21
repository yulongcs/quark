import { Card } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import { inject, observer } from 'mobx-react';
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

  public componentDidMount() {
    this.store.init();
  }

  public render() {
    const { handleRawChange, content } = this.store;

    const editorProps = {
      height: 500,
      contentFormat: 'raw' as any,
      placeholder: 'Hello world!',
      initialContent: content as any,
      // onChange: this.handleChange,
      onRawChange: handleRawChange
    };

    return (
      <Card bordered={false}>
        <BraftEditor {...editorProps} />
      </Card>
    );
  }
}

export default Container;
