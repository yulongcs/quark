import React, { lazy, ComponentType } from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  Router,
  Switch
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loadable, TabBar } from '@vdfor/react-component';
import { IRootReducer } from './type';
import { setAppBasicStateAction } from '../../store/action';
import { IAppBasicStateProps } from '../../types';
import { Route } from '../../components';
import { history, goPage, pxToRem } from '../../utils';
import routes from './routes';
import styles from './index.module.scss';

const getLoadableRoutePage = (component: () => Promise<{ default: ComponentType<any> }>) => Loadable(lazy(component));

const TabBarComponent = () => {
  const { basicState: { route, showTabBar } } = useSelector((state: IRootReducer) => state.appBasicReducer);
  const tabs = routes.filter(i => i.showTabBar);
  return showTabBar ? (
    <TabBar className={styles.tabBar} height={pxToRem(100)}>
      {tabs.map(i => (
        <TabBar.Item
          selected={route === i.path}
          onPress={() => goPage(i.path)}
          {...{
            ...i, title: i.tabBarTitle
          }}
        />
      ))}
    </TabBar>
  ) : null;
};

export default () => {
  const dispatch = useDispatch();
  const setAppBasicState = (values: Partial<IAppBasicStateProps>) => {
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
