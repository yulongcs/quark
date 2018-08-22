import { Card, Col, Row } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { DraggableCore } from 'react-draggable';
import { IDragCardProps } from '../types';

const DragCard: React.SFC<IDragCardProps> = ({ data, onHandler }) => (
  <Row gutter={16}>
    {data.map(i => (
      <Col span={6} key={i.id} style={{ paddingTop: '8px', paddingBottom: '8px' }}>
        <DraggableCore
          onStart={onHandler('onDragStart')}
        >
          <Card hoverable={true}>{i.label}</Card>
        </DraggableCore>
      </Col>
    ))}
  </Row>
);

export default observer(DragCard);
