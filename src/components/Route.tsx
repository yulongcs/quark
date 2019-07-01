import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useTitle } from '@vdfor/react-component';

interface IProps extends RouteProps {
  setRoute: (route: string) => void;
  title: string;
}

export default (props: IProps) => {
  const { location: { pathname = '/' } = {}, setRoute, title = '' } = props;
  useTitle(title);
  setRoute(pathname);
  return (
    <Route {...props} />
  );
};
