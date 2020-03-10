import React, { FC, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { loadUsersApi } from './api';
import styles from './index.scss';

const Home: FC = () => {
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await loadUsersApi();
      } catch (error) {
        //
      }
    };
    loadUsers();
  }, []);
  return (
    <div>
      <h1>Hello, world</h1>
      <div className={styles.text}>你好，世界</div>
      <Button type="primary">按钮</Button>
    </div>
  );
};

export default Home;
