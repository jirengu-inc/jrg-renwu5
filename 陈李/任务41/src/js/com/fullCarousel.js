define(['jquery'],function($){

    var Carousel ={

        init: function (){
            this.show = $('.show')
            this.items = $('.show').children()
            this.pre = $('.pre')
            this.next = $('.next')
            this.bullet = $('.bullet')
            this.imgWidth = $(window).width()
            this.imgCount = this.items.length
            this.realCount = this.imgCount+2
            this.curIdx = 0
            this.isAnimate = false

            this.show.prepend( this.items.last().clone() )
            this.show.append( this.items.first().clone() )
            this.show.find('li').css('width', this.imgWidth)
            this.show.find('.cover').css('width', this.imgWidth)
            this.show.css({
                left: -this.imgWidth,
                width: this.realCount* this.imgWidth
            })
        },

        bind: function (){
            var _this = this
            _this.pre.on('click',function(){
                _this.playPre()
            })
            _this.next.on('click',function(){
                _this.playNext()
            })
            _this.bullet.find('li').on('click',function(){
                var idx = $(this).index()
                if(idx< _this.curIdx){
                    _this.playPre(_this.curIdx- idx)
                }
                else{
                    _this.playNext(idx- _this.curIdx)
                }
            })
        },

        playNext: function (idx){
            var _this = this
            idx = idx|| 1
            if(!this.isAnimate){
                this.isAnimate = true
                _this.stopPlay()
                _this.loadImg(_this.curIdx+ 2)
                this.show.animate({
                    left: '-='+(_this.imgWidth* idx)
                },function(){
                    _this.curIdx = (_this.curIdx+ idx )% _this.imgCount
                    if(_this.curIdx === 0){
                        _this.show.css({
                            left: -_this.imgWidth
                        })
                    }
                    _this.autoPlay()
                    _this.isAnimate = false
                    _this.setBullet()
                })
            }
        },

        playPre: function(idx){
            var _this = this
            idx = idx||1
            if(!_this.isAnimate){
                _this.isAnimate = true
                _this.stopPlay()
                _this.loadImg(_this.curIdx)
                _this.show.animate({
                    left: '+='+ (_this.imgWidth* idx)
                },function(){
                    _this.curIdx = (_this.imgCount + _this.curIdx - idx)% _this.imgCount
                    if(_this.curIdx === (_this.imgCount-1)){
                        _this.show.css({
                            left: -_this.imgWidth* _this.imgCount
                        })
                    }
                    _this.autoPlay()
                    _this.isAnimate = false
                    _this.setBullet()
                })
            }
        },

        setBullet: function(){
            this.bullet.children().removeClass('active').eq(this.curIdx).addClass('active')
        },

        autoPlay: function(){
            var _this = this
            this.clock = setInterval(function(){
                _this.playNext()
            },2000)
        },

        stopPlay: function(){
            clearInterval(this.clock)
        },

        loadImg: function(idx){
            var _this = this
            idx = idx || 0
            _this.node = _this.show.children().eq(idx)
            _this.img = _this.node.find('.cover')
            _this.imgUrl = _this.img.attr('data-img')
            if(_this.node.data('hasImg')){
                return
            }
            _this.img.css('background-image', 'url('+_this.imgUrl+')')
            _this.node.data('hasImg',true)
        },

        open: function(){
            this.init()
            this.bind()
            this.loadImg(1)
            this.autoPlay()
        }
    }

    return Carousel
})