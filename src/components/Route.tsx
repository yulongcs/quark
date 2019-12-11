import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useTitle } from '@vdfor/react-component';
import { IAppMetaState } from 'src/store/types';

interface ICustomRouteProps extends RouteProps {
  title: string;
  setAppMetaState: (state: Partial<IAppMetaState>) => void;
}

export default (props: ICustomRouteProps) => {
  const {
    location: { pathname = '/' } = {}, title = 'quark', setAppMetaState,
  } = props;
  useTitle(title);
  setAppMetaState({ route: pathname, title });
  return (
    <Route {...props} />
  );
};
