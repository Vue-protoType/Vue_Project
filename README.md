# bue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

将mongodb-data文件Json数据导入mongodb数据库,创建一个数据库，在数据库下再创建两个集合分别命名为goods和users集合。
项目的server文件是express框架文件,routes文件里的user.js配置了mongose连接mongodb，mongoose.connect('mongodb://127.0.0.1:27017/db_demo')，其中db_demo可以根据你的数据命名修改,端口也一样.
下载本项目，运行npm install 安装依赖包,
在控制台打开server文件运行npm install 安装依赖包,
再输入node ./bin/www运行服务器,
运行本项目，打开页面，输入账号：admin，密码：123456,可以进行相关操作。
