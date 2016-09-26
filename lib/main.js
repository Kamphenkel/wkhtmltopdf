'use strict'

let os = require('os');
let childprocess = require('child_process');

module.exports = function(type,content,destination,args){
	if(!content){
		console.error("the html url/content is null");
		return;
	}

	if(typeof(destination) == "object"){
		args = destination;
		destination = os.tmpdir()+"/"+Date.now()+".pdf";
	}

	let options = [];
	for(var i in args){
		options.push("--"+i);
		options.push(args[i]);
	}
	options.push(content);
	options.push(destination);

	console.info(options);

	let process;

	if(type == "pdf"){
		process = childprocess.spawn("wkhtmltopdf",options);
	}else if(type == "image"){
		process = childprocess.spawn("wkhtmltoimage",options);
	}else{
		console.log("output type is not appoint");
	}

	process.stdout.on('data', (data) => {
  		console.log(`stdout: ${data}`);
	});
	
	process.stderr.on('data', (data) => {
  		console.log(`stdout: ${data}`);
	});

	process.on('close', (code) => {
  		console.log(`child process exited with code ${code}`);
	});

}