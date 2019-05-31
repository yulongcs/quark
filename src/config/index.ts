const config = {
  development: {
    history: 'browser',
    apiBaseUrl: 'http://192.168.31.2:8182'
  },
  production: {
    history: 'browser',
    apiBaseUrl: 'http://192.168.31.2:8183'
  }
};

const nodeEnv = process.env.NODE_ENV || 'development';

export default config[nodeEnv];
