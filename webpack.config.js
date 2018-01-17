const path = require('path');

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
        	   // używamy jednocześnie 2 loaderów dla plików .css, można je tutaj równiez konfigórować jak wyzje z babel loaderem
        	   use: [ 'style-loader', 'css-loader' ]
        	},
        	{
        	   test: /\.scss$/,
        	   // css-loader can import them in .js files, style-loader will be usefull when including it to HTML file
        	   use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        	}
  	   ]
  	}
};