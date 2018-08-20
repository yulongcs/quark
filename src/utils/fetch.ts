// import axios, { AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';
import { base, credentials } from './';

interface IRequestOptions {
  headers?: { [key: string]: string | any };
  params?: { [key: string]: string | any };
  data?: any;
  method?: string;
}

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise<any>}
 */
const request = async (url: string, options: IRequestOptions = {}): Promise<any> => {

  const { token } = credentials;

  const headerAuth = { Authorization: `Bearer ${token || ''}` };

  let fetchOptions = {
    method: 'GET',
    ...options
  };

  if (!options.headers) {
    options.headers = {};
  }
  (fetchOptions as any).headers = { ...options.headers, ...headerAuth };

  if (options.params) {
    const newUrl = (() => {
      const querys = options.params || {};
      const queryArr: string[] = [];
      Object.keys(querys).forEach(key => {
        queryArr.push(`${key}=${querys[key]}`);
      });
      return queryArr.join('&');
    })();
    url += '?' + newUrl;
    fetchOptions = _.omit(fetchOptions, 'params');
  }

  if (options.data) {
    (fetchOptions as any).body = options.data;
    fetchOptions = _.omit(fetchOptions, 'data');
  }

  try {
    const res = await fetch(base.baseUrl + url, fetchOptions);
    console.log(res);
    // const r = res.data;
    // return typeof r === 'object' ? r : { data: r };
  } catch (error) {
    console.log(error);
  }



  // return fetch(0, { ...newOptions, ...{ url } });
};

export default request;
