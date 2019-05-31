import * as React from 'react';
import { goPage } from '../../utils';
import { useDocumentTitle } from '../../hooks';

const Home = () => {
  useDocumentTitle({ title: 'Home' });
  const goAboutPage = () => goPage('/about');
  return (
    <h1 onClick={goAboutPage}>[mobile] Home Page</h1>
  );
};

export default Home;
