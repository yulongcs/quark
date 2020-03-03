import apiConfig from './api';
import pkg from '../package.json';

const nodeEnv = process.env.NODE_ENV || 'production';

// 获取以 REACT_APP_ 开头的环境变量
const getReactAppEnvs = () => {
  const builtConstants = {
    REACT_APP_NAME: pkg.name,
    REACT_APP_VERSION: pkg.version,
    ...apiConfig[nodeEnv],
  };
  const initEnvs = { ...builtConstants, ...process.env };
  const envs = {};
  Object.keys(initEnvs).forEach(key => {
    if (/^REACT_APP_/.test(key)) {
      envs[key] = JSON.stringify(initEnvs[key]);
    }
  });
  return envs;
};

export default getReactAppEnvs;
