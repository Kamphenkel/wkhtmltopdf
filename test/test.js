var wkhtmltopdf = require("../index");

wkhtmltopdf.topdf("http://www.qq.com","./1.pdf",{
	"page-size":"A3"
})