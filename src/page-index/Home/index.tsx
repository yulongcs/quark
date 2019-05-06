import * as React from 'react';
import { Toast } from '../../components';
import { useDocumentTitle } from '../../hooks';
import { request } from '../../utils';

const Home = () => {
  useDocumentTitle({ title: 'Home Page' });
  const showMessage = () => Toast.info('update info success');
  React.useEffect(() => {
    request('http://g.cn', { method: 'GET' });
  }, []);
  return (
    <h1 onClick={showMessage}>Home Page</h1>
  );
};

export default Home;
