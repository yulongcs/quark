import { SiderTheme } from 'antd/lib/layout/Sider';
import * as React from 'react';

export interface IAppContextState {
  theme: SiderTheme;
}

export interface IAppContextAction {
  setTheme: (theme: SiderTheme) => void;
}

export interface IAppContext {
  state: IAppContextState;
  action: IAppContextAction;
}

export const initAppContextValue: IAppContext = {
  state: {
    theme: 'dark'
  },
  action: {
    setTheme: (theme: SiderTheme) => {
      console.log(theme);
    }
  }
};

const Context: React.Context<IAppContext> = React.createContext(initAppContextValue);

export default Context;
