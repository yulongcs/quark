import axios from 'axios';
import rootStore from '../stores/RootStore';

// request interceptors
axios.interceptors.request.use(
  (config) => {
    const storageCredential = localStorage.getItem('credentials');
    const credentials = storageCredential ? JSON.parse(storageCredential) : null;
    if (credentials && credentials.access_token) {
      config.headers = { ...config.headers, Authorization: 'Bearer ' + credentials.access_token };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      localStorage.removeItem('credentials');
      rootStore.setAuthed(false);
    }
    return Promise.reject(error);
  });
