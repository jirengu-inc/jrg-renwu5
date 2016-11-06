app.get('/load', function(req, res) {
	var num = req.query.num,
		arr = []
	for(var i=1; i<num; i++){
		arr.push('card'+i)
	}
	res.send({
		msg: arr
	})
})
