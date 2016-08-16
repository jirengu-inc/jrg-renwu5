var Carousel = (function(){

    function Carousel($node){
        this.imgCt = $node.find('.ct')
        this.item = this.imgCt.find('li')
        this.itemWidth = this.item.width()
        this.itemCount = this.item.size()
        this.pre = $node.find('.pre')
        this.next = $node.find('.next')
        this.bullet = $node.find('.bullet')

        this.imgCt.prepend(this.item.last().clone())
        this.imgCt.append(this.item.first().clone())

        this.newItemCount = $node.find('.ct').children().size()
        this.imgCt.css({
            width: this.newItemCount* this.itemWidth,
            left: -this.itemWidth,
        })

        this.curIdx = 0
        this.isAnimate = false

        this.init()
    }

    Carousel.prototype = {
        bind: function(){
            var _this = this
            _this.pre.on('click',function(){
                _this.doPre()
            })
            _this.next.on('click',function(){
                _this.doNext()
            })
            _this.bullet.find('li').on('click',function(){
                var idx = $(this).index()
                if(idx<_this.curIdx){
                    _this.doPre(_this.curIdx- idx)
                }
                else{
                    _this.doNext(idx- _this.curIdx)
                }
            })
        },

        doPre: function(idx){
            var _this = this
            idx = idx || 1
            if(!_this.isAnimate){
                _this.isAnimate = true
                _this.stop()
                _this.imgCt.animate({
                    left: '+=' + _this.itemWidth* idx
                },function(){
                    _this.curIdx = (_this.itemCount+ _this.curIdx- idx)% _this.itemCount
                    if(_this.curIdx === _this.itemCount- 1){
                        _this.imgCt.css('left', -_this.itemCount* _this.itemWidth)
                    }
                    _this.auto()
                    _this.setBullet()
                    _this.isAnimate = false
                })
            }
        },

        doNext: function(idx){
            var _this = this
            idx = idx || 1
            if(!_this.isAnimate){
                _this.isAnimate = true
                _this.stop()
                _this.imgCt.animate({
                    left: '-=' + _this.itemWidth* idx
                },function(){
                    _this.curIdx = (_this.curIdx+ idx)% _this.itemCount
                    if(_this.curIdx === 0){
                        _this.imgCt.css('left', -_this.itemWidth)
                    }
                    _this.auto()
                    _this.setBullet()
                    _this.isAnimate = false
                })
            }
        },

        setBullet: function(){
           this.bullet.children().removeClass('active').eq(this.curIdx).addClass('active') 
       },

        auto: function(){
            var _this = this
            this.clock = setInterval(function(){
                        _this.doNext()
                    },2000)
        },

        stop: function(){
            clearInterval(this.clock)
        },

        init: function(){
            this.bind()
            this.auto()
        }

    }

    return Carousel

})()