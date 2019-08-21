/**
 *  context-hoos-redux
 *  参考自 https://github.com/ymzuiku/react-hooks-redux
 * */

import React, {
  createContext, useContext, useReducer, PropsWithChildren
} from 'react';

interface ICreateStoreOptions {
  reducer: (state: any, action: any) => void;
  initialState?: any;
}

const initOptions = {
  initialState: {}
};

export default (options: ICreateStoreOptions) => {
  const { initialState, reducer } = { ...initOptions, ...options };

  const Context = createContext(initialState);

  const store = {
    selfState: initialState,
    useContext: () => useContext(Context),
    dispatch: undefined as any,
    getState: () => store.selfState,
    initialState,
    cleanup: () => {
      store.dispatch = undefined;
    }
  };

  const middlewareReducer = (lastState: any, action: any) => {
    const nextState = reducer(lastState, action);
    store.selfState = nextState;
    return nextState;
  };

  const Provider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(middlewareReducer, initialState);
    if (!store.dispatch) {
      store.dispatch = async (action: any) => {
        if (typeof action === 'function') {
          await action(dispatch, store.selfState);
        } else {
          dispatch(action);
        }
      };
    }
    return <Context.Provider value={state}>{children}</Context.Provider>;
  };

  return { Provider, store };
};
