import pkg from '../package.json';

// 用于应用运行的环境变量
const APP_CONFIG = {
  development: {
    REACT_APP_API_BASE_URL: 'https://mock.vdfor.top/v0',
  },
  production: {
    REACT_APP_API_BASE_URL: 'https://mock.vdfor.top/v0',
  },
};

// 运行环境
const nodeEnv = process.env.NODE_ENV || 'production';

// 获取以 REACT_APP_ 开头的环境变量
const getReactAppEnvs = () => {
  const builtConstants = {
    REACT_APP_NAME: pkg.name,
    REACT_APP_VERSION: pkg.version,
    ...APP_CONFIG[nodeEnv],
  };
  const initEnvs = { ...builtConstants, ...process.env };
  const envs = {};
  Object.keys(initEnvs).forEach(key => {
    if (/^REACT_APP_/.test(key)) {
      envs[`process.env.${key}`] = initEnvs[key];
    }
  });
  return envs;
};

export default getReactAppEnvs;
