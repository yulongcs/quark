import axios from 'axios';
import rootStore from '../stores/RootStore';

// // baseURL
// axios.defaults.baseURL = 'http://api.example.com';

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
    rootStore.setAuthed(false);
    // console.log('hello');
    // history.push('/host');
    // location.href = '/host';
    // axios(response.config);
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      // localStorage.removeItem('credentials');
      return;
    }
    return Promise.reject(error);
  });
