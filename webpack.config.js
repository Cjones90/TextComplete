var webpack = require("webpack");

module.exports = {
	entry: "./example.jsx",
	output: {
		path: "",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader' },
      { test: /\.jsx$/, loader: 'babel-loader' },

		]
	},

};
