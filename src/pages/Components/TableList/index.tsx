import { Card } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../../stores';
import Store from './Store';
import { EditModal, Table } from './views';

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
    const { tableProps, editModalProps, editModalVisible } = this.store;
    return (
      <React.Fragment>
        <Card bordered={false}>
          <Table {...tableProps} />
        </Card>
        {editModalVisible && <EditModal {...editModalProps} />}
      </React.Fragment>
    );
  }
}

export default Container;
