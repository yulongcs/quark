import React from 'react';
import { Provider } from './store';
import Child from './Child';

export default () => (
  <Provider>
    <Child />
  </Provider>
);
