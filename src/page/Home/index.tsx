import * as React from 'react';
import { Spin } from '@vdfor/react-component';
import { goPage } from '../../utils';
import { useDocumentTitle } from '../../hooks';

const Home = () => {
  useDocumentTitle({ title: 'Home' });
  const goAboutPage = () => goPage('/about');
  return (
    <>
      <Spin />
      <h1 onClick={goAboutPage}>[mobile] Home Page</h1>
    </>
  );
};

export default Home;
