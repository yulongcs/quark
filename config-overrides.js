/* config-overrides.js */

/* tslint:disable */
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader, paths } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

// 多页应用入口文件数组
const pages = ['index', 'index-charon'];

module.exports = (config, env) => {

  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  // ts-import-plugin
  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'true',
      })]
    })
  };

  // 多页应用entry配置
  config.entry = ((entry) => {
    const entryPages = {};
    // 确认入口tsx在entry数组的位置
    const entryIndex = entry.indexOf(paths.appIndexJs);

    pages.forEach(i => {
      if (i === 'index') {
        entryPages[i] = entry;
      } else {
        const defaultEntry = _.cloneDeep(entry);
        defaultEntry[entryIndex] = paths.appSrc + `/${i}.tsx`;
        entryPages[i] = defaultEntry;
      }
    });
    return entryPages;
  })(config.entry);

  // 多页应用output配置
  if (env === 'development') {
    config.output.filename = 'static/js/[name].bundle.js';
  }

  // customize theme
  config = rewireLess.withLoaderOptions({
    // brand-primary if antd-mobile
    modifyVars: { "@primary-color": "#1DA57A" },
  })(config, env);

  // less-modules
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.less$/,
      // exclude: /node_modules|antd-mobile\.css/,
      exclude: /node_modules|antd\.less/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            minimize: true,
            // sourceMap: true,
            modules: true,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              })
            ]
          }
        },
        {
          loader: require.resolve('less-loader')
        }
      ]
    }
  );

  // 多页应用plugins配置
  config.plugins = ((plugins) => {
    // 确认HtmlWebpackPlugin在plugins数组的位置
    let htmlIndex;
    let j = plugins.length;
    while (j--) {
      if (plugins[j] instanceof HtmlWebpackPlugin) {
        htmlIndex = j;
        break;
      }
    }

    const newPlugins = _.cloneDeep(plugins);
    newPlugins.splice(htmlIndex, 1);
    pages.forEach((i, index) => {
      const htmlOpts = _.cloneDeep(plugins[htmlIndex].options);
      htmlOpts.chunks = [i];
      htmlOpts.filename = `${i}.html`;
      newPlugins.splice(index + htmlIndex, 0, new HtmlWebpackPlugin(htmlOpts));
    });
  
    return newPlugins;
  })(config.plugins);

  return config;
}
