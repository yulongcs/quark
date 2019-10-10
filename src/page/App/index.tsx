import React from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  Router,
  Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loadable } from '@vdfor/react-component';
import { setAppBasicStateAction } from '../../store';
import { IAppBasicStateProps } from '../../type';
import { Route } from '../../component';
import { history } from '../../util';
import routes from './routes';

export default () => {
  const dispatch = useDispatch();
  const setAppBasicState = (values: Partial<IAppBasicStateProps>) => {
    dispatch(setAppBasicStateAction(values));
  };
  const basicProps = {
    setAppBasicState
  };
  return (
    <Router history={history}>
      <Switch>
        <DefaultRoute exact path="/">
          <Redirect to={{ pathname: '/home' }} />
        </DefaultRoute>
        {routes.map(i => <Route {...{ ...basicProps, ...i, component: Loadable({ component: i.component }) }} />)}
      </Switch>
    </Router>
  );
};
