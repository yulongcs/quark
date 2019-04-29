import * as React from 'react';
import { useDocumentTitle } from '../../hooks';

const Home = () => {
  useDocumentTitle({ title: 'Home' });
  return (
    <h1>[mobile] Home Page</h1>
  );
};

export default Home;
