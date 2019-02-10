/**
 * 获取设备信息
 * 参考自layui的底层方法layui.device https://github.com/sentsin/layui/blob/master/src/layui.js
 */

interface IDevice {
  os: 'windows' | 'ios' | 'linux' | 'mac' | 'unknown';
  ie: string | false;
  chrome: string | false;
  wechat: string | false;
  ios: boolean;
  android: boolean;
  mobile: boolean;
}

const getVersion = (label: string, agent: string) => { // 获取版本号
  const exp = new RegExp(`${label}/([^\\s\\_\\-]+)`);
  const info = agent.match(exp);
  if (info && info.length > 0) {
    return info[1];
  }
  return false;
};

const getOs = (agent: string) => { // 获取底层操作系统
  if (/windows/.test(agent)) {
    return 'windows';
  } if (/iphone|ipod|ipad|ios/.test(agent)) {
    return 'ios';
  } if (/linux/.test(agent)) { // android底层操作系统为linux
    return 'linux';
  } if (/mac/.test(agent)) {
    return 'mac';
  }
  return 'unknown';
};

// 获取ie版本(ie11并没有msie的标识)
const getIeVersion = (agent: string) => ((!!(window as any).ActiveXObject || 'ActiveXObject' in window) ? ((agent.match(/msie\s(\d+)/) || [])[1] || '11') : false);

/**
 * 返回设备信息
 *
 * @return {IDevice}
 */
const device = () => {
  // 获取agent
  const agent = navigator.userAgent.toLowerCase();

  // 返回结果集
  const result: IDevice = {
    os: getOs(agent),
    ie: getIeVersion(agent),
    chrome: getVersion('chrome', agent),
    wechat: getVersion('micromessenger', agent),
    android: /android/.test(agent),
    ios: false,
    mobile: false
  };

  result.ios = result.os === 'ios';
  result.mobile = result.ios || result.android;

  return result;
};

export default device;
