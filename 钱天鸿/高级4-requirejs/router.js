app.get('/hello',function(req,res){
	console.log(req.query);
	var bigData = [
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170306/krBH-fycapec2043831.jpg",
						"short_name":"美国卫星为地球拍“艺术照”",
						"short_intro":"这组令人震撼的图片由美国航空航天局（NASA）和美国地质调查局的卫星拍摄。"
					},
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170305/3f5--fycapec1507952.jpg",
						"short_name":"日本海豹抱毛绒玩具玩耍",
						"short_intro":"一只叫做日和的海豹得到了一个毛绒玩具。"
					},
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170306/wh4x-fycapec2036704.jpg",
						"short_name":"迷你腊肠竟能牵马遛弯",
						"short_intro":"腊肠犬竟然能牵着是自己体型10倍大的赛马遛弯。"
					},
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170306/CJcw-fycapec2038442.jpg",
						"short_name":"红嘴鸥趁机“打劫”画面喜感",
						"short_intro":"红嘴鸥成群结队到岸上“打劫”，成为渔港码头上的热闹景观。"
					},
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170304/6kGN-fycapec0918744.jpg",
						"short_name":"新疆昭苏县发现罕见四角羊",
						"short_intro":"偶遇一只长着四只羊角的绵羊。"
					},
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170305/z98M-fycapec1510000.jpg",
						"short_name":"飞行员抓拍雷电击破积雨云",
						"short_intro":"当时飞机飞行在哥伦比亚亚马逊上空。"
					},	
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170303/PGo4-fycaafp1682928.jpg",
						"short_name":"神奇生物:水母如同飞碟",
						"short_intro":"揭示了多种深海世界的奇特生物。"
					},	
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170306/CJcw-fycapec2038442.jpg",
						"short_name":"红嘴鸥趁机“打劫”画面喜感",
						"short_intro":"红嘴鸥成群结队到岸上“打劫”，成为渔港码头上的热闹景观。"
					},
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170305/z98M-fycapec1510000.jpg",
						"short_name":"飞行员抓拍雷电击破积雨云",
						"short_intro":"当时飞机飞行在哥伦比亚亚马逊上空。"
					},	
					{
						"img_url":"http://n.sinaimg.cn/tech/transform/20170306/CJcw-fycapec2038442.jpg",
						"short_name":"红嘴鸥趁机“打劫”画面喜感",
						"short_intro":"红嘴鸥成群结队到岸上“打劫”，成为渔港码头上的热闹景观。"
					}
	];

	var sendData = [],
		curPage = req.query.curPage,
		perPageCount = req.query.perPageCount;

	for(var i=0;i<perPageCount;i++){
		sendData[i] = bigData[parseInt( Math.random()*bigData.length)]
	}
	console.log(sendData);
	
	res.send({
		"status":{"code":"0"},
		"data":sendData
	});

});