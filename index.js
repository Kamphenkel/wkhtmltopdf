'use strict';

let main = require('./lib/main');

let wkhtmltopdf = function(content,destination,args){
	main("pdf",content,destination,args);
}

let wkhtmltoimage = function(content,destination,args){
	main("image",content,destination,args);
}

module.exports = {
	topdf:wkhtmltopdf,
	toimage:wkhtmltoimage
}