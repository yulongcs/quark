import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
// import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { constants } from '../../../../common';
import { check } from '../../../../utils';
import { IEditModalProps } from '../types';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    sm: { span: 7 },
    xs: { span: 24 }
  },
  wrapperCol: {
    sm: { span: 17 },
    xs: { span: 24 }
  },
};

interface IProps extends FormComponentProps, IEditModalProps {
}

@observer
class EditModal extends React.Component<IProps> {

  public render() {
    const { form, initData, closeModal, visible } = this.props;
    // debugger;
    const { getFieldDecorator } = form;

    // const addTabMenus = <Menu>
    //   {addMenus.map(i => (<Menu.Item key={i.id}><a onClick={addTab(i.id)}>{i.label}</a></Menu.Item>))}
    // </Menu>;

    return (
      <Modal
        visible={visible}
        title={initData.id ? `编辑用户(${initData.name})` : '新建用户'}
        destroyOnClose={true}
        closable={false}
        maskClosable={false}
        keyboard={false}
        afterClose={closeModal}
        width={700}
        bodyStyle={{ maxHeight: 'calc(100vh - 310px)', overflow: 'auto' }}
        footer={[
          <Button key='cancel' onClick={closeModal}>取消</Button>,
          <Button key='submit' type='primary'>保存</Button>,
        ]}
      >
        <Card title='基本信息' bordered={false}>
          <Form hideRequiredMark={false}>
            <Row gutter={16}>
              <Col sm={12}>
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
              <Col sm={12}>
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
              <Col sm={12}>
                <FormItem
                  {...formItemLayout}
                  label='ARPU'
                >
                  {getFieldDecorator('arpu', {
                    rules: [
                      { required: true, pattern: check.nonnegativeIntegerRegx, message: 'ARPU不可为空且必须为正整数' },
                    ],
                    initialValue: initData.arpu
                  })(
                    <InputNumber style={{ width: 'calc(100% - 50px)' }} step={100} min={0} placeholder='请输入ARPU' />
                  )}
                  <span className='ant-form-text' style={{ marginLeft: '8px' }}>元/月</span>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title='联系方式' bordered={false}>
          <Form>
            <Row gutter={16}>
              <Col sm={12}>
                <FormItem
                  label='手机'
                  colon={false}
                >
                  {getFieldDecorator('mobile', {
                    rules: [{ required: true, pattern: check.validPhoneRegx, message: '请输入正确的11位手机号码', }],
                    initialValue: initData.mobile
                  })(
                    <Input addonBefore='+086' placeholder='请输入手机号码' />
                  )}
                </FormItem>
              </Col>
              <Col sm={12}>
                <FormItem
                  label='Email'
                  colon={false}
                >
                  {getFieldDecorator('email', {
                    rules: [{ required: true, type: 'email', message: '请输入正确的Email' }],
                    initialValue: initData.email
                  })(
                    <Input placeholder='请输入Email' />
                  )}
                </FormItem>
              </Col>
              <Col sm={24}>
                <FormItem
                  label='网址'
                  colon={false}
                >
                  {getFieldDecorator('website', {
                    rules: [{ required: false, type: 'url', message: '请输入正确的网址' }],
                    initialValue: initData.website
                  })(
                    <Input placeholder='请输入网址' />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title='其他' bordered={false}>
          <Form>
            <Row>
              <Col sm={24}>
                <FormItem
                  colon={false}
                  label='IP地址'
                >
                  {getFieldDecorator('ipRules', {
                    rules: [{
                      required: true,
                      message: 'IP规则不合法',
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
