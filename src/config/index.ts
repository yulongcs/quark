const config = {
  development: {
    history: 'browser',
    apiBaseUrl: 'http://192.168.31.2:8182',
    useVconsole: false
  },
  production: {
    history: 'browser',
    apiBaseUrl: 'http://192.168.31.2:8183',
    useVconsole: false
  }
};

const nodeEnv = process.env.NODE_ENV || 'development';

export default config[nodeEnv];
