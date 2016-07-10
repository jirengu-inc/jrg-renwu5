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
