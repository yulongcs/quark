import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';

it('[Loading] renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Index style={{ height: '100vh' }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
