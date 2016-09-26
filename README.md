# wkhtmltopdf
需要系统环境安装wkhtmltopdf，并添加到系统变量


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

具体参数可访问[wkhtmltopdf](http://wkhtmltopdf.org/index.html)官网查看