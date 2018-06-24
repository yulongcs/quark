export const menus = [
  {
    icon: 'home',
    id: '/home',
    label: '首页',
    path: '/home'
  },
  {
    icon: 'profile',
    id: 'account',
    label: '账户管理',
    path: '/account',
    sub: [
      { id: '/account/info', label: '账户资料', path: '/account/info' },
      { id: '/account/security', label: '账户安全', path: '/account/security' }
    ]
  }
];

export const getDefaultSelected = (str: string) => {
  const initStr = '/home';
  return str === '/' ? initStr : str;
};

export const getDefaultOpen = (s: string, menuArr: any[]) => {
  let str = '';
  const k = s.split('/')[1] || null;
  if (k) {
    try {
      menuArr.forEach(m => {
        if (m.id === k && m.sub) {
          str = m.id;
          throw new Error('exit-forEach');
        }
      });
    } catch (e) {
      if (e.message !== 'exit-forEach') {
        throw e;
      }
    }
  }
  return str;
};
