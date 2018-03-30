'use strict'

const path = require('path');
const pspawn = require('child-process-promise').spawn;

const wkhtmltopdf = path.resolve(__dirname, '.bin', 'wkhtmltox', 'bin', 'wkhtmltopdf');
const wkhtmltoimage = path.resolve(__dirname, '.bin', 'wkhtmltox', 'bin', 'wkhtmltoimage');

function convert (type, source, destination, args, ignore) {

	const ignoreErrorsList = [];

	function setIgnore(message) {
		if (typeof message === 'string' && message) {
			ignoreErrorsList.push(message);
		}
	}

	if (typeof ignore === 'string') {
		setIgnore(ignore);
	}

	if (typeof ignore === 'object' && ignore) {
		ignore.entries(([key, val]) => !!val && setIgnore(key));
	}

	if (Array.isArray(ignore)) {
		ignore.map(setIgnore);
	}

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

		if (!source.match(/^(file|http|https):\/\//, '')) {
			source = 'file://'+source;
		}

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

		promise.then(resolve)
			.catch(err => {
				console.warn(`ChildProcess: wkhtmlto${type}`, err.stderr);
				if (ignoreErrorsList.some(msg => err.stderr.includes(msg))) {
					return resolve(err.childProcess);
				}
				reject(err);
			});
	});
}

const api = {
	pdf: (content,destination,args,ignore) => {
		return convert("pdf",content,destination,args,ignore);
	},
	image: (content,destination,args,ignore) => {
		return convert("image",content,destination,args,ignore);
	}
};

module.exports = Object.freeze(api);
