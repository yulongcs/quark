import { defineConfig } from 'umi';
import fs from 'fs';
import path from 'path';
import { parse as sassParse } from 'sass-variable-parser';
import pxToViewPort from 'postcss-px-to-viewport';
import getReactAppEnvs from './env';
import routes from './routes';

const nodeEnv = process.env.NODE_ENV || 'production';

// get antd and antd-mobile theme from src/assets/style/theme.less
const getTheme = () => {
  const initTheme = sassParse(fs.readFileSync(path.join(__dirname, '../src/asset/style/theme.scss')).toString(), {
    camelCase: false,
    indented: false,
  });
  const theme = {};
  Object.keys(initTheme).forEach(key => {
    theme[key] = initTheme[key];
  });
  return theme;
};

// 是否开启SSR
// const isSSR = process.env.REACT_APP_SSR === '1';

export default defineConfig({
  // chainWebpack(memo) {
  //   // 以 -icon.svg 结尾的处理成 react component
  //   memo.module
  //     .rule('svg')
  //     .test(/-icon\.svg(\?v=\d+\.\d+\.\d+)?$/)
  //     .use('babel-loader')
  //     .loader(require.resolve('@svgr/webpack'));
  // },
  define: { ...getReactAppEnvs() },
  dva: false,
  dynamicImport: { loading: '@/component/PageLoading' },
  extraBabelPlugins: [
    // @ts-ignore
    [
      'import',
      {
        libraryName: '@vdfor/react-component',
        libraryDirectory: 'dist/lib',
        camel2DashComponentName: false,
      },
      '@vdfor/react-component',
    ],
    // @ts-ignore
    ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
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
      minPixelValue: 0.5,
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
      minPixelValue: 0.5,
      mediaQuery: false,
      replace: true,
      exclude: [/![\\/]node_modules[\\/].*antd-mobile[\\/]/],
    }),
  ],
  hash: nodeEnv === 'production',
  history: {
    type: 'browser',
  },
  ignoreMomentLocale: true,
  initialState: false,
  manifest: {
    basePath: '/',
  },
  publicPath: nodeEnv === 'production' ? './' : '/',
  routes,
  singular: true, // 单数模式
  // ssr: isSSR,
  theme: {
    ...getTheme(),
  },
  title: 'quark',
});
