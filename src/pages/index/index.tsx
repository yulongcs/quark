import React, { useEffect } from 'react';
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
    <h1>Hello, world</h1>
  );
};
