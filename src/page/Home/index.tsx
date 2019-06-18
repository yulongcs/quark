import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTitle } from '@vdfor/react-component';
import { IRootReducer } from '../../types';
import { goPage } from '../../utils';

const Home = () => {
  useTitle('Home');
  const goAboutPage = () => goPage('/about');
  const { pageInfo } = useSelector((state: IRootReducer) => state.homeReducer);

  return (
    <>
      <h1 onClick={goAboutPage}>{pageInfo.pageState}</h1>
    </>
  );
};

export default Home;
