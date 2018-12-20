import * as React from 'react';

export const APP_CONTEXT_INIT_VALUES = {
  route: '/'
};

const AppContext = React.createContext(APP_CONTEXT_INIT_VALUES);

export default AppContext;
