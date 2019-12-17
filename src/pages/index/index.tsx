import React, { useEffect } from 'react';
import { loadUsersApi } from './api';

export default () => {
  useEffect(() => {
    const loadUsers = async () => {
      await loadUsersApi();
    };
    loadUsers();
  }, []);
  return (
    <h1>Hello, world</h1>
  );
};
