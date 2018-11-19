const path = require('path');
const webpack = require('webpack');  // tutaj sa pluginy webpacka
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // dodatkowo zainstalowany plugin (yarn add --dev extract-text-webpack-plugin)
// const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {	
  	entry: {
		// podstawowy plik w ktorym moga byc zawarte inne importy, rowniez zostana zalaczone do bundla
  		main: './assets/js/main.js',
  		// mozna zdefiniowac inne pliki i je wywołać osobno
  		contact: './assets/js/contact.js'
  	},
  	output: {
   	path: path.resolve(__dirname, './dist'),
   	filename: '[name].bundle.js' //<- to name to nazwy zdefiniowane wyzej w entry, mozna dac np [name].[hash].bundle.js
  	},
  	// ponizej dodatkowe loadery i ich konfiguracja
  	module: {
  	   rules: [
  	   	{
	   	// wszystkie pliki spelniajace wyrazenie będą przechodzily przez loadera
        	test: /\.js$/,
        	// a te będą pomijane
        	exclude: /node_modules/,
	        	use: {
	            loader: 'babel-loader',
	            options: {
	            	presets: ['env']
	            }
	         }
        	},
        	{
        	   test: /\.css$/,
        	   use: ExtractTextPlugin.extract({
        	   	fallback: 'style-loader',
        	   	use: 'css-loader'
        	   })
        	},
        	{
        	   test: /\.scss$/,
        	   // css-loader can import them in .js files, style-loader will be usefull when including it to HTML file
        	   use: ExtractTextPlugin.extract({
        	   	fallback: 'style-loader',
        	   // używamy jednocześnie kilku loaderów dla plików .scss, można je tutaj równiez konfigurować jak wyzje z babel loaderem
        	   	use: ['css-loader', 'sass-loader' ]
        	   })
        	   // use: [ 'style-loader', 'css-loader', 'sass-loader' ] <- tak wyglądało bez użycia pluginu "ExtractTextPlugin", bez fallback i extract
        	},
        	{
     	      test: /\.(png|jpg|gif)$/,
     	      use: [
     	        {
     	          loader: 'url-loader',
     	          options: {
     	            limit: 8192
     	          }
     	        }
     	      ]
        	}
  	   ]
  	},
  	plugins: [
  		// importujemy z pakietów zdefiniowanych u samej góry
  		// ten plugin dzieli dodatkowe bundle które mozna zalaczyć na kazdej podstronie jako wymagany przez wszystkie bundle
  	   new webpack.optimize.CommonsChunkPlugin({
  	      name: 'vendor',
  	      filename: 'vendor.bundle.js'
  	   }),
  	   new webpack.optimize.UglifyJsPlugin({
  	      beautify: true,
  	      comments: false
  	   }),
  	   new ExtractTextPlugin({
  	      filename: '[name].bundle.css'
  	   })
  	   // new HtmlWebpackPlugin() // <- do generowania pliku index.html, w którym automatycznie załączane są odpowiednie “bundle” (zarówno JS jak i CSS)
  	]
};
