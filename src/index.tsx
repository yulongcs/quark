import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@vdfor/react-component';
import { StyledGlobal } from 'src/components';
import App from 'src/page/App';
import { configStore, appReducer } from 'src/store';
import { PRIMARY_COLOR } from 'src/constants';
import * as serviceWorker from './serviceWorker';

// 防止表单提交导致页面刷新的统一处理
document.addEventListener('submit', (e) => {
  e.preventDefault();
});

const store = configStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <>
      <StyledGlobal />
      <ConfigProvider baseFontSize={16} primaryColor={PRIMARY_COLOR}>
        <App />
      </ConfigProvider>
    </>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

serviceWorker.unregister();
