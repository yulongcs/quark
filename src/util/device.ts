// 是否为移动端设备
export const isMobileDevice = () => {
  const r = window.matchMedia('(max-width: 768px)');
  return r && r.matches;
};
