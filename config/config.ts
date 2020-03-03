import { defineConfig } from 'umi';
import fs from 'fs';
import path from 'path';
import lessParse from 'less-var-parse';
import pxToViewPort from 'postcss-px-to-viewport';
import apiConfig from './api';
import routes from './routes';
import pkg from '../package.json';

const nodeEnv = process.env.NODE_ENV || 'production';

// 获取 REACT_APP_ 开头环境变量
const getReactAppEnvs = () => {
  const builtConstants = {
    REACT_APP_NAME: pkg.name,
    REACT_APP_VERSION: pkg.version,
    ...apiConfig[nodeEnv],
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

console.log('envs', getReactAppEnvs());

// get antd and antd-mobile theme from src/assets/style/theme.scss
const getTheme = () => {
  const initTheme = lessParse(
    fs.readFileSync(path.join(__dirname, '../src/asset/style/theme.less'), 'utf8'),
  );
  const theme = {};
  Object.keys(initTheme).forEach(key => {
    theme[key] = initTheme[key];
  });
  return theme;
};

// 是否开启SSR
// const isSSR = process.env.REACT_APP_SSR === '1';

export default defineConfig({
  chainWebpack(memo) {
    // 以 -icon.svg 结尾的处理成 react component
    memo.module
      .rule('svg')
      .test(/-icon\.svg(\?v=\d+\.\d+\.\d+)?$/)
      .use('babel-loader')
      .loader(require.resolve('@svgr/webpack'));
  },
  define: { ...getReactAppEnvs() },
  dva: false,
  dynamicImport: { loading: '@/component/PageLoading' },
  // @ts-ignore
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@vdfor/react-component',
        libraryDirectory: 'dist/lib',
        camel2DashComponentName: false,
      },
      '@vdfor/react-component',
    ],
    [
      'import',
      { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false },
      'lodash',
    ],
    'macros',
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
    pxToViewPort({
      // 作用于antd-mobile
      viewportWidth: 375,
      propList: ['*'],
      unitToConvert: 'px',
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/![\\/]node_modules[\\/].*antd-mobile[\\/]/],
    }),
  ],
  favicon: './favicon.ico',
  hash: nodeEnv === 'production',
  history: {
    type: 'browser',
  },
  ignoreMomentLocale: true,
  initialState: false,
  manifest: {
    basePath: '/',
  },
  publicPath: './',
  routes,
  singular: true, // 单数模式
  // ssr: isSSR,
  theme: {
    ...getTheme(),
  },
  title: 'quark',
});
