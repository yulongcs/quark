/* 自定义配置 */
'use strict';

const fs = require('fs');
// const path = require('path');
const paths = require('./paths');
const lessToJs = require('less-vars-to-js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const getTemplate = (i) => { // 获取html模板
  if (i === 'index') {
    return paths.appHtml;
  }
  try {
    const stat = fs.statSync(paths.appPublic + `/${i}.html`);
    if (stat && stat.isFile()) {
      return paths.appPublic + `/${i}.html`; // 使用自定义模板
    }
    return paths.appHtml; // 使用默认模板
  } catch (error) {
    return paths.appHtml; // 使用默认模板
  }
};

const getExtra = (nodeEnv) => {
  // 多页应用入口文件数组
  const pages = ['index', 'index-mobile'];
  // 获取antd自定义主题设置
  const antdThemer = lessToJs(fs.readFileSync(paths.appSrc + '/themes/antd.less', 'utf8'));
  // 获取antd-mobile自定义主题设置
  const antdMobileThemer = lessToJs(fs.readFileSync(paths.appSrc + '/themes/antd-mobile.less', 'utf8'));

  // 入口文件
  const entry = {};
  // htmlWebpackPlugins
  const htmlWebpackPlugins = [];
  pages.forEach(i => {
    if (nodeEnv === '"development"') {
      entry[i] = [
        require.resolve('./polyfills'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
      ];
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: getTemplate(i),
        chunks: [i],
        filename: `${i}.html`
      }));
    } else {
      entry[i] = [
        require.resolve('./polyfills'),
        i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
      ];

      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: getTemplate(i),
        chunks: [i],
        filename: `${i}.html`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }));
    }
  });

  // less loader
  const lessLoaders = (() => {
    const arr = ['less-module', 'customize-antd-theme', 'customize-antd-mobile-theme'];
    const resArr = [];
    arr.forEach(i => {
      const opts = {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                    'iOS >= 7',
                    'Android >= 4'
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true
            }
          }
        ],
      };
      if (i === 'less-module') {
        opts.include = /\.module\.less/; // 需开启的less-module以.module结尾
        opts.exclude = /node_modules/;
        opts.use[1].options.modules = true;
        opts.use[1].options.localIdentName = '[local]__[hash:base64:5]';
      } else if (i === 'customize-antd-theme') { // antd自定义主题
        opts.include = /[\\/]node_modules[\\/].*antd[\\/]/;
        opts.exclude = /\.module\.less/;
        opts.use[3].options.modifyVars = antdThemer;
      } else if (i === 'customize-antd-mobile-theme') { // antd-mobile自定义主题
        opts.include = /[\\/]node_modules[\\/].*antd-mobile[\\/]/;
        opts.exclude = /\.module\.less/;
        opts.use[3].options.modifyVars = antdMobileThemer;
      }
      resArr.push(opts);
    })
    return resArr;
  })();

  const customizePlugins = [...htmlWebpackPlugins, new MonacoWebpackPlugin()];

  return { entry, customizePlugins, lessLoaders };
}


module.exports = { getExtra };
