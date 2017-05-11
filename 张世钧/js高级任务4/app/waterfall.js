/**
 * Created by 张钧 on 2017/5/7.
 */
// http://platform.sina.com.cn/slide/album_tech
var $ = require('jquery')
var water = (function () {
    function waterFall($data) {
        var curPage = 1,
            PageCount = 9;

        function loadAndPlace() {
            $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',
                jsonp: 'jsoncallback',
                data: {
                    app_key: '1271687855',
                    num: PageCount,
                    page: curPage
                }
            }).done(function (ret) {
                console.log(ret)
                if (ret && ret.status && ret.status.code == '0') {
                    console.log(ret.data)
                    place(ret.data);
                } else {
                    console.log('get wrong data');
                }
            });
            curPage++
        }

        loadAndPlace();

        $('#load').on('click', function () {
            loadAndPlace();
        })

        function place(nodeList) {
            console.log(1)
            var $node = renderData(nodeList),
                defereds = [];
            $node.find('img').each(function () {
                console.log(333)
                var defer = $.Deferred();
                console.log(this)
                $(this).load(function () {
                    defer.resolve();
                })
                defereds.push(defer);
            })
            console.log($)
            $.when.apply(null, defereds).done(function () {
                waterFallPlace($node);
            })
        }

        function renderData(items) {
            console.log(1111)
            var tpl = '',
                $node;
            for (var i = 0; i < items.length; i++) {
                tpl += '<li class="item">';
                tpl += ' <a href="' + items[i].url + '" class="link"><img src="' + items[i].img_url + '" alt=""></a>';
                tpl += ' <h4 class="header">' + items[i].short_name + '</h4>';
                tpl += '<p class="desp">' + items[i].short_intro + '</p>';
                tpl += '</li>';
            }
            $node = $(tpl);
            $data.append($node);
            return $node;
        }

        var colSumHeight = [],
            nodeWidth = $data.find('.item').outerWidth(true),
            colNum = parseInt($data.width() / nodeWidth);
        for (var i = 0; i < colNum; i++) {
            colSumHeight.push(0)
        }
        function waterFallPlace($nodes) {
            console.log(111111111)
            $nodes.each(function () {
                var $cur = $(this),
                    idx = 0,
                    minSumHeight = colSumHeight[0];


                for (var i = 0; i < colSumHeight.length; i++) {
                    if (colSumHeight[i] < minSumHeight) {
                        minSumHeight = colSumHeight[i];
                        idx = i;
                    }
                }

                $cur.css({
                    top: minSumHeight,
                    left: idx * nodeWidth,
                    opacity: 1
                })

                colSumHeight[idx] += $cur.outerHeight(true);
                $data.height(Math.max.apply(null, colSumHeight));
            })
        }
    }

    return waterFall
})()

module.exports = water;
// var newWaterfall=(function(){
//     function Waterfall(){
//         this.perPageCount=6
//         this.curPage=1
//         this.init()
//         this.bind()
//     }
//
//     Waterfall.prototype.init=function(){
//         this.item_img=$("#item_img")
//         this.item=$(".item")
//         this.load=$("#load")
//         this.onloading=function(){
//             var _this=this
//             $.ajax({
//                 type:"get",
//                 url:"http://platform.sina.com.cn/slide/album_tech",
//                 dataType:"jsonp",
//                 jsonp:"jsoncallback",
//                 async: true,
//                 data: {
//                     app_key: '1271687855',
//                     num: _this.perPageCount, //每页有几
//                     page: _this.curPage      //当前页数
//                 },
//                 success: function(json){
//                     //  console.log(json);
//                     if(json && json.status.code==="0"){
//                         //后台回传的是字符串，如有传回有内容且status.code的值=0则成功
//                         $("#load").on("click",function(){
//                             _this.rebuild(json.data)
//                         })
//                         _this.curPage += 1//元素拼装后改写请求的页数，下次请求第2页
//                         // console.log(curPage)
//                     }
//                 },
//                 error: function(){
//                     alert('error');
//                 }
//             })
//         }
//     }
//     Waterfall.prototype.ondisplay=function(){
//         this.$winH=$(window).height(),
//             this.$scrollTop=$(window).scrollTop()
//         this.$nodeH=$("#load").offset().top
//         if(this.$winH+this.$scrollTop>this.$nodeH){
//             // console.log($scrollTop+" "+$nodeH)
//             return true
//         }else{
//             return false
//         }
//
//     }
//     Waterfall.prototype.rebuild=function(resdata){
//         var _this=this
//         this.node=''
//         for(var i=0;i<resdata.length;i++){
//             this.node +='<li class="item">'
//             this.node +='<a href="'+resdata[i].url+'" class="link"><img src="'+resdata[i].img_url+'"/></a>'
//             this.node +='<h4 class="item-header">'+resdata[i].short_name+'</h4>'
//             this.node +='<p class="description">'+resdata[i].short_intro+'</p></li>'
//         }
//         this.$node=$(this.node)
//         _this.item_img.append($(this.$node))
//         // console.log($node)//jsonp获取的数据返回的内容拼装成html元素
//         setTimeout(function(){
//             _this.render()//请求的jsonp文件拼装完成后，延迟一段时间再开始瀑布流排列，不然一开始页面会错乱
//         },300)
//     }
//
//     Waterfall.prototype.render=function(){
//         var _this=this
//         _this.$nodewidth=$(".item").outerWidth(true);
//         _this.$windowwidth=$(window).width();
//         _this.$imgnum=parseInt(_this.$windowwidth/_this.$nodewidth);
//         _this.imgarr=[]
//         for(var i=0;i<_this.$imgnum;i++){
//             _this.imgarr.push(0)
//         }
//
//         $(".item").each(function(){
//             var $cur=$(this)
//             _this.idx=0
//             _this.minheight=_this.imgarr[0]
//             for(var i=0;i<_this.imgarr.length;i++){
//                 if(_this.imgarr[i]<_this.minheight){
//                     _this.idx=i;
//                     _this.minheight=_this.imgarr[i]
//                 }
//             }
//             // console.log(_this.minheight+"   "+_this.idx)
//             $cur.css({left:_this.idx*_this.$nodewidth,
//                 top:_this.minheight})
//             _this.imgarr[_this.idx]=_this.imgarr[_this.idx]+$cur.outerHeight(true)
//             $("#item_img").css({height:_this.imgarr[_this.idx]})/*ul容器内的li元素绝对定位后,
//              ul如果没有指定高度，里面的元素focuse元素会跑到最顶上去，所以每次加载元素后要
//              把ul容器的高度指定为当前li列中高度合计中最大的那个，也就是最后那个加载元素所在的列的总高度*/
//         })
//     }
//
//     Waterfall.prototype.bind=function(){
//         var _this=this
//         _this.clock
//         $(window).on("scroll",function(){
//             if(_this.clock){
//                 clearTimeout(_this.clock)
//             }
//             _this.clock=setTimeout(function(){
//                 if(_this.ondisplay()){
//                     _this.onloading()
//                 }
//             },300)
//         })
//     }
//
//
//     return {
//         newwaterfall:function(){
//             new Waterfall()
//         }
//     }
// })()
// //不用模块定义时，只在js文件中调用使用newWaterfall.newwaterfall()调用，即申明的立即执行函数（newWaterfall）.返回对象（newwaterfall()）
// //return newWaterfall requirejs定义模块后一定要返回内容（接口），这里返回的是定义模块中的函数名，在主模块加载时仍然用.newwaterfall()方法调用
// module.exports=newWaterfall;