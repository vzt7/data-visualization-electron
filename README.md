# data-visualization-electron

某校大学生相关数据可视化


## Tech Stack / Libs

Front-End :

- Webpack - 打包&工程化
- Vue.js - MVVM框架
- Electron - 跨端(PC)
- iView - UI组件库
- G2 - 图表可视化
- L7 - 地理空间可视化
- AMap - 高德地图
- turf.js - 空间关系库
- scss - CSS预处理


## Directory Tree
```
📦 data-visualization-electron
 ┣ 📂.electron-vue
 ┃ ┗ *一些打包配置
 ┣ 📂dist
 ┃ ┗ *打包输出目录
 ┣ 📂node_modules
 ┃ ┗ *项目依赖(npm install)
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┗ *Electron配置文件
 ┃ ┣ 📂renderer
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┗ *静态资源
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ *所有组件
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┗ 📜data.conf.js *可视化依赖的数据
 ┃ ┃ ┣ 📂lib
 ┃ ┃ ┃ ┗ *一些依赖文件
 ┃ ┃ ┣ 📂router
 ┃ ┃ ┃ ┗ *路由
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┗ *Vuex
 ┃ ┃ ┣ 📜App.vue *入口
 ┃ ┃ ┗ 📜main.js *挂载&依赖处理
 ┃ ┗ 📜index.ejs *生成index.html
 ┣ 📂static
 ┃ ┣ 📂data
 ┃ ┃ ┣ *目前存放可视化数据的地方(各类json文件)
 ┃ ┃ ┣ 📜map.json
 ┃ ┗ ┗ 📜stu.json
 ┣ 📜.babelrc *babel配置
 ┣ 📜.gitignore *增加了./static/data目录，防止push到github泄露数据
 ┣ 📜package.json *依赖列表&项目信息
 ┣ 📜README-electron.md
 ┗ 📜README.md
```


## Build Up

需要安装 npm ([Node.js](https://nodejs.org/en/)自带)，install 过慢可以使用 [cnpm](http://npm.taobao.org/)

``` bash
# 安装依赖
npm install

# 本地运行
npm run dev

# 打包成 web 应用
npm run build

# 打包成 pc 应用
npm run pack
```

打包应用请看  [README-electron.md](./README-electron.md)

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).



