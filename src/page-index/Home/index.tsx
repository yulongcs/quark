import * as React from 'react';
import { Toast } from '../../components';
import { useDocumentTitle } from '../../hooks';

const Home = () => {
  useDocumentTitle({ title: 'Home Page' });
  const showMessage = () => Toast.fail('网络错误，请重试');
  return (
    <h1 onClick={showMessage}>Home Page</h1>
  );
};

export default Home;
