import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTitle, Spin } from '@vdfor/react-component';
import { setRouteAction } from '../App/action';
import { initAction } from './action';
import { IRootReducer, PAGE_STATUS_ENUM } from '../../types';
import { goPage } from '../../utils';

export default ({ location }: RouteComponentProps) => {
  useTitle('Home');
  const goAboutPage = () => goPage('/about');
  const { pageInfo: { pageState } } = useSelector((state: IRootReducer) => state.homeReducer);
  const dispatch = useDispatch();

  dispatch(setRouteAction(location.pathname));

  useEffect(() => {
    dispatch(initAction());
  }, [dispatch, location.pathname]);

  return pageState === PAGE_STATUS_ENUM.CONTENT ? (
    <>
      <h1 onClick={goAboutPage}>{pageState}</h1>
    </>
  ) : <Spin style={{ height: '100vh' }} />;
};
