import * as _ from 'lodash';

enum ResponseBodyTypeEnum {
  DEFAULT = 'default', // JSON and text
  // TEXT = 'text',
  ARRAYBUFFER = 'arrayBuffer',
  BLOB = 'blob',
  FORMDATA = 'formData'
}

interface IBasicOptions {
  headers?: { [key: string]: string | any };
  method?: string;
  resBodyType?: ResponseBodyTypeEnum; // 定义返回数据的类型
}

interface IRequestOptions extends IBasicOptions {
  params?: { [key: string]: string | any };
  data?: any;
}

interface IFetchOptions extends IBasicOptions {
  body?: any;
}

const INVALID_RES_BODY_TYPE = 'invalid-response-body-type';

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

const fetchGo = async (retry: number, url: string, options: IFetchOptions = {}): Promise<any> => {

  try {
    let timer;
    const timeoutPromise = new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        if (!1) { // 无作用 resolve ts定义不可 unused
          resolve({});
          return;
        }
        reject({ status: 504, statusText: '请求超时' });
      }, config.timeout);
    });

    const fetchPromise = fetch(url, options);

    const res = await Promise.race([timeoutPromise, fetchPromise]) as Response;

    if (timer) { // 清除超时定时器
      clearTimeout(timer);
    }
    if (res.ok) {
      switch (options.resBodyType) {
        case ResponseBodyTypeEnum.DEFAULT:
          try {
            return res.json();
          } catch (error) {
            console.log('response-body type is text, not json. ', error);
            return res.text();
          }
        // case ResponseBodyTypeEnum.TEXT:
        //   return res.text();
        case ResponseBodyTypeEnum.BLOB:
          return res.blob();
        case ResponseBodyTypeEnum.ARRAYBUFFER:
          return res.arrayBuffer();
        case ResponseBodyTypeEnum.FORMDATA:
          return res.formData();
        default:
          throw new Error(INVALID_RES_BODY_TYPE);
      }
    }

    // error
    const errorText = res.statusText || codeMessage[res.status] || res.status;
    const error = new Error(errorText);
    (error as any).status = res.status;
    (error as any).response = res;

    throw error;

  } catch (error) {
    // console.log(error);
    if (error.message === INVALID_RES_BODY_TYPE) {
      throw error;
    }
    if (error.status === 404) { // 404 not found
      throw error;
    }
    if (error.status === 401) { // 401未授权
      // appStore.setUnauthenticated();
      // return;
    }

    retry += 1;

    if (retry > config.retryTimes) {
      throw error;
    }

    return new Promise(resolve => {
      setTimeout(() => { // 异常自动重连
        resolve(fetchGo(retry, url, options));
      }, config.retryInterval);
    });
  }

};

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {IRequestOptions} [options] The options we want to pass to "fetch"
 * @return {Promise<any>}
 */
export default (url: string, options: IRequestOptions = {}): Promise<any> => {
  let newUrl = url;
  let newOptions = {
    // ...{
    //   credentials: 'include'
    // },
    ...options
  };
  const token = 'test-token';

  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.data instanceof FormData)) { // newOptions.data is not FormData
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      };
      newOptions.data = JSON.stringify(newOptions.data);
    } else { // newOptions.data is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      };
    }
  }

  newOptions.headers = {
    Authorization: `Bearer ${token || ''}`,
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
    resBodyType: ResponseBodyTypeEnum.DEFAULT,
    ...newOptions
  };

  return fetchGo(0, newUrl, fetchOptions);
};
