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
   	filename: '[name].[hash].bundle.js' //<- to name to nazwy zdefiniowane wyzej w entry
  	}
};