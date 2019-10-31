const fs = require('fs');
const { override, addBabelPlugins, addLessLoader, addPostcssPlugins, useEslintRc, enableEslintTypescript, addBundleVisualizer } = require('customize-cra');
const paths = require('react-scripts/config/paths');
const pxtorem = require('postcss-pxtorem');
const { antdMobileTheme } = require('./config-theme');

/**
 *  Created by vdfor at 2018/12/20
 *  */
const addSvgIconLoader = () => config => {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  loaders.splice(loaders.length - 1, 0, {
    test: /-icon\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [{ loader: require.resolve('@svgr/webpack') }]
  });
  return config;
};


module.exports = override(
  enableEslintTypescript(),
  useEslintRc(paths.appPath + '/.eslintrc.js'),
  ...addBabelPlugins(
    ['import', { libraryName: 'antd-mobile', style: true }, 'antd-mobile'],
    ['import', { libraryName: '@vdfor/react-component', libraryDirectory: 'dist/es', camel2DashComponentName: false }, '@vdfor/react-component'],
    ['import', { libraryName: 'lodash',libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
  ),
  addLessLoader({
    modifyVars: antdMobileTheme,
    javascriptEnabled: true,
    include: /[\\/]node_modules[\\/].*antd-mobile[\\/]/
  }),
  addPostcssPlugins([pxtorem({
    rootValue: 28,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [/.am-/],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  })]),
  addSvgIconLoader(),
  addBundleVisualizer()
);
