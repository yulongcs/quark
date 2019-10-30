import React from 'react';
import { Route } from 'react-router-dom';
import { useTitle } from '@vdfor/react-component';
import { ICustomRouteProps } from '../type';

export default (props: ICustomRouteProps) => {
  const {
    location: { pathname = '/' } = {}, title = '', showTabBar = true, setAppBasicState,
  } = props;
  useTitle(title);
  setAppBasicState({ route: pathname, showTabBar });
  return (
    <Route {...props} />
  );
};
