import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { history, loadable } from './utils';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

console.log(React);

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route path='/404' component={loadable(() => import('./pages/NotFound'))} />
        <Route path='/' component={loadable(() => import('./App'))} />
      </Switch>
    </Router>
  </LocaleProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
