'use strict';

let childprocess = require('child_process');

module.exports = function(content,options){
	if(!content){
		console.error("the html url/content is null");
		return;
	}

	let parameterArray = [];
	for(let i in options){
		parameterArray.push(i);
		parameterArray.push(options[i]);
	}

	childprocess.spawn("wkhtmltopdf",parameterArray)
}