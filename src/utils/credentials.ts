import storage from './storage';

const storageCredential = storage.getItem('credentials');
const info = storageCredential ? JSON.parse(storageCredential) : null;

const credentials = {
  all: info,
  token: info && info.access_token,
  user: info && info.user
};

export default credentials;
