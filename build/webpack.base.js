const path = require('path');
const {
	VueLoaderPlugin
} = require('vue-loader');
const utils = require('./utils');

module.exports = {
	entry: path.resolve(__dirname, '../index.js'),
	target: 'web',
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			// vue: 'vue/dist/vue.runtime.min.js',
		}
	},
	module: {
		rules: utils.styleLoaders().concat([{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				transformToRequire: {
					video: ['src', 'poster'],
					source: 'src',
					img: 'src',
					image: 'xlink:href'
				}
			}
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'img/[name].[hash:7].[ext]'
			}
		},
		{
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'media/[name].[hash:7].[ext]'
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}])
	},
	plugins: [
		new VueLoaderPlugin()
	],
	node: false
};