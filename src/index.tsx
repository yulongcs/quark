import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './pages/App/index';
import rootStore from './stores/rootStore';
import registerServiceWorker from './registerServiceWorker';

const stores = { rootStore };

ReactDOM.render(
  <Provider {...stores}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
