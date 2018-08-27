import { Col, Divider, Row } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ITagPositionProps } from '../types';

const TagPositionPrev: React.SFC<ITagPositionProps> = ({ clientX, clientY, layerX, layerY, deltaX, deltaY }) => (
  <Row gutter={32}>
    <Col span={8}>
      <span>相对幕布坐标</span>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>X：{layerX}</Col>
        <Col span={12}>Y：{layerY}</Col>
      </Row>
    </Col>
    <Col span={8}>
      <span>浏览器页面坐标</span>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>X：{clientX}</Col>
        <Col span={12}>Y：{clientY}</Col>
      </Row>
    </Col>
    <Col span={8}>
      <span>相对上次坐标移动</span>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>X：{deltaX}</Col>
        <Col span={12}>Y：{deltaY}</Col>
      </Row>
    </Col>
  </Row>
);

export default observer(TagPositionPrev);
