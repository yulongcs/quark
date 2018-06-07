import { Form, Icon, Input } from 'antd';
import * as React from 'react';

const { Item: FormItem } = Form;

interface IProps {
  id: "username" | "password";
  value: string;
  validateError: boolean;
  validateTips: string;
  type?: string;
  icon: string;
  placeholder: string;
  handleInputChange: (id: "username" | "password") => (e: any) => void;
}

const FormInput: React.SFC<IProps> = (props) => {
  const { id, value, validateError, validateTips, icon, type, placeholder, handleInputChange } = props;
  return (
    <FormItem
      validateStatus={validateError ? 'error' : 'success'}
      help={validateError ? validateTips : ''}
    >
      <Input
        id={id}
        value={value}
        type={type || 'text'}
        onChange={handleInputChange(id)}
        prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder={placeholder}
      />
    </FormItem>
  )
}

export default FormInput;
