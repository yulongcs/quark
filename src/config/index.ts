import { BuildEnvEnum } from '@vdfor/util';

export const getRestBaseUrl = () => {
  switch (process.env.REACT_APP_ENV) {
    case BuildEnvEnum.DEV:
      return 'http://i.vdfor.top:8285/api/v0';
    case BuildEnvEnum.TEST:
      return 'https://mock.vdfor.top/v0';
    default:
      return 'https://mock.vdfor.top/v0';
  }
};
