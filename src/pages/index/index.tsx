import React, { useEffect } from 'react';
import { loadUsersApi } from './api';

export default () => {
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await loadUsersApi();
        console.log(111);
      } catch (error) {
        console.log(error, error.status);
      }
    };
    loadUsers();
  }, []);
  return (
    <h1>Hello, world</h1>
  );
};
