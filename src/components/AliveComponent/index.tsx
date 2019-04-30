import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import reducer from './reducer';
import AliveContext, { initialState } from './context';

export default ({ children }: RouteProps) => {
  const [state, initDispatch] = React.useReducer(reducer, initialState);
  const dispatch = (action: any) => {
    if (typeof action === 'function') {
      return action(initDispatch);
    }
    return initDispatch(action);
  };
  return (
    <AliveContext.Provider value={{ state, dispatch }}>
      {children}
    </AliveContext.Provider>
  );
};
