import { IConfig } from 'umi-types';
import pkg from '../package.json';

// 获取 REACT_APP_开头
const getReactAppEnvs = () => {
  const builtConstants = {
    REACT_APP_NAME: pkg.name,
    REACT_APP_VERSION: pkg.version,
  };
  const initEnvs = { ...builtConstants, ...process.env } as any;
  const envs = {} as any;
  Object.keys(initEnvs).forEach(key => {
    if (/^REACT_APP_/.test(key)) {
      envs[`process.env.${key}`] = initEnvs[key];
    }
  });
  return envs;
};

// ref: https://umijs.org/config/
const config: IConfig = {
  define: { ...getReactAppEnvs() },
  extraBabelPlugins: [
    ['import', { libraryName: '@vdfor/react-component', libraryDirectory: 'dist/es', camel2DashComponentName: false }, '@vdfor/react-component'],
    ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
  ],
  hash: true,
  history: 'browser',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dll: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      fastClick: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      manifest: {
        basePath: '/',
      },
      pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
          importWorkboxFrom: 'local',
        }
      },
      routes: {
        exclude: [
          /components\//,
        ],
      },
      title: 'quark',
    }],
  ],
  publicPath: './',
  routes: [
    {
      path: '/',
      exact: true,
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      component: './welcome',
      title: '欢迎'
    },
    {
      path: '/index',
      component: './index',
      title: '主页'
    }
  ],
  theme: {
    '@primary-color': '#1890ff',
  },
  treeShaking: true
}

export default config;
