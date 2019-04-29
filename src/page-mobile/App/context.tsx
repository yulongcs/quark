import { createContext } from 'react';

const initialState = {
  aliveData: {}
};

const { Provider } = createContext(initialState as any);


export { Provider, initialState };
