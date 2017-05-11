var path = require('path')
module.exports = {
    entry:'./index.js',
    output:{
        path:path.resolve(__dirname,'./bin'),
        filename:'bundle.js'
    }
}