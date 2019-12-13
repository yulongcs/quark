import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@vdfor/react-component';
import store from '@/store';
import { PRIMARY_COLOR } from '@/constants';

// // 防止表单提交导致页面刷新的统一处理
// document.addEventListener('submit', (e) => {
//   e.preventDefault();
// });

export default ({ children }: PropsWithChildren<any>) => (
  <Provider store={store}>
    <ConfigProvider baseFontSize={16} primaryColor={PRIMARY_COLOR}>
      {children}
    </ConfigProvider>
  </Provider>
);
