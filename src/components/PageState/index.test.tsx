import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';

it('[PageState - empty state] renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Index state="empty" tipText="Can not get any data" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('[PageState - error state] renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Index state="error" tipText={<div>ErrorPage</div>} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
