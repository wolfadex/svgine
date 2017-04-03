const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: 'dist/',
	},
	devServer: {
		compress: true,
		port: 9000,
	},
	resolve: {
		alias: {
			actions: path.resolve(__dirname, 'src/actions'),
			assets: path.resolve(__dirname, 'src/assets'),
			components: path.resolve(__dirname, 'src/components'),
			containers: path.resolve(__dirname, 'src/containers'),
			reducers: path.resolve(__dirname, 'src/reducers'),
			root: path.resolve(__dirname, 'src'),
			utils: path.resolve(__dirname, 'src/utils'),
		},
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!less-loader'
				})
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
	],
};
