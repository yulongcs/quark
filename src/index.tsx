import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './page-index';
import './resources/styles/index.scss';
import * as serviceWorker from './serviceWorker';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
