'use strict'

const path = require('path');
const pspawn = require('child-process-promise').spawn;

const wkhtmltopdf = path.resolve(__dirname, '.bin', 'wkhtmltox', 'bin', 'wkhtmltopdf');
const wkhtmltoimage = path.resolve(__dirname, '.bin', 'wkhtmltox', 'bin', 'wkhtmltoimage');

function convert (type, source, destination, args) {
	return new Promise(function(resolve, reject) {
		if (!type || !["pdf","image"].includes(type)){
			return reject(new Error("A conversion type must one of ['pdf', 'image']!"));
		}

		if (!source){
			return reject(new Error("An html source URI must be provided!"));
		}

		if (!destination){
			return reject(new Error("An output destination URI must be provided!"));
		}

		let options = [].concat(args).filter(v => !!v);

		options.push(source);
		options.push(destination);


		let promise;

		switch (type) {
			case "pdf":
				promise = pspawn(wkhtmltopdf, options, { capture: [ 'stderr' ], shell: true});
				break;
			case "image":
				promise = pspawn(wkhtmltoimage, options, { capture: [ 'stderr' ], shell: true});
				break;
		}


		promise.then(resolve).catch(reject);
	});
}

module.exports = {
	pdf: (content,destination,args) => {
		return convert("pdf",content,destination,args);
	},
	image: (content,destination,args) => {
		return convert("image",content,destination,args);
	}
};
