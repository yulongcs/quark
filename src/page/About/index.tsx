import * as React from 'react';
import { useTitle } from '@vdfor/react-component';
import { goPage } from '../../utils';

const About = () => {
  useTitle('ABOUT');
  const goHomePage = () => goPage('/home');
  return (
    <h1 onClick={goHomePage}>[mobile] About Page</h1>
  );
};

export default About;
