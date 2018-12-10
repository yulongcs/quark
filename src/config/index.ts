import { BUILD_VERSION } from '../constants';

export const getRestBaseUrl = (): string => {
  switch (process.env.REACT_APP_ENV) {
    case BUILD_VERSION.DEV:
      return 'http://192.168.31.2:8182';
    case BUILD_VERSION.TEST:
      return 'http://192.168.31.2:8183';
    case BUILD_VERSION.PROD:
      return 'http://192.168.31.2:8184';
    default:
      return '';
  }
};
