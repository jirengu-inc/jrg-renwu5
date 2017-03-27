/**
 * Created by 张钧 on 2017/3/26.
 */
app.get('/loadmore', function(req, res){

    var start = parseInt(req.query.start),
        len = parseInt(req.query.len);
    console.log('start: ' + start);
    console.log('len: ' + len);
    var data = [];
    for(var i = start; i < start + len; i++ ){
        data.push('内容' + i);
    }
    res.send({
        status: 1,
        data: data
    })
})
