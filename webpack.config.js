
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var I18nPlugin = require("i18n-webpack-plugin");

var _watchPath = "./src-webpack/";
var _outputRoot = __dirname+"/src/";


var languages = {
	"en": require(_watchPath+"static/js/i18n/en.json")
	, "cn": require(_watchPath+"static/js/i18n/cn.json")
};

var entry = {
    "index": _watchPath+"/index.js"
    //, "list": _watchPath+"static/js/list.js"
    //, "view": _watchPath+"static/js/view.js"
};

var chunks = Object.keys(entry);

var config = {

    entry: entry

    , output: {
        path: _outputRoot + '/static/'
        , publicPath: "./static/"
        , filename: "js/[name].js"
        //, chunkFilename: 'js/[id].chunk.js' 
    }

    , module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
            , { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') }
            , { test: /\.json$/, loader: "json-loader" }
            , { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM&harmony" }
			, { test: /\.tpl$/, loader: "underscore-template-loader" }
			, { test: /\.jpg$/, loader: "file-loader" },
			, { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
			, { test: /\.git$/, loader: "file?name=[name].[ext]?[hash]" }
			, { test: /\.vue$/, loader: "vue-loader" }
        ]
    }
	, babel: {  
		presets: ['es2015', 'stage-0'],  
		plugins: ['transform-runtime']  
	}  
    , externals: {
        'react': 'React'
        , 'react-dom': 'ReactDOM'
        , 'jquery': '$'
        , 'zepto': '$'
    }
    , resolve: {
        extensions: ['', '.js', '.jsx']
        , alias: {
            'swfobject': __dirname + '/node_modules/swfobject-amd/swfobject.js'
        }

    }
    , plugins: [
        new webpack.ProvidePlugin({
          $:      "jquery"
          , jQuery: "jquery"
          , Zepto: "zepto"
          , React: "react"
          , ReactDOM: "react-dom"
        }),
        /*
        new CommonsChunkPlugin({
            name: 'vendors', 
            chunks: chunks, 
            minChunks: chunks.length 
        })
        , new ExtractTextPlugin( 'css/[name].css')
        , new webpack.HotModuleReplacementPlugin() 
        , new I18nPlugin(
            languages[ 'cn' ]
        )
        */
    ]
}

/* 为每个监听页面编译生成新的html文件 */
foreachFolder(_watchPath,function(list){
	for(var i = 0,item; item = list[i++];){
        var filename = item[0];
		if(/\.html$/.test(filename)){
            var name = filename.slice(0, -5);
            if( !( name in entry ) ) continue;
            config.plugins.push(new HtmlWebpackPlugin({ 
				filename: _outputRoot + name + '.html', 
				template: _watchPath + name + '.html', 
				inject: 'body', 
				hash: true, 
				chunks: ['vendors', name]
			}));
		}
	}
});


module.exports = config;

/* 遍历目录中的文件通过数组返回 */
function foreachFolder(path, cb){
    var folder_exists = fs.existsSync(path);
    var fileList = [];
    if(folder_exists == true)
    {
       var dirList = fs.readdirSync(path);
       dirList.forEach(function(fileName){
            fileList.push([fileName, path , path+fileName]);
       });
    };
    return cb(fileList);
}

