import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VConsole from 'vconsole';
import App from './page/App';
import './resources/styles/index.scss';
import * as serviceWorker from './serviceWorker';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

if (process.env.REACT_APP_ENV !== 'prod') {
  // eslint-disable-next-line
  new VConsole();
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
