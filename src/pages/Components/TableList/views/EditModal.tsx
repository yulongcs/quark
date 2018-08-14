import { Button, Card, Col, Form, Input, Modal, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { constants } from '../../../../common';
// import { tools } from '../../../../../utils';
import { IEditModalProps } from '../types';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    sm: { span: 8 },
    xs: { span: 24 }
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 24 }
  },
};

interface IProps extends FormComponentProps, IEditModalProps {
}

@observer
class EditModal extends React.Component<IProps> {

  // public componentDidMount() {
  // }

  public render() {
    const { form, initData } = this.props;
    // debugger;
    const { getFieldDecorator } = form;

    // const addTabMenus = <Menu>
    //   {addMenus.map(i => (<Menu.Item key={i.id}><a onClick={addTab(i.id)}>{i.label}</a></Menu.Item>))}
    // </Menu>;

    return (
      <Modal
        visible={true}
        title={initData.id ? `编辑用户(${initData.name})` : '新建用户'}
        destroyOnClose={true}
        closable={false}
        maskClosable={false}
        keyboard={false}
        // width={800}
        // bodyStyle={{ maxHeight: '320px', overflow: 'auto' }}
        footer={[
          <Button key='cancel'>取消</Button>,
          <Button key='submit' type='primary'>保存</Button>,
        ]}
      >
        <Card title='基本信息' bordered={false}>
          <Form hideRequiredMark={false}>
            <Row gutter={16}>
              <Col sm={8}>
                <FormItem
                  {...formItemLayout}
                  label='编号'
                >
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入编号' }],
                    initialValue: initData.code
                  })(
                    <Input placeholder='请输入编号' />
                  )}
                </FormItem>
              </Col>
              <Col sm={8}>
                <FormItem
                  {...formItemLayout}
                  label='姓名'
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }],
                    initialValue: initData.name
                  })(
                    <Input placeholder='请输入姓名' />
                  )}
                </FormItem>
              </Col>
              <Col sm={8}>
                <FormItem
                  {...formItemLayout}
                  label='性别'
                >
                  {getFieldDecorator('customerName', {
                    rules: [{ required: true, message: '请选择性别' }],
                    initialValue: initData.sex
                  })(
                    <Select placeholder='请选择性别'>
                      {constants.SEXES.map(i => <Option key={i.value} value={i.value}>{i.label}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title='联系方式' bordered={false}>
          <Form>
            <Row gutter={16}>
              <Col sm={8}>
                <FormItem
                  label='网址'
                >
                  {getFieldDecorator('website', {
                    rules: [{ required: true, message: '请输入网址', }],
                    initialValue: initData.website
                  })(
                    <Input placeholder='请输入网址' />
                  )}
                  {/* {this.passwordObj.disabled ?
                <a className='ant-form-text' style={{ marginLeft: '8px' }} onClick={this.hanldeEditPasswd}>编辑密码</a>
                :
                <a className='ant-form-text' style={{ marginLeft: '8px' }} onClick={this.generatePasswd}>生成密码</a>} */}
                </FormItem>
              </Col>
              <Col sm={8}>
                <FormItem
                  label='手机'
                >
                  {getFieldDecorator('mobile', {
                    rules: [{ required: false, message: '请输入手机号码', }],
                    initialValue: initData.mobile
                  })(
                    <Input placeholder='请输入手机号码' />
                  )}
                </FormItem>
              </Col>
              <Col sm={8}>
                <FormItem
                  label='Email'
                >
                  {getFieldDecorator('email', {
                    rules: [{ required: false, message: '请输入Email', }],
                    initialValue: initData.email
                  })(
                    <Input placeholder='请输入Email' />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title='其他' bordered={false}>
          <Form>
            <Row>
              <Col sm={20}>
                <FormItem
                  colon={false}
                  label='IP地址'
                >
                  {getFieldDecorator('ipRules', {
                    rules: [{
                      required: true,
                      message: '余额告警号码不合法',
                      // validator: (value: string, cb: (e?: any) => void) => {
                      //   if (!rule) {
                      //     cb();
                      //     return;
                      //   }
                      //   if (!value) {
                      //     cb(false);
                      //     return;
                      //   }
                      //   const ipArr = value.split(',');
                      //   let isValid = true;
                      //   for (const i of ipArr) {
                      //     if (!check.validPhoneRegx.test(i)) {
                      //       isValid = false;
                      //     }
                      //   }
                      //   if (!isValid) {
                      //     cb(false);
                      //     return;
                      //   }
                      //   cb();
                      // }
                    }],
                    initialValue: initData.ipRules
                  })(
                    <Input.TextArea
                      placeholder='多个号码之间用英文","隔开'
                      autosize={{ minRows: 4, maxRows: 6 }}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form >
        </Card>
      </Modal>
    );
  }
}

export default Form.create()(EditModal);
