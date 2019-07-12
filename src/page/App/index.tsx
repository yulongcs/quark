import React from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  Router,
  Switch
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loadable, TabBar } from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { IRootReducer } from './type';
import { setAppBasicStateAction } from '../../store/action';
import { IAppBasicStateProps } from '../../types';
import { Route } from '../../components';
import { history, goPage, pxToRem } from '../../utils';
import { BREAK_POINT_768 } from '../../constants';
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

const TabBarComponent = () => {
  const { basicState: { route, showTabBar } } = useSelector((state: IRootReducer) => state.appBasicReducer);
  const tabs = routes.filter(i => i.showTabBar);
  return showTabBar ? (
    <TarBarView>
      {tabs.map(i => (
        <TabBar.Item
          selected={route === i.path}
          onPress={() => goPage(i.path)}
          {...{
            ...i, title: i.tabBarTitle
          }}
        />
      ))}
    </TarBarView>
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
          {routes.map(i => <Route {...{ ...basicProps, ...i, component: Loadable({ component: i.component }) }} />)}
        </Switch>
      </Router>
      <TabBarComponent />
    </>
  );
};
