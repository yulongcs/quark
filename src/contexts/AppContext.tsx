import { SiderTheme } from 'antd/lib/layout/Sider';
import * as React from 'react';
 
export interface IAppContextValue {
  theme: SiderTheme;
}

export const initValues: IAppContextValue = {
  theme: 'dark'
};

const AppContext = React.createContext(initValues);

export default AppContext;
