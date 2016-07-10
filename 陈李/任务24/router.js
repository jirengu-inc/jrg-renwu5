/**
 * 发送 GET 请求， 无参数
 * GET /hello
 * 返回响应数据
 */
app.get('/load', function(req, res) {
	var start = req.query.start,
		len = req.query.len,
		sum = parseInt(len)+parseInt(start);
		arr = [];
	for( var i=start; i<sum; i++){
		arr.push('内容'+i);
	}
	res.send({
		arr: arr
	});
});
