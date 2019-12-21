import React, { useEffect } from 'react';
import { Spin } from '@vdfor/react-component';
import { loadUsersApi } from './api';

export default () => {
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
    <>
      <h1>Hello, world</h1>
      <Spin />
    </>
  );
};
