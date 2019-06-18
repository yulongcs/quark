import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VConsole from 'vconsole';
import { Provider } from 'react-redux';
import App from './page/App';
import rootReducer from './page/App/reducer';
import configStore from './store';
import './resources/styles/index.scss';
import * as serviceWorker from './serviceWorker';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

if (process.env.NODE_ENV === 'development') {
  const vconsole = new VConsole();
  console.log(`vconsole init, version is ${vconsole.version}.`);
}

const store = configStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
