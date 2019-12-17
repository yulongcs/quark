import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@vdfor/react-component';
import store from '@/store';

export default ({ children }: PropsWithChildren<any>) => (
  <Provider store={store}>
    <ConfigProvider baseFontSize={16}>
      {children}
    </ConfigProvider>
  </Provider>
);
