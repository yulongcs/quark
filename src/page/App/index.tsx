import React, { lazy, ComponentType } from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  Router,
  Switch
} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { useDispatch, useSelector } from 'react-redux';
import { Loadable } from '@vdfor/react-component';
import { IRootReducer } from './type';
import { setAppBasicStateAction } from '../../store/action';
import { IAppBasicReducer } from '../../types';
import { Route } from '../../components';
import { history, goPage, pxToRem } from '../../utils';
import routes from './routes';
import styles from './index.module.scss';

const setTabBarIconComponent = (icon: string) => (
  <div style={{ width: pxToRem(44), height: pxToRem(44), background: `transparent url(${icon}) center / contain no-repeat` }} />
);

const getLoadableRoutePage = (component: () => Promise<{ default: ComponentType<any> }>) => Loadable(lazy(component));

const TabBarComponent = () => {
  const { route, showTabBar } = useSelector((state: IRootReducer) => state.appBasicReducer);
  const tabs = routes.filter(i => i.showTabBar);
  return showTabBar ? (
    <div className={styles.tabBar}>
      <TabBar noRenderContent>
        {tabs.map(i => (
          <TabBar.Item
            selected={route === i.path}
            onPress={() => goPage(i.path)}
            {...{
              ...i, icon: setTabBarIconComponent(i.icon), selectedIcon: setTabBarIconComponent(i.selectedIcon), title: i.tabBarTitle
            }}
          />
        ))}
      </TabBar>
    </div>
  ) : null;
};

export default () => {
  const dispatch = useDispatch();
  const setAppBasicState = (values: Partial<IAppBasicReducer>) => {
    dispatch(setAppBasicStateAction(values));
  };
  const basicProps = {
    setAppBasicState
  };
  return (
    <>
      <Router history={history}>
        <Switch>
          <DefaultRoute exact path="/">
            <Redirect to={{ pathname: '/home' }} />
          </DefaultRoute>
          {routes.map(i => <Route {...{ ...basicProps, ...i, component: getLoadableRoutePage(i.component) }} />)}
        </Switch>
      </Router>
      <TabBarComponent />
    </>
  );
};
