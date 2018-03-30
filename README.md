# wkhtmltox-promise

A simple wrapper for wkhtmltopdf/wkhtmltoimage for ES 2016/2017 using promises.   Downloads
and installs the latest wkhtmtopdf lib (0.12.4) on linux.

## Installation:

npm i wkhtmltox-promise

## API:

	pdf(source, dest, options)
		returns Promise

	image(source, dest, options[, ignore])
		returns Promise

source = any valid URI

dest = any valid URI

options = (optional*) array of arguments passed to wkhtmltopdf / wkhtmltoimage
> see [https://wkhtmltopdf.org/usage/wkhtmltopdf.txt] for details.

ignore = (optional*) array( or object of keys) of errors, or string error to ignore in the child.  If
the substring in the childs stderr, the promise will resolve anyway.  This feature is intended to
support some wkhtmltox errors that don't prevent the pdf generation from succeeding, but nonetheless
report an exit status > 0 and would otherwise reject.

## Examples:

PDF
```javascript
const convert = require("wkhtmltox-promise");

convert.pdf("http://www.google.com", "out.pdf")
	.then(result => {
		var stdout = result.stdout;
        console.log('stdout: ', stdout);
		// do something with out.pdf
    })
    .catch(function (err) {
        console.error('ERROR: ', err, err.stderr);
    });
```

Image
```javascript
const convert = require("wkhtmltox-promise");

convert.image("http://www.google.com", "out.png")
	.then(result => {
		var stdout = result.stdout;
        console.log('stdout: ', stdout);
		// do something with out.png
    })
    .catch(function (err) {
        console.error('ERROR: ', err, err.stderr);
    });
```
Ignoring errors
```javascript
const convert = require("wkhtmltox-promise");

convert.pdf("http://www.google.com", "out.png", ['--quiet'], ['UnknownContentError'])
	.then(result => {
		var stdout = result.stdout;
        console.log('stdout: ', stdout);
		// do something with out.pdf
    })
    .catch(function (err) {
        console.error('ERROR: ', err, err.stderr);
    });
```

[wkhtmltopdf](http://wkhtmltopdf.org/index.html)
