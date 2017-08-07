define(["jquery"],function($){
    return Carousel=(function(){
        function Carousel($ct){
            this.$ct=$ct
            this.init()
            this.bind()
            // this.setBullet()

        }
         Carousel.prototype.init=function(){
            var $cts=this.$cts=this.$ct.find('.items'),
           
            $img=this.$img=this.$ct.find('.items>li'),
            // $imgCount=$img.length,
            // $img.width()=$img.width(),
            // console.log($imgWidth)
            $preBtn=this.$preBtn=this.$ct.find('.pre'),
            $nextBtn=this.$nextBtn=this.$ct.find('.next'),
            $bullets=this.$bullets=this.$ct.find('.bullet li')
            this.pageIndex=0
            //防止重复点击
            this.isAnimate=false

            
        $cts.append($img.first().clone())
        $cts.prepend($img.last().clone())

         //items的宽度不要固定，容易导致li不能并排，在js里计算，li并排
        $cts.width(($img.length + 2)*$img.width())
        //让第一张图片默认展示
        $cts.css({left:-$img.width()})
            
        }

        Carousel.prototype.bind=function(){
            var _this=this
            this.$preBtn.click(function(){
            _this.playPre(1)

        })
        this.$nextBtn.click(function(){
            _this.playNext(1)
        })

        }
// debugger;
        Carousel.prototype.playNext=function(len){
            var _this=this
            if(this.isAnimate) return
            this.isAnimate = true
            this.$cts.animate({
                left:"-="+'1350px'
            },function(){
                _this.pageIndex += len
                if(_this.pageIndex === _this.$img.length){
                    _this.pageIndex=0
                    _this.$cts.css({left:-_this.$img.width()})
                }


                _this.setBullet()
                _this.isAnimate=false
            })
            

        }
        Carousel.prototype.playPre=function(len){
            var _this=this
             if(this.isAnimate) return
            this.isAnimate = true
            this.$cts.animate({
                left:"+="+'1350px'
            },function(){
                _this.pageIndex -= len
                if(_this.pageIndex<0){
                    _this.pageIndex=_this.$img.length-1
                    _this.$cts.css({left:-_this.$img.length*_this.$img.width()})
                }
                _this.setBullet()
                _this.isAnimate=false
            })
        }

        
        
       Carousel.prototype.setBullet=function(){
       

        this.$bullets.removeClass('active')
            .eq(this.pageIndex)
            .addClass('active')

       }
       new Carousel($('.carousel').eq(0))

    })
})
