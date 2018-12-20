import { Card, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';

interface IProps extends FormComponentProps {
  test?: string;
}

class Component extends React.PureComponent<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title='基本设置'>
        <Form layout='vertical' hideRequiredMark={true}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='AppName'>
                {getFieldDecorator('appName', {
                  rules: [{ required: true, message: 'Please input app name' }],
                })(<Input placeholder='App Name' />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={6} md={12} sm={24}>
              <Form.Item label='Author'>
                {getFieldDecorator('author', {
                  rules: [{ required: true, message: 'Please input author' }],
                })(<Input placeholder='Author' />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={6} md={12} sm={24}>
              <Form.Item label='Version'>
                {getFieldDecorator('appVersion', {
                  rules: [{ required: true, message: 'Please input app version' }],
                })(<Input placeholder='App Version' />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Component);
