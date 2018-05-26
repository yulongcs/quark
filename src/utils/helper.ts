export const getCredentials = (f: 'user' | 'token' | 'all' = 'all') => {
  const storageCredential = localStorage.getItem('credentials');
  const credentials = storageCredential ? JSON.parse(storageCredential) : null;
  switch(f) {
    case 'user':
    return credentials && credentials.user;
    case 'token':
    return credentials && credentials.access_token;
    default:
    return credentials;
  }
};
