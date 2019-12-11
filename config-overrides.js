const {
  override, addBabelPlugins, useEslintRc, enableEslintTypescript, addWebpackAlias, addLessLoader
} = require('customize-cra');
const path = require('path');
const paths = require('react-scripts/config/paths');
const { antdTheme } = require('./config-theme');

/**
 *  Created by vdfor at 2018/12/20
 *  */
const addSvgIconLoader = () => (config) => {
  const loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf;
  loaders.splice(loaders.length - 1, 0, {
    test: /-icon\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [{ loader: require.resolve('@svgr/webpack') }],
  });
  return config;
};

module.exports = override(
  enableEslintTypescript(),
  useEslintRc(`${paths.appPath}/.eslintrc.js`),
  ...addBabelPlugins(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ['import', { libraryName: '@vdfor/react-component', libraryDirectory: 'dist/es', camel2DashComponentName: false }, '@vdfor/react-component'],
    ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
  ),
  addLessLoader({
    modifyVars: antdTheme,
    javascriptEnabled: true,
    include: /[\\/]node_modules[\\/].*antd[\\/]/
  }),
  // addLessLoader({
  //   modifyVars: antdMobileTheme,
  //   javascriptEnabled: true,
  //   include: /[\\/]node_modules[\\/].*antd-mobile[\\/]/
  // }),
  addSvgIconLoader(),
  addWebpackAlias({
    'src': path.resolve(__dirname, './src'),
    'react': require.resolve('react'),
    'styled-components': require.resolve('styled-components')
  })
);
