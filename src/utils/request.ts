/**
 * reference to   https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.js
 */
import { notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { appStore } from '../stores';
import { base, credentials } from './';

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


/**
 * Requests a URL, returning a promise.
 * @param  {index} 重试次数
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {any}           An object containing either "data" or "err"
 */
const fetch = async (index: number, options: AxiosRequestConfig = {}): Promise<any> => {

  try {
    const res = await axios(options);
    const r = res.data;
    return r;
  } catch (error) {
    
    index += 1;

    if (index > 3) { // 超过3次不再重试连接
      const { status, statusText } = error && error.response || ({} as any);
      console.log(error.response);
      // 页面提示信息
      notification.error({
        description: statusText || codeMessage[status] || status,
        message: `http请求错误 ${status} ${options.url}`
      });

      console.error(error);

      if (status === 401) { // 401未授权
        appStore.setUnauthenticated();
      }
      return undefined;
      // throw error;
    }

    setTimeout(() => {
      return fetch(index, options);
    }, 500);

  }
};

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {any}           An object containing either "data" or "err"
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
