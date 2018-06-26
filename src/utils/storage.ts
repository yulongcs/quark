const storage = {
  getItem: (key: string) => {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  },
  removeItem: (key: string) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
    }
  },
  setItem: (t: 'local' | 'session', key: string, item: string) => {
    if (t === 'local') {
      localStorage.setItem(key, item);
      return;
    }
    sessionStorage.setItem(key, item);
  }
};

export default storage;
