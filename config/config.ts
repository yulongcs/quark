// eslint-disable-next-line
import { IConfig } from 'umi-types';
import fs from 'fs';
import path from 'path';
import { parse as sassParse } from 'sass-variable-parser';
import pxToViewPort from 'postcss-px-to-viewport';
import routes from './routes';
import pkg from '../package.json';

// 获取 REACT_APP_开头
const getReactAppEnvs = () => {
  const builtConstants = {
    REACT_APP_NAME: pkg.name,
    REACT_APP_VERSION: pkg.version,
  };
  const initEnvs = { ...builtConstants, ...process.env } as any;
  const envs = {} as any;
  Object.keys(initEnvs).forEach((key) => {
    if (/^REACT_APP_/.test(key)) {
      envs[`process.env.${key}`] = initEnvs[key];
    }
  });
  return envs;
};

// get antd and antd-mobile theme from src/assets/style/theme.scss
const getTheme = () => {
  const initTheme = sassParse(fs.readFileSync(path.join(__dirname, '../src/assets/style/theme.scss')).toString(), { camelCase: false, indented: false });
  const theme = {};
  Object.keys(initTheme).forEach((key) => {
    theme[`@${key}`] = initTheme[key];
  });
  return theme;
};

// ref: https://umijs.org/config/
const config: IConfig = {
  chainWebpack(webpackConfig) {
    // 以 -icon.svg 结尾的处理成 react component
    webpackConfig.module
      .rule('svg')
      .test(/-icon\.svg(\?v=\d+\.\d+\.\d+)?$/)
      .use('babel-loader')
      .loader(require.resolve('@svgr/webpack'));
  },
  define: { ...getReactAppEnvs() },
  extraBabelPlugins: [
    ['import', { libraryName: '@vdfor/react-component', libraryDirectory: 'dist/es', camel2DashComponentName: false }, '@vdfor/react-component'],
    ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
  ],
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 750,
      propList: ['*'],
      unitToConvert: 'px',
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
    }),
  ],
  hash: true,
  history: 'browser',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dll: true,
      dva: false,
      dynamicImport: { webpackChunkName: true, loadingComponent: './components/PageLoading' },
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
        },
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
  routes,
  sass: {},
  theme: {
    ...getTheme(),
  },
  treeShaking: true,
  urlLoaderExcludes: [/-icon\.svg(\?v=\d+\.\d+\.\d+)?$/],
};

export default config;
