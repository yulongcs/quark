// import axios, { AxiosRequestConfig } from 'axios';
import { notification } from 'antd';
import { Toast } from 'antd-mobile';
import * as _ from 'lodash';
// import { appStore } from '../stores';
import { base, credentials, device } from './';

interface IRequestOptions {
  headers?: { [key: string]: string | any };
  params?: { [key: string]: string | any };
  data?: any;
  method?: string;
}

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

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise<any>}
 */
const request = async (url: string, options: IRequestOptions = {}): Promise<any> => {

  const { token } = credentials;

  let newUrl = base.baseUrl + url;
  let newOptions = _.cloneDeep(options);

  const headerAuth = { authorization: `Bearer ${token || ''}` };

  if (!newOptions.headers) {
    newOptions.headers = {};
  }
  newOptions.headers = new Headers({ ...newOptions.headers, ...headerAuth });

  if (newOptions.params) {
    const urlQuery = (() => {
      const querys = newOptions.params || {};
      const queryArr: string[] = [];
      Object.keys(querys).forEach(key => {
        queryArr.push(`${key}=${querys[key]}`);
      });
      return queryArr.join('&');
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

  try {
    let timer;
    const timeoutPromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        if (!1) {
          resolve({});
          return;
        }
        reject('request timeout');
      }, 10000);
    });
    const fetchPromise = fetch(newUrl, fetchOptions);

    const res = await Promise.race([timeoutPromise, fetchPromise]) as Response;

    if (timer) { // 清除超时定时器
      clearTimeout(timer);
    }

    if (res.ok) {
      const r = res.json();
      return typeof r === 'object' ? r : { data: r };
    }

    // 错误提示信息文本内容
    const errorText = res.statusText || codeMessage[res.status] || res.status;
    // 页面提示信息
    if (device().mobile) { // 移动端
      Toast.fail(errorText, 2, null as any, false);
    } else { // PC端
      notification.error({
        description: errorText,
        message: `http请求错误 ${res.status}`
      });
    }

    if (res.status === 401) { // 401未授权
      // appStore.setUnauthenticated();
    }

    console.error(res);
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }



  // return fetch(0, { ...newOptions, ...{ url } });
};

export default request;
