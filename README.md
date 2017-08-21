# mvproject.project.webpack3

## 构建环境

安装 mvproject:              `sudo npm install -g mvproject`

初始化燕尾服(如果没有的话):  `mvproject install stc`

安装项目内容:                 `mvproject install webpack3`

## 构建编译

运行命令`mvproject build`，输出目录`output/`

## webpack 环境初始化

运行命令 `mvproject update` 初始化 npm package.json 和 bower.json 配置的组件

## 静态资源说明

除了 js 和 html, 原有的 css、img 结构不变

js 的开发目录为 src-webpack/static 目录下面的js
src-webpack/static/js 里面的文件 webpack 编译后将实时保存到 src/static/js 目录下对应的文件

html 的开发目录为 src-webpack/目录下面的html文件
src-webpack/*.html 文件 webpack 编译后将实时保存到 src/*.html 

## 使用 webpack
    
实时编译命令 `webpack --watch`

如果发现文件更改后内容没有更新，请重新运行命令 `webpack --watch` (目前该问题存在于个别文件系统)

