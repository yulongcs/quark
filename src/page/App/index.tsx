import React, { memo } from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  Router,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loadable } from '@vdfor/react-component';
import { setAppMetaStateAction, IAppMetaState } from 'src/store';
import { Route } from 'src/components';
import { history } from 'src/utils';
import routes from './routes';

export default memo(() => {
  const dispatch = useDispatch();
  const setAppMetaState = (values: Partial<IAppMetaState>) => {
    dispatch(setAppMetaStateAction(values));
  };
  const basicProps = {
    setAppMetaState,
  };
  return (
    <Router history={history}>
      <Switch>
        <DefaultRoute exact path="/">
          <Redirect to={{ pathname: '/welcome' }} />
        </DefaultRoute>
        {routes.map(({ title, component, path }) => (
          <Route
            key={path}
            {...basicProps}
            title={title}
            path={path}
            component={Loadable({ component })}
          />
        ))}
      </Switch>
    </Router>
  );
});
