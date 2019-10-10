const indexConfig = {
  dbName: 'quark-db', // indexDB name
  logCollectionName: 'quark-db-collection-log' // 日志表名称
};

const config = {
  development: { // 开发环境
    history: 'browser',
    apiBaseUrl: 'http://127.0.0.1:3000',
    useLogRecord: true
  },
  production: { // 生产环境
    history: 'browser',
    apiBaseUrl: 'http://192.168.31.2:8183',
    useLogRecord: true
  }
};

const nodeEnv = process.env.NODE_ENV || 'development';

export default { ...indexConfig, ...config[nodeEnv] };
