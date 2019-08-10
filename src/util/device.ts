import MobileDetect from 'mobile-detect';

const getVersion = (label: string, agent: string) => { // 获取版本号
  const exp = new RegExp(`${label}/([^\\s\\_\\-]+)`);
  const info = agent.match(exp);
  if (info && info.length > 0) {
    return info[1];
  }
  return false;
};

export const md = new MobileDetect(window.navigator.userAgent);

export const getEnvOS = () => {
  const os = md.os();
  switch (os) {
    case 'AndroidOS':
      return `${os} ${md.version('Android')}`;
    default: {
      const version = md.version(os);
      return version ? `${os} ${version}` : os;
    }
  }
};

export const getEnv = () => {
  const userAgent = md.userAgent();
  return {
    nodeEnv: process.env.NODE_ENV,
    projectVersion: process.env.REACT_APP_VERSION || 'unknown',
    projectName: process.env.REACT_APP_NAME || 'unknown',
    device: md.mobile(),
    os: getEnvOS(),
    browser: `${userAgent} ${md.version(userAgent)}`
  };
};

export const isAlipay = () => getVersion('alipayclient', navigator.userAgent.toLowerCase());

export const isWeChat = () => getVersion('micromessenger', navigator.userAgent.toLowerCase());

// eslint-disable-next-line
export const isWeChatMiniProgram = () => isWeChat() && (/miniprogram/.test(navigator.userAgent.toLowerCase()) || (window as any).__wxjs_environment === 'miniprogram');
