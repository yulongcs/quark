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
  },
  {
    id: '3', 
    name: '扩展', 
    path: '/extends',  
    icon: 'link',
    children: [
      { id: '3-1', name: '富文本编辑器', path: '/extends/rich-text-editor' },
      { id: '3-2', name: '代码编辑器', path: '/extends/code-editor' },
      { id: '3-3', name: '拖拽', path: '/extends/drag' }
    ]
  },
  {
    id: '4', 
    name: '自研', 
    path: '/self',  
    icon: 'rocket',
    children: [
      { id: '4-1', name: '巨幕', path: '/self/jumbotron' }
    ]
  }
];

export default menus;
