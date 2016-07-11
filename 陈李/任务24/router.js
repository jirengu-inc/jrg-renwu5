app.get('/load', function(req, res) {
	var start = req.query.start,
		len = req.query.len,
		arr = [];
	for(var i=0; i<len;i++){
		sum = parseInt(start)+i;
		arr.push('内容'+sum);
	}
	res.send({
		status: 0,
		msg: arr
	});
});

/**
 * 发送 POST 请求， 有参数
 * POST /comment
 * query = { comment: "这是评论内容" }
 */
app.post('/check', function(req, res) {
	var username = req.body.username,
		password = req.body.pwd2,
		checked;
	if(username === 'hunger'){
		checked = 1;
	}
	else{
		checked = 0;
	}
	res.send({
		status: checked,
	});
});
