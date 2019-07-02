import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from '@vdfor/react-component';
import { initAction } from './action';
import { IRootReducer } from '../App/type';
import { PAGE_STATUS_ENUM } from '../../types';
import { goPage } from '../../utils';

export default () => {
  const goAboutPage = () => goPage('/about');
  const { pageInfo: { pageState } } = useSelector((state: IRootReducer) => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAction());
  }, [dispatch]);

  return pageState === PAGE_STATUS_ENUM.CONTENT ? (
    <>
      <h1 onClick={goAboutPage}>{pageState}</h1>
    </>
  ) : <Spin style={{ height: '100vh' }} />;
};
