import React, { PropsWithChildren, memo } from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  Router,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loadable, TabBar } from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { IRootReducer } from './type';
import { setAppBasicStateAction } from '../../store';
import { IAppBasicStateProps } from '../../type';
import { Route } from '../../component';
import { history, goPage, pxToRem } from '../../util';
import { BREAK_POINT_768, ROUTE_WITH_NOT_TAB_BAR_HEIGHT, ROUTE_WITH_TAB_BAR_HEIGHT } from '../../constant';
import routes from './routes';

const TarBarView = styled(TabBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: ${pxToRem(100)};

  @media screen and (min-width: ${BREAK_POINT_768}) {
    width: ${BREAK_POINT_768};
    left: auto;
  }
`;

const RouterWrapper = memo(({ children }: PropsWithChildren<any>) => {
  const { basicState: { showTabBar } } = useSelector((state: IRootReducer) => state.appBasicReducer);
  return (
    <div style={{ height: showTabBar ? ROUTE_WITH_TAB_BAR_HEIGHT : ROUTE_WITH_NOT_TAB_BAR_HEIGHT, overflow: 'auto' }}>
      {children}
    </div>
  );
});

const TabBarComponent = memo(() => {
  const { basicState: { route, showTabBar } } = useSelector((state: IRootReducer) => state.appBasicReducer);
  const tabs = routes.filter((i) => i.showTabBar);
  return showTabBar ? (
    <TarBarView>
      {tabs.map((i) => (
        <TabBar.Item
          selected={route === i.path}
          onPress={() => goPage(i.path)}
          {...{
            ...i, title: i.tabBarTitle,
          }}
        />
      ))}
    </TarBarView>
  ) : null;
});

export default memo(() => {
  const dispatch = useDispatch();
  const setAppBasicState = (values: Partial<IAppBasicStateProps>) => {
    dispatch(setAppBasicStateAction(values));
  };
  const basicProps = {
    setAppBasicState,
  };
  return (
    <>
      <RouterWrapper>
        <Router history={history}>
          <Switch>
            <DefaultRoute exact path="/">
              <Redirect to={{ pathname: '/home' }} />
            </DefaultRoute>
            {routes.map((i) => <Route {...{ ...basicProps, ...i, component: Loadable({ component: i.component }) }} />)}
          </Switch>
        </Router>
      </RouterWrapper>
      <TabBarComponent />
    </>
  );
});
