/**
 * Created by lxzd1 on 2016/11/5.
 */
define(["../lib/jquery.min"],function () {

    var Carousel=(function () {
        var bgLiWidth=$(".ct-bg").children().width(),
            clock=false,
            nextClock=false,
            $bgLi=$(".ct-bg").children(),
            bgCount=$bgLi.size();

        $(".ct-bg").append($bgLi.first().clone());
        $(".ct-bg").prepend($bgLi.last().clone());
        bgTrueCount=$(".ct-bg").children().length;
        $(".ct-bg").css({"left":0-bgLiWidth,"width":bgTrueCount*bgLiWidth});
        $(".ct-bg").children().width(bgLiWidth);


        function showMe(num) {
            if (clock){return}
            clock=true;
            if (-1<num<bgCount){
                $(".ct-bottom").children().eq(num).css("border-bottom-color","white");
                $(".ct-bottom").children().eq(num).siblings().css("border-bottom-color","#555");
                $(".ct-bg").animate({left:"-"+bgLiWidth*(num+1)});

                isSetBgUrl();
                function isSetBgUrl() {
                    if ($(".bg").eq(num+1).data("setBgUrl"))  {return;}
                    else {trueBgUrl=$(".ct-bg .bg").eq(num+1).attr("data-bg");
                        $(".bg").eq(num+1).css("background-image",'url('+trueBgUrl+')');
                        $(".bg").eq(num+1).data("setBgUrl",true) ;
                    }
                }



            }
            if (num===bgCount){
                $(".ct-bg").animate({"left":"-"+bgLiWidth*(bgCount+1)},function () {
                    $(".ct-bg").css("left",0-bgLiWidth);
                });
                $(".ct-bottom").children().eq(0).css("border-bottom-color","white");
                $(".ct-bottom").children().eq(0).siblings().css("border-bottom-color","#555");

            }
            if (num===-1){
                $(".ct-bg").animate({"left":"0"},function () {
                    $(".ct-bg").css("left",0-bgLiWidth*bgCount);

                });
                $(".ct-bottom").children().eq(bgCount-1).css("border-bottom-color","white");
                $(".ct-bottom").children().eq(bgCount-1).siblings().css("border-bottom-color","#555");

            }

            myIndex=num;
            clock=false;
            nextClock=false;
            return myIndex;
        }

        function playNext() {
            if (myIndex===bgCount){
                myIndex=0;
                showMe(myIndex+1);
                return ;
            }
            showMe(myIndex+1);

        }

        function playPre() {

            if (myIndex===-1){
                myIndex=bgCount-2;
                showMe(myIndex);
                return ;
            }
            showMe(myIndex-1)
        }


        $(".next").on("click",function () {

            clearTimeout(timing);
            playNext();
            circulate();
        });

        $(".pre").on("click",function () {
            clearTimeout(timing);
            playPre();
            circulate();

        });

        showMe(0);
        circulate();


        function circulate() {
            timing=setTimeout(function () {
                playNext();
                circulate();
            },4000);
        }


        $(".ct-bottom").children().on("click", function () {
            clearTimeout(timing);
            var $cur = $(this),
                indexNum = $cur.index();
            if (indexNum===0){
                showMe(bgCount);
            }
            else   showMe(indexNum);
            circulate();
        });


    }());

    return {Carousel}

});