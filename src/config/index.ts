import { BUILD_VERSION } from '../constants';

export const enableMock = (): boolean => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  switch (process.env.REACT_APP_ENV) {
    case BUILD_VERSION.DEV:
      return false;
    case BUILD_VERSION.TEST:
      return false;
    case BUILD_VERSION.PROD:
      return false;
    default:
      throw new Error('invalid REACT_APP_ENV');
  }
};

export const getRestBaseUrl = (): string => {
  switch (process.env.REACT_APP_ENV) {
    case BUILD_VERSION.DEV:
      return 'http://192.168.31.2:8182';
    case BUILD_VERSION.TEST:
      return 'http://192.168.31.2:8183';
    case BUILD_VERSION.PROD:
      return 'http://192.168.31.2:8184';
    default:
      throw new Error('invalid REACT_APP_ENV');
  }
};
