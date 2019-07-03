import * as React from 'react';
import {
  Redirect,
  Router,
  Switch
} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { Loadable } from '@vdfor/react-component';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from './type';
import { setAppStateAction } from './action';
import { AliveComponent, Route } from '../../components';
import { history, goPage } from '../../utils';
import {
  tarBarHomeImg, tarBarHomeSelectedImg, tarBarListImg, tarBarListSelectedImg
} from '../../assets/images';
import styles from './index.module.scss';

const setIconComponent = (icon: string) => (
  <div className={styles.tabBarIcon} style={{ backgroundImage: `url(${icon})` }} />
);

const tabs = [
  {
    key: '/home', title: '首页', icon: setIconComponent(tarBarHomeImg), selectedIcon: setIconComponent(tarBarHomeSelectedImg)
  },
  {
    key: '/list', title: '列表', icon: setIconComponent(tarBarListImg), selectedIcon: setIconComponent(tarBarListSelectedImg)
  }
];

const HomePage = React.lazy(() => import('../Home'));
const ListPage = React.lazy(() => import('../List'));

const routes = [
  {
    path: '/home', showTabBar: true, component: Loadable(HomePage), title: '首页'
  },
  {
    path: '/list', showTabBar: true, component: Loadable(ListPage), title: '长列表'
  }
];

const TabBarComponent = () => {
  const { route } = useSelector((state: IRootReducer) => state.appReducer);
  const showTabBarRoute = routes.filter(i => (i.showTabBar && i.path === route));
  const isShowTabBar = showTabBarRoute.length > 0;
  return isShowTabBar ? (
    <div className={styles.tabBar}>
      <TabBar noRenderContent>
        {tabs.map(i => (
          <TabBar.Item selected={route === i.key} {...i} onPress={() => goPage(i.key)} />
        ))}
      </TabBar>
    </div>
  ) : null;
};

export default () => {
  const dispatch = useDispatch();
  const setRoute = (route: string) => {
    dispatch(setAppStateAction({ route }));
  };
  const basicProps = {
    setRoute,
    title: 'quark'
  };
  return (
    <AliveComponent>
      <Router history={history}>
        <Switch>
          <Route {...basicProps} exact path="/">
            <Redirect to={{ pathname: '/home' }} />
          </Route>
          {routes.map(i => <Route key={i.path} {...{ ...basicProps, ...i }} />)}
        </Switch>
      </Router>
      <TabBarComponent />
    </AliveComponent>
  );
};
