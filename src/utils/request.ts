import request, { RequestOptionsInit, RequestError, ResponseError } from 'umi-request';
import { notification } from 'antd';

interface IRequestParams extends RequestOptionsInit {
  showErrorNotification?: boolean;
}

const codeMessage = { // copy from https://github.com/ant-design/ant-design-pro/blob/master/src/utils/request.ts
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
  1001: '请求超时', // 自定义错误 - 请求超时
};

/**
 * 错误处理
 * error instanceof RequestError - 请求超时
 */
const errorHandler = ({ error, showErrorNotification = true }: {
  error: ResponseError<any>;
  showErrorNotification?: boolean;
}) => {
  if (showErrorNotification) {
    const {
      response: {
        status = error instanceof RequestError ? 1001 : 0, statusText = '未知错误', url = '',
      } = {},
      message = '',
    } = error;
    const errortext = message || (codeMessage as any)[status] || statusText;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errortext,
    });
  }
  throw error;
};

// request拦截器
request.interceptors.request.use((url, options: IRequestParams) => ({
  url,
  options: {
    timeout: 10000, // 写操作慎用
    errorHandler: (error) => errorHandler({
      error,
      showErrorNotification: options.showErrorNotification,
    }),
    ...options,
    headers: {
      // Authorization: `Bearer ${token || ''}`,
      ...options.headers,
    },
  },
}));

// // response拦截器
// request.interceptors.response.use((response) => {
//   const { status = 0, statusText = '未知错误', url = '' } = response;
//   console.log('response', response);
//   if (!(status >= 200 && status < 400)) {
//     const errortext = (codeMessage as any)[status] || statusText;
//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errortext,
//     });
//   }
//   return response;
// });

export default (url: string, options: IRequestParams) => request(url, options);
