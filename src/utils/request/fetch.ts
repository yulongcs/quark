import * as _ from 'lodash';
import { base } from '../';
import { codeMessage, config, getAuthCertHeaders, showErrorTip } from './common';
import { IFetchOptions, IRequestOptions } from './types';

const request = async (retry: number, url: string, options: IFetchOptions = {}): Promise<any> => {

  try {
    let timer;
    const timeoutPromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        if (!1) {
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
      window.postMessage('hello', '/');
      const r = res.json();
      return typeof r === 'object' ? r : { data: r };
    }

    // 错误提示信息文本内容
    const errorText = res.statusText || codeMessage[res.status] || res.status;
    showErrorTip(`http请求错误 ${res.status}`, errorText);
    console.error(res);

    if (res.status === 401) { // 401未授权
      // appStore.setUnauthenticated();
    }

    return undefined;
  } catch (error) {
    retry += 1;

    if (retry > config.retryTimes) { // 异常自动重连
      showErrorTip(`http请求错误 ${error && error.status || ''}`, error && error.statusText || '网络异常');
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
    ...getAuthCertHeaders(),
    ...newOptions.headers
  };

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

  return request(0, newUrl, fetchOptions);
};
