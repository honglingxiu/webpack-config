/*
 * @Author: honglingxiu 
 * @Date: 2018-05-09 12:53:36 
 * @Last Modified by: honglingxiu
 * @Last Modified time: 2018-05-11 18:37:22
 */
var webpack=require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin=require("html-webpack-plugin");
/* const htmlWebpackPlugin =new HtmlWebpackPlugin({
    filename: 'view/index.html',
    template: './src/view/index.html',
    inject:true,
        hash:true,
        chunks:["base","index"]
}); */
const extractLESS = new ExtractTextPlugin({
    filename:'css/[name].css'
});
//封装静态页面模板
var getHtmlConfig=function(name){
    return new HtmlWebpackPlugin({
        filename: 'view/'+name+'.html',
        template: './src/view/'+name+'.html',
        inject:true,
            hash:true,
            chunks:["base",name]
    });
};
module.exports={
    entry:{
        "base":["./src/page/common/index.js"],
        "index":["./src/page/index/index.js"],
        "login":["./src/page/login/index.js"],        
    },
    output:{
        path:__dirname+"/dist",
        //publicPath:__dirname+"/dist",
        filename:"js/[name].js"
    },
    module:{
        rules: [
            {
              test: /\.(less|css)$/,
              use: extractLESS.extract({
                fallback: 'style-loader',
                use:[
                    'css-loader',
                    'autoprefixer-loader', 
                    'less-loader'  
                ]
              })
            },//打包图片
            {
                test:/\.(gif|png|jpg)\??.*$/,
                use:[
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 100,
                        name:"[name][hash:7].[ext]",
                        outputPath:"resources/images",
                        publicPath:"../resources/images"
                      }
                    }
                  ]
            },//打包字体
            {
                test:/\.(woff|svg|eot|ttf)\??.*$/,
                use:[
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 100,
                        name:"[name][hash:7].[ext]",
                        outputPath:"resources/fonts",
                        publicPath:"../resources/fonts"
                      }
                    }
                  ]
            }
          ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
             //公共块的块名称
             name: ["base"],//浏览器页面上使用的时候 common2 必须最先加载
            // filename:"common.js"//忽略则以name为输出文件的名字，
                //否则以此为输出文件名字
            minChunks: 2 //默认值
         }), 
         extractLESS,
         getHtmlConfig("index"),
         getHtmlConfig("login")
           
     ]
};