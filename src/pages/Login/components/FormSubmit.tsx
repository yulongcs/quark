import { Button, Form } from 'antd';
import * as React from 'react';

const { Item: FormItem } = Form;

interface IProps {
  disabled: boolean;
}

const FormSubmit: React.SFC<IProps> = (props) => {
  const { disabled } = props;
  return (
    <FormItem>
      <Button
        disabled={disabled}
        type="primary"
        size="large"
        htmlType="submit"
        style={{ width: '100%' }}
      >
        Log in
      </Button>
    </FormItem>
  )
}

export default FormSubmit;
