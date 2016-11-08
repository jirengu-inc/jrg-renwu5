/**
 * Created by lxzd1 on 2016/11/5.
 */
define(["../lib/jquery.min"],function () {

    var baoguang=(function () {
        var  clock;
        // function isVisible($node) {
        //     var scrollH=$(window).scrollTop(),
        //         winH=$(window).height(),
        //         nodeOffset=$node.offset().top;
        //
        //     if ((scrollH+winH)>=nodeOffset){
        //         return true
        //     }
        //     else {return false}
        // }
        function isVisible($node){
            var scrollH=$(window).height()+$(window).scrollTop(),
                selfDoc=$node.offset().top,
                selfH=$node.outerHeight(true);
            if (selfDoc < scrollH && scrollH < selfDoc+selfH ) {
                return true
            }
            else  return false
        }

        $(window).on("scroll",function () {
            if (clock){clearTimeout(clock)};
            clock=setTimeout(function () {
                location();
                showCheck();
            },100)
        })

        function showCheck() {

            $(".wrap-about").each(function () {
                var $cur=$(this);
                if (!isVisible($cur)||$cur.attr("isShowed")){
                    return
                }
                if (isVisible($cur)){
                    $cur.animate({"opacity":"1"},1500)
                    $cur.attr("isShowed",true)
                }
            })
        }
        function location() {
            $(".location").each(function () {
                var $cur1=$(this),
                    num=$cur1.index();
                if (!isVisible($cur1)){
                    $(".nav li").eq(num).find("a").removeAttr("style");
                     return
                }
                if (isVisible($cur1)){
                  $(".nav li").eq(num).siblings().find("a").removeAttr("style");
                  $(".nav li").eq(num).find("a").css("background-color", "#fed136");
                }



            })

        }


    }())
    return {baoguang};
});