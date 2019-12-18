import { notification } from 'antd';

/**
 * 错误处理
 * 若需要判断是否为请求超时，参考 https://github.com/umijs/umi-request/issues/14
 * @params error ResponseError
 * @params showErrorNotification boolean 是否弹出错误通知
 */
const errorHandler = ({ error, showErrorNotification = true }: {
  error: any;
  showErrorNotification?: boolean;
}) => {
  const {
    status,
    url,
    message,
  } = error;
  console.error(`request error - statue:${status}, message:${message}, url:${url}`);
  if (showErrorNotification) {
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: message,
    });
  }
};

export default errorHandler;
