
    $.fn.stickUp = function(){

        this.each(function(){
            //获取位置信息
            var $nav = $(this),
                offsetTop = $nav.offset().top,
                offsetLeft = $nav.offset().left,
                height = $nav.height(),
                width = $nav.width();
            //克隆目标并设置css
            var $new = $nav.clone();
            $new.css({
                    width: width,
                    height: height,
                    position: 'fixed',
                    top: 0,
                    left: offsetLeft,
                    margin: 0
                });
            //监听滚动
            $(window).on('scroll',function(){
                var scrollTop = $(this).scrollTop();
                if( scrollTop>= offsetTop){
                    stick();
                }
                else {
                    unStick();
                }
            });
            //将目标设置不可见，插入fixed定位的新元素，不会改变文档结构
            function stick(){
                $nav.css('opcity', 0);
                $nav.append($new);
            }
            //移除克隆元素，目标设为可见
            function unStick(){
                $nav.css('opcity', 1);
                $new.remove();
            }
        });

    };
