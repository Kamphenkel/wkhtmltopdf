# wkhtmltopdf

fork of https://github.com/YueHui/wkhtmltopdf with promise support

Example:


转换为pdf


```javascript
var wrapper = require("wkhtmltopdfWrapper");

wrapper.topdf("http://www.qq.com","./1.pdf",{
	"page-size":"A3"
})
```

转换为image

```javascript
var wrapper = require("wkhtmltopdfWrapper");

wrapper.toimage("http://www.baidu.com","./1.jpg",{
	"quality":"90"
})
```

[wkhtmltopdf](http://wkhtmltopdf.org/index.html)
