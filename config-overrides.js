const { injectBabelPlugin } = require('react-app-rewired');
const fs = require('fs');
const paths = require('react-scripts/config/paths');
const resolve = require('resolve');
const rewireLess = require('react-app-rewire-less');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

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

const getExtra = (nodeEnv) => {
  // 多页应用入口文件数组
  const pages = ['index'];
  // 入口文件
  const entry = {};
  // htmlWebpackPlugins
  const htmlWebpackPlugins = [];

  pages.forEach(i => {
    if (nodeEnv === 'development') {
      entry[i] = [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        i === 'index' ? paths.appIndexJs : paths.appSrc + `/${i}.tsx`
      ];
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: getTemplate(i),
        chunks: [i],
        filename: `${i}.html`
      }));
    } else { // nodeEnv === 'production'
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

  const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }),
    async: false,
    checkSyntacticErrors: true,
    tsconfig: paths.appTsConfig,
    compilerOptions: {
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'preserve',
    },
    reportFiles: [
      '**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!src/setupProxy.js',
      '!src/setupTests.*',
    ],
    watch: paths.appSrc,
    silent: true,
    formatter: typescriptFormatter,
    tslint: paths.appPath + '/tslint.json'
  });

  return { entry, htmlWebpackPlugins, forkTsCheckerWebpackPlugin };
}

module.exports = (config, env) => {

  const { entry, htmlWebpackPlugins, forkTsCheckerWebpackPlugin } = getExtra(env);

  config.entry = entry;

  if (env === 'development') {
    config.output.filename = 'static/js/[name].bundle.js';
  }

  const newPlugins = [];
  for (const plugin of config.plugins) {
    if (plugin instanceof HtmlWebpackPlugin) {
      newPlugins.push(...htmlWebpackPlugins);
    } else if (plugin instanceof ForkTsCheckerWebpackPlugin) {
      newPlugins.push(forkTsCheckerWebpackPlugin);
    } else {
      newPlugins.push(plugin);
    }
  }

  config.plugins = newPlugins;

  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#1DA57A'
    },
    javascriptEnabled: true,
  })(config, env);

  return config;
};
