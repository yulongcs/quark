import { Card } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppStore } from '../../../stores';
import Store from './Store';
import { DragCard, DragTag, TagPositionPrev } from './views';

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
    const { tagPosition, dragTagProps, dragCardProps } = this.store;

    return (
      <React.Fragment>
        <Card title='可拖拽标签' bordered={false} bodyStyle={{ minHeight: 200 }}>
          <DragTag {...dragTagProps} />
          <TagPositionPrev {...tagPosition} />
        </Card>
        <Card title='可拖拽卡片' bordered={false} style={{ marginTop: '16px' }}>
          <DragCard {...dragCardProps} />
        </Card>
      </React.Fragment>
    );
  }
}

export default Container;