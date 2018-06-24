# brook-react

## 安装nodejs -- 用于编译
### nvm方式(适用于linux/mac, 推荐)
+ 安装nvm -- 参考[https://github.com/creationix/nvm](https://github.com/creationix/nvm)
+ 使用nvm安装nodejs
```bash
nvm install [version] # 如 nvm install 8.9.0, 建议安装8.x版本
```

### 其他方式
+ windows/mac下直接官网下载运行程序，点击安装
+ mac/linux可编译源码安装

### 配置nodejs国内镜像源
```bash
npm config set registry=https://registry.npm.taobao.org
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```

## 快速开始(开发环境)
```bash
npm i
npm start
```

## 构建
```bash
# 完成后会生成build目录,存放编译后的静态资源
npm run build
```

## 部署
```bash
# 该命令会自动安装依赖，并完成前端代码构建；然后将生成的build目录移至 ../brook-admin/src/main/resources 目录下，并重命名为 web-dist
sh run.sh
```

## 技术栈
+ react -- 框架
+ react-router -- 前端路由
+ mobx -- 状态管理
+ axios -- 前后端交互
+ antd -- UI库
+ typescript -- 开发语言
+ webpack -- 打包构建

## 应用结构