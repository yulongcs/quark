import React, { memo } from 'react';
import { Provider } from './store';
import { Main } from './views';

export default memo(() => (
  <Provider>
    <Main />
  </Provider>
));
