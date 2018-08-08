const menus = [
  { id: '1', name: 'Home', path: '/home', icon: 'home' },
  {
    id: '2', 
    name: '组件', 
    path: '/components',  
    icon: 'compass',
    children: [
      { id: '2-1', name: '表格列表', path: '/components/table-list' }
    ]
  }
];

export default menus;
