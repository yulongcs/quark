import { Card, Col, Row } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { DraggableCore } from 'react-draggable';
import { IDragCardProps } from '../types';

const DragCard: React.SFC<IDragCardProps> = ({ data, onHandler }) => (
  <Row gutter={16}>
    {data.map(i => (
      <Col span={6} key={i.id} style={{ paddingTop: '8px', paddingBottom: '8px', transform: `translate(${i.translate.x}px, ${i.translate.y}px)` }}>
        <DraggableCore
          // onStart={onHandler('onStart', i.id)}
          onDrag={onHandler('onDrag', i.id)}
        >
          <Card hoverable={true}>{i.label}</Card>
        </DraggableCore>
      </Col>
    ))}
  </Row>
);

export default observer(DragCard);
