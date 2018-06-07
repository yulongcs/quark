import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/index-charon';
import registerServiceWorker from './registerServiceWorker';
import history from './utils/history';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <App history={history} />
  </LocaleProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
