import MobileDetect from 'mobile-detect';

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
