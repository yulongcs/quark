import React from 'react';
import { Provider } from './store';
import { Main } from './views';

export default () => (
  <Provider>
    <Main />
  </Provider>
);
