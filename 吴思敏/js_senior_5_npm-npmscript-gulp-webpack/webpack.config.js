var webpack = require('webpack');

module.exports = {
    entry: __dirname+'/js/entry.js',
    output: {
        path: __dirname+'/js',
        filename: 'bundle.js',
        publicPath:'js/'
    },
    module: {
        loaders: [
            {test: /\.css$/,loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg/, loader: 'svg-url-loader'}
        ]
    }
};
// module.exports = {
//     entry:__dirname+'/js/entry.js',
//     output: {
//         path: __dirname+'/js',  //输出文件夹
//         filename:'bundle.js'   //最终打包生成的文件名
//     },

//     //引用外部加载器
//     module: {
//          loaders: [
//              {
//                 test: /\.js|jsx$/,   //是一个正则，代表js或者jsx后缀的文件要使用 下面的loader
//                 loader: 'babel',
//                 query:{
//                     presets:['es2015']
//                 }
//              },

//              {
//                  test: /\.css$/,
//                  loaders: ['style', 'css'],
//              },
//              { 

//                 test: /\.(png)|(jpg)$/,

//                 loader: "url?limit=50000"

//              }

//             ]
//     }
// }