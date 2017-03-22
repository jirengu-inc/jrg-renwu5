/**
 * Created by 张钧 on 2017/3/6.
 */
app.get('/loadmore',function(req,res){
    var curIdx = req.query.idx
    var len = req.query.len
    var data = []
    for (var i=0;i<len;i++){
        data.push('内容' + (parseInt(curIdx) + i))
    }
    res.send(data)
})
