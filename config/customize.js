const fs = require('fs');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html模板
const getTemplate = (i) => {
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

module.exports = (nodeEnv) => {
  // 多页应用入口文件数组
  const pages = ['index'];
  // 入口文件
  const entry = {};
  // htmlWebpackPlugins
  const htmlWebpackPlugins = [];

  let outFileName = null; // only for dev-env

  pages.forEach(i => {
    if (nodeEnv === '"development"') {
      entry[i] = [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
      ];
      outFileName = 'static/js/[name].bundle.js';
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: getTemplate(i),
        chunks: [i],
        filename: `${i}.html`
      }));
    } else { // nodeEnv === '"production"'
      entry[i] = [
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

  const lessLoaders = (getStyleLoaders) => ({
    test: /\.less$/,
    include: /[\\/]node_modules[\\/].*antd[\\/]/,
    use: getStyleLoaders(
      { importLoaders: 2 },
      'less-loader',
      {
        modifyVars: {
          'primary-color': '#7ed321',
          'modal-header-bg': '#0f1922'
        },
        javascriptEnabled: true
      }
    )
  });

  const extraForkTsCheckerWebpackPluginOpts = { tslint: paths.appPath + '/tslint.json' };

  const svgIconLoader = {
    test: /-icon\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
      },
      {
        loader: require.resolve('@svgr/webpack'),
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  };

  const extraWebpackPlugins = [...htmlWebpackPlugins];

  const extraBabelPlugins = [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }]
  ];

  const extraLoaders = (getStyleLoaders) => [svgIconLoader, lessLoaders(getStyleLoaders)];

  const extraJsLoaderConfig = {
    exclude: [
      // /NIM_Web_*\.js/ // if with Nim_Web
    ]
  };

  const extraJSTestExclude = [
    /@babel(?:\/|\\{1,2})runtime/
    // /@ckeditor.*/ // if with ckeditor5
  ];

  return { entry, outFileName, extraForkTsCheckerWebpackPluginOpts, extraWebpackPlugins, extraBabelPlugins, extraLoaders, extraJsLoaderConfig, extraJSTestExclude };
};
