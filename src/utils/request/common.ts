import { notification } from 'antd';
import { Toast } from 'antd-mobile';
import * as _ from 'lodash';
import { credentials, device } from '../';

export const config = {
  timeout: 10000, // 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 `timeout` 的时间，请求将被中断
  retryTimes: 2, // 请求失败时再次自动重试次数
  retryInterval: 500 // 请求失败时再次自动重试间隔(ms)
};

export const codeMessage = { // copy from https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.js
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 错误提示信息
export const showErrorTip = (errorTitle: string, errorText: string) => {
  if (device().mobile) { // 移动端
    Toast.fail(errorText, 2, null as any, false);
  } else { // PC端
    notification.error({
      message: errorTitle,
      description: errorText
    });
  }
};

export const getAuthCertHeaders = () => {
  const { token } = credentials;
  return { Authorization: `Bearer ${token || ''}` };
};
