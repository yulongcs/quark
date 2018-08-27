import { Tag } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import Draggable from 'react-draggable';
import { IDragTagProps } from '../types';

const DragTag: React.SFC<IDragTagProps> = ({ handleDrag }) => (
  <div style={{ minHeight: '200px' }}>
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      onDrag={handleDrag}
    >
      <Tag color='#108ee9'>标签</Tag>
    </Draggable>
  </div>
);

export default observer(DragTag);
