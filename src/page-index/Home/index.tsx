import * as React from 'react';
import { useDocumentTitle } from '../../hooks';

const Home = () => {
  useDocumentTitle({ title: 'Home Page' });
  return (
    <h1>Home Page</h1>
  );
};

export default Home;
