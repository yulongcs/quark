import { Button } from 'antd';
import * as React from 'react';

interface IState {
  disabled: boolean;
  text: string;
}

class CaptchaButton extends React.Component<{}, IState> {

  public state = {
    disabled: false,
    text: '获取验证码'
  };

  public captchaInterval: any;

  public refresh = () => {
    if (this.captchaInterval) {
      clearInterval(this.captchaInterval);
    }
    let i = 30;
    this.setState({ disabled: true });
    this.captchaInterval = setInterval(() => {
      this.setState({ text: `${i}秒后重新获取` });
      i--;
      if (i < 0) {
        clearInterval(this.captchaInterval);
        this.setState({ text: '重新获取验证码', disabled: false });
      }
    }, 1000);
  }

  public componentWillUnmount() {
    if (this.captchaInterval) {
      clearInterval(this.captchaInterval);
    }
  }

  public render() {
    const { disabled, text } = this.state;

    return (
      <Button disabled={disabled} onClick={this.refresh}>{text}</Button>
    );
  }
}

export default CaptchaButton;
