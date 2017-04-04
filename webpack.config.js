'use strict'

var webpack = require('webpack')
var env = process.env.NODE_ENV

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux'
};

var ifvisibleExternal = {
  root: 'ifvisible.js',
  commonjs2: 'ifvisible.js',
  commonjs: 'ifvisible.js',
  amd: 'ifvisible.js'
};

var config = {
	externals: {
		'react': reactExternal,
		'react-redux': reactReduxExternal,
		'ifvisible.js': ifvisibleExternal,
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			},
		],
	},
	output: {
		library: 'ReactSVGine',
		libraryTarget: 'umd',
	},
	plugins: [
		{
			apply: function apply(compiler) {
				compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
						this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
						return false
					});
			}
		},
		// new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	]
};

if (env === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
				warnings: false
			}
		})
	)
}

module.exports = config
