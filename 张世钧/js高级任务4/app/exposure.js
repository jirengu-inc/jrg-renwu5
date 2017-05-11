/**
 * Created by 张钧 on 2017/5/7.
 */
var $ = require('jquery')
var Exposure = (function () {
    function exposure($node) {
        var clock;
        $(window).on('scroll', function () {


            if (clock) {
                clearTimeout(clock);
            }
            clock = setTimeout(function () {
                checkShow();
            }, 300);

        });


        checkShow();

        function checkShow() {
            $node.each(function () {
                var $cur = $(this);
                if ($cur.attr('isLoaded')) {
                    return;
                }

                if (isShow($cur)) {
                    showImg($cur);
                }
            });
        }

        function isShow($el) {
            var scrollH = $(window).scrollTop(),
                winH = $(window).height(),
                top = $el.offset().top;

            if (top < winH + scrollH) {
                return true;
            } else {
                return false;
            }
        }

        function showImg($el) {
            $el.css('opacity', 1);
            $el.attr('isLoaded', true);
        }
    }

    return exposure
})()
module.exports = Exposure;