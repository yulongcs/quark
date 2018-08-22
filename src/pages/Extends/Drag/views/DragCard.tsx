import { Card } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import Draggable from 'react-draggable';
import { IDragCardProps } from '../types';

const DragCard: React.SFC<IDragCardProps> = ({ data }) => (
  <Card bordered={false} style={{ marginTop: '16px' }}>
    {data.map(i => (
      <Draggable
        key={i.id}
        defaultPosition={{ x: 0, y: 0 }}
      >
        <Card>{i.label}</Card>
      </Draggable>
    ))}
  </Card>
);

export default observer(DragCard);
