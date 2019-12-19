import { BuildEnvEnum } from '@vdfor/util';

export const getRestBaseUrl = () => {
  switch (process.env.REACT_APP_ENV) {
    case BuildEnvEnum.DEV:
      return 'http://127.0.0.1:3000/api/v0';
    case BuildEnvEnum.TEST:
      return 'https://mock.vdfor.top/v0';
    default:
      return 'https://mock.vdfor.top/v0';
  }
};
