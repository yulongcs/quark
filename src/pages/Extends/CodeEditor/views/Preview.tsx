import { Card } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { tools } from '../../../../utils';
import { IPreviewProps } from '../types';

const Preview: React.SFC<IPreviewProps> = ({ code }) => (
  <Card bordered={false} style={{ marginTop: '16px' }}>
    <section dangerouslySetInnerHTML={{ __html: tools.escape(code) }} />
  </Card>
);

export default observer(Preview);
