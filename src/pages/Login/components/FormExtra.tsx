import { Checkbox, Form } from 'antd';
import * as React from 'react';

const { Item: FormItem } = Form;

interface IProps {
  checked: boolean;
  handleInputChange: (id: "remember") => (e: any) => void;
}

const FormExtra: React.SFC<IProps> = (props) => {
  const { checked, handleInputChange } = props;
  return (
    <FormItem>
      <Checkbox
        checked={checked}
        onChange={handleInputChange('remember')}
      >
        Remember me
      </Checkbox>
      <a style={{ float: 'right' }}>Forgot password</a>
    </FormItem>
  )
}

export default FormExtra;
