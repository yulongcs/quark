/**
 * reference to   https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.js
 */
import { notification } from 'antd';
import { Toast } from 'antd-mobile';
import axios, { AxiosRequestConfig } from 'axios';
import { appStore } from '../stores';
import { base, credentials, device } from './';

const codeMessage = {
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

axios.defaults.baseURL = base.baseUrl;

const fetch = async (index: number, options: AxiosRequestConfig = {}): Promise<any> => {

  try {
    const res = await axios(options);
    const r = res.data;
    return typeof r === 'object' ? r : { data: r };
  } catch (error) {

    index += 1;

    if (index > 3) { // 超过3次不再重试连接
      const { status, statusText } = error && error.response || ({} as any);

      const errorText = statusText || codeMessage[status] || status; // 错误提示信息文本内容

      // 页面提示信息
      if (device().mobile) { // 移动端
        Toast.fail(errorText, 2, null as any, false);
      } else { // PC端
        notification.error({
          description: errorText,
          message: `http请求错误 ${status} ${options.url}`
        });
      }

      console.error(error);

      if (status === 401) { // 401未授权
        appStore.setUnauthenticated();
      }
      return undefined;
      // throw error;
    }

    return setTimeout(() => {
      fetch(index, options);
    }, 500);

  }
};

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise<any>}
 */
const request = async (url: string, options: AxiosRequestConfig = {}): Promise<any> => {

  const { token } = credentials;

  const newOptions = {
    headers: { Authorization: `Bearer ${token || ''}` },
    ...options
  };

  return fetch(0, { ...newOptions, ...{ url } });
};

export default request;
