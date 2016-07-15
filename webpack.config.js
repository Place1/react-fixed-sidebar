const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'App.js',
		publicPath: '/dist/',
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /(node_modules|bower_components)/,
			query: {
				presets: ['es2015', 'react', 'stage-0'],
				plugins: ['transform-decorators-legacy']
			}
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	},
	devServer: {
		port: 8000
	}
};
