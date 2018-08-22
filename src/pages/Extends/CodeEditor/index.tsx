import { Card } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../../stores';
import Store from './Store';
import { Header, MonacoEditor, Preview } from './views';

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

  public render() {
    const { headerProps, monacoEditorProps, previewProps, isEditing } = this.store;

    return (
      <React.Fragment>
        {
          isEditing &&
          <Card bordered={false}>
            <Header {...headerProps} />
            <MonacoEditor {...monacoEditorProps} />
          </Card>
        }
        <Preview {...previewProps} />
      </React.Fragment>
    );
  }
}

export default Container;
