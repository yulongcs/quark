import { request, RequestConfig } from 'umi';
import AbortController from 'abort-controller';
import { cancelHttpCode } from '@/constant';
import {
  setRequestTaskToGlobalData,
  removeRequestTaskFromGlobalData,
  handleRequestError,
} from '../request';

interface IRequestParams extends RequestConfig {
  showErrorNotification?: boolean;
  requestTaskName?: string;
}

const codeMessage = {
  // copy from https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.ts
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

export default (url: string, options: IRequestParams) =>
  new Promise((resolve, reject) => {
    const taskName = options.requestTaskName || url;
    const controller = new AbortController();
    const { signal } = controller;
    setRequestTaskToGlobalData(taskName, controller);
    const newOptions = {
      timeout: 10000,
      signal,
      ...options,
      headers: {
        // Authorization: `Bearer ${token || ''}`,
        ...options.headers,
      },
    };

    request(url, newOptions)
      .then(data => {
        removeRequestTaskFromGlobalData(taskName);
        resolve(data);
      })
      .catch(err => {
        removeRequestTaskFromGlobalData(taskName);
        const isCancelError = err.name === 'AbortError';
        const showErrorNotification = !!options.showErrorNotification && !isCancelError;
        const {
          response: { status = isCancelError ? cancelHttpCode : '', statusText = '' } = {},
          message = '未知错误',
        } = err;
        const errorText = (codeMessage as any)[status] || statusText || message;
        const error = new Error(errorText);
        (error as any).status = status;
        (error as any).url = url;
        handleRequestError({ error, showErrorNotification });
        reject(error);
      });
  });
