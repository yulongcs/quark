import { createHashHistory as createHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './pages';
import './resources/styles/index.scss';
import * as serviceWorker from './serviceWorker';

const history = createHistory();

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

ReactDOM.render(
  <App history={history} />,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
