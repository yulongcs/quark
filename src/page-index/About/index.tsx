import * as React from 'react';
import { goPage } from '../../utils';
import { useDocumentTitle } from '../../hooks';

const About = () => {
  useDocumentTitle({ title: 'About' });
  const goHomePage = () => goPage('/home');
  return (
    <h1 onClick={goHomePage}>[mobile] About Page</h1>
  );
};

export default About;
