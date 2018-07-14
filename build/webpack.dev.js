const path = require('path');
const webpackBase = require('./webpack.base');
const HtmlWepackPlugin = require('html-webpack-plugin');
const config = require(path.resolve(process.cwd(), 'config.json'));

webpackBase.plugins.push(
	new HtmlWepackPlugin({
		title: 'Development Desktop UI',
		template: path.resolve(__dirname, './template/index.html'),
	})
);

module.exports = Object.assign({}, webpackBase, {
	entry: {
		bundle: [
			path.resolve(__dirname, '../test/index.js')
		]
	},
	mode: 'development',
	devtool: 'inline-source-map',
	output: {

	},
	serve: {
		port: 8081,
		host: config.serve.host,
	}
});