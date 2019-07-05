const indexConfig = {
  dbName: 'quark-db', // indexDB name
  logCollectionName: 'quark-db-collection-log' // 日志表名称
};

const config = {
  development: {
    history: 'browser',
    apiBaseUrl: 'http://127.0.0.1:3000',
    useVconsole: false,
    useLogRecord: true
  },
  production: {
    history: 'browser',
    apiBaseUrl: 'http://192.168.31.2:8183',
    useVconsole: false,
    useLogRecord: true
  }
};

const nodeEnv = process.env.NODE_ENV || 'development';

export default { ...indexConfig, ...config[nodeEnv] };
