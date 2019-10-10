import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './page/App';
import rootReducer from './page/App/reducer';
import { configStore } from './store';
import { indexDbInit } from './util';
import { StyledGlobal } from './component';
import * as serviceWorker from './serviceWorker';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

indexDbInit();

const store = configStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <>
      <StyledGlobal />
      <App />
    </>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

serviceWorker.unregister();
