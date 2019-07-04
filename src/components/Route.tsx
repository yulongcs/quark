import React from 'react';
import { Route } from 'react-router-dom';
import { useTitle } from '@vdfor/react-component';
import { ICustomRouteProps } from '../types';

export default (props: ICustomRouteProps) => {
  const {
    location: { pathname = '/' } = {}, title = '', showTabBar = true, setAppBasicState
  } = props;
  useTitle(title);
  setAppBasicState({ route: pathname, showTabBar });
  console.log(process.env);
  return (
    <Route {...props} />
  );
};
