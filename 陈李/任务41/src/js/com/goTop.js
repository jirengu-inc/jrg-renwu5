define(['jquery'],function($){

    function goTop($ct){
        this.ct = $ct
        this.target = $('<div>TOP</div>')
        this.create()
        this.bind()
    }

    goTop.prototype.create = function(){
        this.ct.append(this.target)
        this.target.hide()
    }

    goTop.prototype.bind = function(){
        var _this = this
        this.target.on('click',function(){
            $(window).scrollTop(0)
        })
        $(window).on('scroll',function(){
            var offsetTop = $(window).scrollTop()
            if(offsetTop> 300){
                _this.target.show()
            }
            else{
                _this.target.hide()
            }
        })
    }

    return goTop
})