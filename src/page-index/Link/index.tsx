import * as React from 'react';
import { useDocumentTitle } from '../../hooks';

const Link = () => {
  useDocumentTitle({ title: 'Link Page' });
  return (
    <h1>Link Page</h1>
  );
};

export default Link;
