const menus = [
  { id: '1', name: 'Home', path: '/home', icon: 'home' },
  {
    id: '2', 
    name: '用户管理', 
    path: '/user',  
    icon: 'home',
    children: [
      { id: '2-1', name: '管理员用户', path: '/user/admin' }
    ]
  }
];

export default menus;
