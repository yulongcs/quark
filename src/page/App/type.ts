import { IAppBasicProps } from '../../types';
import { IHomeReducer } from '../Home/type';
import { IListPageReducer } from '../List/type';

export interface IRootReducer {
  appBasicReducer: IAppBasicProps;
  homeReducer: IHomeReducer;
  listPageReducer: IListPageReducer;
}

// export interface ITabBarItemProps {
//   key: string;
//   path: string;
//   tarBarTitle: string;
//   icon: string;
//   selectedIcon: string;
//   title?: string;
//   component?: () => Promise<{ default: ComponentType<any> }>;
//   showTabBar?: boolean;
// }
