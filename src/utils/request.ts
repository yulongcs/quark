import { notification } from 'antd';
import * as _ from 'lodash';
import { base, credentials } from '.';

interface IRequestOptions {
  headers?: { [key: string]: string | any };
  params?: { [key: string]: string | any };
  data?: any;
  method?: string;
}

interface IFetchOptions {
  headers?: { [key: string]: string | any };
  body?: any;
  method?: string;
}

const config = {
  timeout: 10000, // 指定请求超时的毫秒数(0 表示无超时时间)，如果请求花费了超过 `timeout` 的时间，请求将被中断
  retryTimes: 2, // 请求失败时再次自动重试次数
  retryInterval: 500 // 请求失败时再次自动重试间隔(ms)
};

const codeMessage = { // copy from https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.js
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

const request = async (retry: number, url: string, options: IFetchOptions = {}): Promise<any> => {

  try {
    let timer;
    const timeoutPromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        if (!1) { // 无作用 resolve ts定义不可 unused
          resolve({});
          return;
        }
        reject({ statusText: '请求超时' });
      }, config.timeout);
    });

    const fetchPromise = fetch(url, options);

    const res = await Promise.race([timeoutPromise, fetchPromise]) as Response;

    if (timer) { // 清除超时定时器
      clearTimeout(timer);
    }

    if (res.ok) {
      console.log(res);
      return res;
    }

    // 错误提示信息文本内容
    const errorText = res.statusText || codeMessage[res.status] || res.status;
    notification.error({
      message: `http请求错误 ${res.status}`,
      description: errorText
    });
    console.error(res);

    if (res.status === 401) { // 401未授权
      // appStore.setUnauthenticated();
    }

    return undefined;
  } catch (error) {
    retry += 1;

    if (retry > config.retryTimes) { // 异常自动重连
      notification.error({
        message: `http请求错误 ${error && error.status || ''}`,
        description: error && error.statusText || '网络异常'
      });
      console.error(error);
      return undefined;
    }

    setTimeout(() => {
      return request(retry, url, options);
    }, config.retryInterval);
  }

};

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {IRequestOptions} [options] The options we want to pass to "fetch"
 * @return {Promise<any>}
 */
export default (url: string, options: IRequestOptions = {}): Promise<any> => {
  let newUrl = base.baseUrl + url;
  let newOptions = { ...options };

  newOptions.headers = {
    Accept: 'application/json, text/plain, */*',
    Authorization: `Bearer ${credentials.token || ''}`,
    ...newOptions.headers
  };

  if (newOptions.params) {
    const urlQuery = (() => {
      const querys = newOptions.params || {};
      return Object.keys(querys).map(key => `${key}=${typeof querys[key] === 'string' || typeof querys[key] === 'number' ? querys[key] : ''}`).join('&');
    })();
    newUrl += '?' + urlQuery;
    newOptions = _.omit(newOptions, 'params');
  }

  if (newOptions.data) {
    (newOptions as any).body = newOptions.data;
    newOptions = _.omit(newOptions, 'data');
  }

  const fetchOptions = {
    method: 'GET',
    ...newOptions
  };

  return request(0, newUrl, fetchOptions);
};
