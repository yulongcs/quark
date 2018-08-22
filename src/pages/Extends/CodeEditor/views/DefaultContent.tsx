import { Col, Row, Select } from 'antd';
import * as React from 'react';

const { Option } = Select;

class DefaultContent extends React.Component<{}> {
  public handleSelectChange = (value: string) => {
    console.log('select value：', value);
  }

  public render() {
    return (
      <Row gutter={12}>
        <Col span={8}>
          <span style={{ color: '#590fc3' }}>撒哈拉大沙漠</span>位于非洲，是世界上最大的沙漠。
        </Col>
        <Col span={6}>
          <Select defaultValue='lucy' style={{ width: 120 }} onChange={this.handleSelectChange}>
            <Option value='jack'>Jack</Option>
            <Option value='lucy'>Lucy</Option>
            <Option value='disabled' disabled={true}>Disabled</Option>
            <Option value='Yiminghe'>yiminghe</Option>
          </Select>
        </Col>
        <Col span={2}>
          <a href='https://baidu.com'>Hello</a>
        </Col>
      </Row>
    );
  }
}
export default DefaultContent;
