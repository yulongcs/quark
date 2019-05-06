# quark

Seed of react

## Feature
+ Base on [CRA](https://github.com/facebook/create-react-app), rewired (powered by [react-app-rewired](https://github.com/timarney/react-app-rewired)) not eject
+ Keep alive
+ React hooks
+ Loaded on demand
+ Built-in components
+ `Docker` supported
+ ...

## About `config-overrides.js`

> config `cra` with not eject

built-in support by `quark`:

+ `eslint` config (with `.eslintrc.js` and `.eslintignore`) - `setEslint`
+ custom `antd`/`antd-mobile` theme - `addLessLoader`
+ pxtorem - `addPostcssPlugins`
+ import `antd`/`antd-mobile` - `addBabelPlugin`
+ multi page - `multiPageConfig`