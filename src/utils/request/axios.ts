import axios, { AxiosRequestConfig } from 'axios';
import { base } from '../';
import { codeMessage, config, getAuthCertHeaders, showErrorTip } from './common';
import { IRequestOptions } from './types';


axios.defaults.baseURL = base.baseUrl;
axios.defaults.timeout = config.timeout;

const request = async (retry: number, options: AxiosRequestConfig = {}): Promise<any> => {

  try {
    const res = await axios(options);
    const r = res.data;
    return typeof r === 'object' ? r : { data: r };
  } catch (error) {
    retry += 1;

    if (retry > config.retryTimes) { // 超过重试次数不再重连
      const { status, statusText } = error && error.response || ({} as any);

      const errorText = statusText || codeMessage[status] || status; // 错误提示信息文本内容
      showErrorTip(`http请求错误 ${status}`, errorText);
      console.error(error);

      if (status === 401) { // 401未授权
        // appStore.setUnauthenticated();
      }
      return undefined;
    }

    setTimeout(() => {
      return request(retry, options);
    }, config.retryInterval);

  }
};

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {IRequestOptions} [options] The options we want to pass to "fetch"
 * @return {Promise<any>}
 */
export default async (url: string, options: IRequestOptions = {}): Promise<any> => {
  const newOptions = { ...options };
  newOptions.headers = { ...getAuthCertHeaders(), ...newOptions.headers };

  return request(0, { ...newOptions, ...{ url } });
};
