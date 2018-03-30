"use strict";

// jshint mocha:true
// jshint expr:true

const path = require('path');
const expect = require('chai').expect;
const should = require('chai').should();
const convert = require("../index");

describe('wkhtmltox-promise', function(){

	it("provides an object interface with callable methods", function() {
		expect(convert)
			.to.be.a('object').and
			.not.to.be.null;
	});

	it("exposes the expected methods .pdf(), .image()", function() {
		expect(convert)
			.to.be.a('object').and
			.to.have.all.keys(["pdf","image"]);

		expect(convert.pdf)
			.to.be.a('function');

		expect(convert.image)
			.to.be.a('function');
	});

	it("pdf method returns a promise", function() {
		expect(convert.pdf().catch(e => /* swallow UnhandledPromiseRejectionWarning: */ !!e))
			.to.be.an.instanceof(Promise);
	});

	it("image method returns a promise", function() {
		expect(convert.image().catch(e => /* swallow UnhandledPromiseRejectionWarning: */ !!e))
			.to.be.an.instanceof(Promise);
	});

	it("rejects the promise when source or destination are missing", async function() {
		try {
			let result = await convert.pdf();
			should.not.exist(result);
		} catch(e) {
			expect(e)
				.to.be.an.instanceof(Error);

			expect(e.message)
				.to.have.string('source URI must be provided');
		}

		try {
			let result = await convert.pdf('./input.html');
			should.not.exist(result);
		} catch(e) {
			expect(e)
				.to.be.an.instanceof(Error);

			expect(e.message)
				.to.have.string('destination URI must be provided');
		}
	});

	it("rejects the promise when the child process has errors", async function() {
		try {
			let result = await convert.pdf('file:///test.html', 'out.pdf');
			should.not.exist(result);
		} catch(e) {
			expect(e)
				.to.be.an.instanceof(Error).and
				.to.have.all.keys(["childProcess","code","name","stderr","stdout"]);

			expect(e.message)
				.to.have.string('failed with code');

			expect(e.stderr)
				.to.have.string('Failed loading page');
		}
	});

	it('creates a pdf', async function() {
		let source = path.resolve(__dirname, 'in.html');
		let dest = path.resolve(__dirname, 'out.pdf');

		let result = await convert.pdf(source, dest)
			.catch(e => {
				throw new Error(e.message, e.stderr);
			});

		expect(result)
			.to.exist.and
			.to.be.an('object').and
			.not.to.be.null;
	});

	it('creates a image', async function() {
		let source = path.resolve(__dirname, 'in.html');
		let dest = path.resolve(__dirname, 'out.png');

		let result = await convert.image(source, dest)
			.catch(e => {
				throw new Error(e.message, e.stderr);
			});

		expect(result)
			.to.exist.and
			.to.be.an('object').and
			.not.to.be.null;
	});
it('creates a pdf', async function() {
		let source = path.resolve(__dirname, 'in.html');
		let dest = path.resolve(__dirname, 'out.pdf');

		let result = await convert.pdf(source, dest)
			.catch(e => {
				throw new Error(e.message, e.stderr);
			});

		expect(result)
			.to.exist.and
			.to.be.an('object').and
			.not.to.be.null;
	});
	it('creates a pdf using footer html', async function() {
		let ftr = path.resolve(__dirname, 'foot.html');
		let source = path.resolve(__dirname, 'in.html');
		let dest = path.resolve(__dirname, 'out.pdf');
		let args = [
			'--margin-bottom "10mm"',
			`--footer-html "file://${ftr}"`
		];

		try {
			let result = await convert.pdf(source, dest, args);

			expect(result)
				.to.exist.and
				.to.be.an('object').and
				.not.to.be.null;
		} catch(e) {
			console.error(e.stderr);
			throw e;
		}
	});

	it('ignores some stderr errors', async function() {
		let source = path.resolve(__dirname, 'err-in.html');
		let dest = path.resolve(__dirname, 'out.pdf');

		let result = await convert.pdf(source, dest, null, 'ContentNotFoundError')
			.catch(e => {
				throw new Error(e.message, e.stderr);
			});

		result = await convert.pdf(source, dest, null, [ 'UnknownContentError', 'ContentNotFoundError' ])
			.catch(e => {
				throw new Error(e.message, e.stderr);
			});

		expect(result)
			.to.exist.and
			.to.be.an('object').and
			.not.to.be.null;
	});
});
