import { Col, Form, Icon, Input, Row } from 'antd';
import * as React from 'react';
import CaptchaButton from './CaptchaButton';

const { Item: FormItem } = Form;

interface IProps {
  id: string;
  value: string;
  validateError: boolean;
  validateTips: string;
  type?: string;
  isCaptcha?: boolean;
  captchaUrl?: string;
  refreshCaptchaUrl?: () => void;
  icon: string;
  placeholder: string;
  handleInputChange: (id: string) => (e: any) => void;
}

const FormInput: React.SFC<IProps> = (props) => {
  const { id, value, validateError, validateTips, isCaptcha, captchaUrl, refreshCaptchaUrl, icon, type, placeholder, handleInputChange } = props;
  const InputCore = (
    <Input
      id={id}
      size='large'
      value={value}
      type={type || 'text'}
      onChange={handleInputChange(id)}
      prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
      placeholder={placeholder}
    />
  );

  return (
    <FormItem
      validateStatus={validateError ? 'error' : 'success'}
      help={validateError ? validateTips : ''}
    >
      {!isCaptcha ?
        InputCore :
        <Row gutter={8}>
          <Col span={13}>
            {InputCore}
          </Col>
          <Col span={11}>
            {captchaUrl ?
              <a onClick={refreshCaptchaUrl}><img src={captchaUrl} /></a> :
              <CaptchaButton />}
          </Col>
        </Row>
      }
    </FormItem>
  );
};

export default FormInput;
