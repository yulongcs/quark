const fs = require('fs');
const { override, addBabelPlugins, addLessLoader, addPostcssPlugins, useEslintRc, enableEslintTypescript, addWebpackAlias } = require('customize-cra');
const { parse: sassParse } = require('sass-variable-parser');
const paths = require('react-scripts/config/paths');
const pxtorem = require('postcss-pxtorem');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

/**
 *  Get html template
 *  Created by vdfor at 2018/12/20
 *  */
const getHtmlTemplate = (i) => {
  if (i === 'index') {
    return paths.appHtml;
  }
  try {
    const stat = fs.statSync(paths.appPublic + `/${i}.html`);
    if (stat && stat.isFile()) {
      return paths.appPublic + `/${i}.html`; // use custom html template
    }
    return paths.appHtml; // use default template
  } catch (error) {
    return paths.appHtml; // use default template
  }
};

/**
 *  Created by vdfor at 2018/12/20
 *  */
const setMultiPage = () => (config) => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const defaultHtmlPluginOpts = config.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin).options;
  const pages = ['index'];
  const srcFiles = fs.readdirSync(paths.appSrc);
  srcFiles.forEach(i => {
    if (/^index-.*\.tsx$/.test(i)) { // index-[name].tsx
      pages.push(i.replace(/\.tsx$/, ''));
    }
  })
  pages.forEach(i => {
    entry[i] = [
      i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
    ];
    if (process.env.NODE_ENV === 'development') {
      entry[i].splice(0, 0, require.resolve('react-dev-utils/webpackHotDevClient'));
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      ...defaultHtmlPluginOpts,
      template: getHtmlTemplate(i),
      chunks: [i],
      filename: `${i}.html`
    }));
  });
  config.entry = entry;
  if (process.env.NODE_ENV === 'development') {
    config.output.filename = 'static/js/[name].bundle.js';
  }
  const iterablePlugins = config.plugins.entries();
  for (const [index, plugin] of iterablePlugins) {
    if (plugin instanceof HtmlWebpackPlugin) {
      config.plugins.splice(index, 1);
      config.plugins.splice(index, 0, ...htmlWebpackPlugins);
      break;
    }
  }
  return config;
}


module.exports = override(
  enableEslintTypescript(),
  useEslintRc(paths.appPath + '/.eslintrc.js'),
  ...addBabelPlugins(
    ['import', { libraryName: 'antd-mobile', style: true }, 'antd-mobile'],
    ['import', { libraryName: '@vdfor/react-component', libraryDirectory: 'dist/es', camel2DashComponentName: false }, '@vdfor/react-component']
  ),
  addLessLoader({
    modifyVars: sassParse(fs.readFileSync(paths.appSrc + '/config/theme.scss').toString(), { camelCase: false, indented: false }),
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
  setMultiPage(),
  addWebpackAlias({ 'styled-components': require.resolve('styled-components') }),
  addWebpackAlias({ 'react': require.resolve('react') })
);
