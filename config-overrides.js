const fs = require('fs');
const { parse: sassParse } = require('sass-variable-parser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');

/**
 *  Get html template
 *  Created by vdfor at 2018/12/20
 *  */
const getHtmlTemplate = (i, paths) => {
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
 *  Copy from https://github.com/arackaf/customize-cra
 *  */
const getBabelLoader = config => {
  const babelLoaderFilter = rule => rule.loader && rule.loader.includes('babel') && rule.options && rule.options.plugins;

  // First, try to find the babel loader inside the oneOf array.
  // This is where we can find it when working with react-scripts@2.0.3.
  let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;

  let babelLoader = loaders.find(babelLoaderFilter);

  // If the loader was not found, try to find it inside of the 'use' array, within the rules.
  // This should work when dealing with react-scripts@2.0.0.next.* versions.
  if (!babelLoader) {
    loaders = loaders.reduce((ldrs, rule) => ldrs.concat(rule.use || []), []);
    babelLoader = loaders.find(babelLoaderFilter);
  }
  return babelLoader;
}

/**
 *  Reference from https://github.com/arackaf/customize-cra
 *  Created by vdfor at 2018/12/27
 *  */
const getOutsideBabelLoader = config => { // Process any JS outside of the app with Babel.
  const outsideBabelLoaderFilter = rule => rule.loader && rule.loader.includes('babel') && rule.test && rule.test.toString() === '/\\.(js|mjs)$/';
  let loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  return loaders.find(outsideBabelLoaderFilter);
}

/**
 *  Created by vdfor at 2018/12/20
 *  */
const multiPageConfig = (config, env, paths) => {
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
    if (env === 'development') {
      entry[i].splice(0, 0, require.resolve('react-dev-utils/webpackHotDevClient'));
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      ...defaultHtmlPluginOpts,
      template: getHtmlTemplate(i, paths),
      chunks: [i],
      filename: `${i}.html`
    }));
  });
  config.entry = entry;
  if (env === 'development') {
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

/**
 *  Based on https://github.com/arackaf/customize-cra
 *  Modified by vdfor at 2018/12/20
 *  */
const disableEsLint = config => {
  let eslintRules = config.module.rules.filter(
    r => r.use && r.use.some(u => u.options && u.options.useEslintrc !== void 0)
  );
  eslintRules.forEach(rule => {
    config.module.rules = config.module.rules.filter(r => r !== rule);
  });
  return config;
};

/**
 *  Based on https://github.com/arackaf/customize-cra
 *  Modified by vdfor at 2018/12/20
 *  */
const addLessLoader = (config, env, paths, loaderConfig) => {
  const mode = env === 'development' ? 'dev' : 'prod';
  // Need these for production mode, which are copied from react-scripts
  const publicPath = paths.servedPath;
  const shouldUseRelativeAssetPaths = publicPath === './';
  const shouldUseSourceMap = mode === 'prod' && process.env.GENERATE_SOURCEMAP !== 'false';
  const lessLoader = [
    mode === 'dev'
      ? require.resolve('style-loader')
      : {
        loader: require('mini-css-extract-plugin').loader,
        options: Object.assign({}, shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined)
      },
    {
      loader: require.resolve('css-loader'),
      options: { importLoaders: 2 }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ],
        sourceMap: shouldUseSourceMap
      }
    },
    {
      loader: require.resolve('less-loader'),
      options: Object.assign(loaderConfig.options, {
        source: shouldUseSourceMap
      })
    }
  ];
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  // Insert less-loader as the penultimate item of loaders (before file-loader)
  loaders.splice(loaders.length - 1, 0, {
    test: /\.less$/,
    include: loaderConfig.include,
    use: lessLoader,
    sideEffects: mode === 'prod'
  });
  return config;
};

/**
 *  Based on https://github.com/arackaf/customize-cra
 *  Modified by vdfor at 2018/12/25
 *  */
const addBabelPlugin = (config, plugin) => {
  getBabelLoader(config).options.plugins.push(plugin);
  return config;
};

/**
 *  Created by vdfor at 2018/12/27
 *  */
const addOutsideBabelExclude = (config, regExpArr) => {
  let { exclude } = getOutsideBabelLoader(config);
  if (!exclude) {
    exclude = regExpArr;
  } else if (exclude instanceof Array) {
    exclude.push(...regExpArr);
  } else {
    exclude = [exclude, ...regExpArr];
  }
  getOutsideBabelLoader(config).exclude = exclude;
  return config;
};

/**
 *  Created by vdfor at 2018/12/20
 *  */
const addSvgIconLoader = config => {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  // Insert less-loader as the penultimate item of loaders (before file-loader)
  loaders.splice(loaders.length - 1, 0, {
    test: /-icon\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [{ loader: require.resolve('@svgr/webpack') }]
  });
  return config;
};

/**
 *  Created by vdfor at 2018/12/20
 *  */
const setTsCheckerOpts = (config, options = {}) => {
  const iterablePlugins = config.plugins.entries();
  for (const [index, plugin] of iterablePlugins) {
    if (plugin instanceof ForkTsCheckerWebpackPlugin) {
      config.plugins[index] = new ForkTsCheckerWebpackPlugin({ ...plugin.options, ...options });
      break;
    }
  }
  return config;
};

// override
module.exports = (config, env, { paths }) => {
  config = disableEsLint(config);
  config = addBabelPlugin(config, ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]);
  config = addOutsideBabelExclude(config, [/@ckeditor.*/]); // support ckeditor5
  config = addLessLoader(config, env, paths, {
    options: { // custom antd themes
      modifyVars: sassParse(fs.readFileSync(paths.appSrc + '/themes/antd.scss').toString(), { camelCase: false, indented: false }),
      javascriptEnabled: true
    },
    include: /[\\/]node_modules[\\/].*antd[\\/]/
  });
  config = addSvgIconLoader(config);
  config = setTsCheckerOpts(config, { tslint: paths.appPath + '/tslint.json' });
  config = multiPageConfig(config, env, paths);
  return config;
};
