/**
 * Created by 张钧 on 2017/3/14.
 */
app.get('/getPhoto',function (req,res) {
    var nPhoto = ['image/1.JPG', 'image/2.JPG','image/3.JPG','image/4.JPG']
    var data = []
    var index = parseInt(Math.random() * nPhoto.length)
    data.push(nPhoto[index])
    res.header("Access-Control-Allow-Origin",'http://a.test.com:8080')
    res.send(data)
})