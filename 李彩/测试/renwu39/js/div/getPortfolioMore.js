/**
 * Created by lxzd1 on 2016/11/5.
 */
define(["../lib/jquery.min"],function () {

    var getPortfolioMore=(function () {
        $(".loadMore").on("click",function () {
            $(".loadMore").text("正在加载...")
            getAndPlaceData();

        });


        var perPageCount=9,
            curPage=1;
        function getAndPlaceData() {
            $.ajax({
                url:"http://platform.sina.com.cn/slide/album_tech",
                dataType: 'jsonp',
                jsonp:"jsoncallback",
                data:{
                    app_key:"1271687855",
                    num: perPageCount,
                    page:curPage
                }
            }).done(function (ret) {
                if (ret && ret.status && ret.status.code === "0"){
                    placeData(ret.data);
                    $(".loadMore").text("点击加载更多");
                }else{alert("调用的新浪后台出现错误，请重试get ajax data error1")}

            })
            .fail(function () {
                    alert("从新浪获取数据失败，请重试get ajax data error2");
                    $(".loadMore").text("点击重试");
                })

        }

        //3、将获取的数据append到ul中 待图片加载完成，使用瀑布流的方式放置元素

        function placeData(nodelist) {
            var $nodes=renderData(nodelist);
            var arr=[];
            $nodes.find("img").each(function () {
                var defer = $.Deferred();
                $(this).load(function () {
                    defer.resolve()
                });
                arr.push(defer)
            });

            $.when.apply(null,arr).done(function () {
                console.log("PORTFOLIO 区域图片加载全部完成！");
                waterFall($nodes)
            })

        }

        function renderData(data) {
            var str="",
                $nodes;
            for (var i=0;i<data.length;i++){
                str+='<li class="portfolioLi">';
                str+='<a href="'+data[i].url+'"><img src="'+data[i].img_url+'" alt=""></a>';
                str+='<h4>'+data[i].short_name+'</h4>';
                str+='<p>'+data[i].short_intro+'</p>';
                str+='</li>';
            }
            $nodes=$(str);
            $(".portfolioUl").append($nodes);
            return $nodes;
        }

        var widthNum=parseInt($(".ct").width()/$(".portfolioLi").outerWidth(true)),
            allHeight=[];

        for (var i=0;i<widthNum;i++){
            allHeight.push(0)
        }


        function waterFall($nodes) {

            $($nodes).each(function () {
                var $cur=$(this),
                    indx=0,
                    minAllHeight=allHeight[0];
                for (var j=0;j<allHeight.length;j++){
                    if (allHeight[j]<minAllHeight){
                        minAllHeight=allHeight[j];
                        indx=j;
                    }
                }

                $cur.css({
                    "left":indx*$cur.outerWidth(true),
                    "top":minAllHeight
                });
                allHeight[indx]=minAllHeight+$cur.outerHeight(true);
                $(".portfolioUl").height(Math.max.apply(null,allHeight));
            })
        }
        getAndPlaceData();

    }())



    return{  getPortfolioMore  }
})