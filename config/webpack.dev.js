const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: ['react-hot-loader/patch', './src/newtab/'],
	devServer: {
		hotOnly: true,
		port: 9000,
	},
});
