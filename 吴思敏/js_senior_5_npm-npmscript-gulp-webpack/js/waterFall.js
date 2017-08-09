
    
    function waterFall() {
        // $('.waterFall_ct').css('min-height', 1000);
        var nodeWidth = $('.waterFall_ct .item').width();
        var itemArr = [];
        var colLength = parseInt($('.waterFall_ct').width() / nodeWidth);

        for (var i = 0; i < colLength; i++) {
            itemArr[i] = 0;
        }

        $('.waterFall_ct .item').each(function(index, el) {
            var minValue = Math.min.apply(null, itemArr);
            var minIndex = itemArr.indexOf(minValue);

            $(this).css({
                top: itemArr[minIndex],
                left: $(this).outerWidth(true) * minIndex
            });

            itemArr[minIndex] += $(this).outerHeight(true);
        });
        console.log(itemArr);

        var maxHeight = Math.max.apply(null, itemArr);

        $('.waterFall_ct').css('height', maxHeight);
    }

       waterFall();
