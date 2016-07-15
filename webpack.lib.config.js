var config = require('./webpack.config.js')
var path = require('path')

config.entry = path.resolve('./src/SideBar/SideBar.js')
config.output = {
	filename: 'SideBar.js',
	path: path.resolve('./lib'),
	library: 'SideBar',
	libraryTarget: 'umd',
}

module.exports = config
