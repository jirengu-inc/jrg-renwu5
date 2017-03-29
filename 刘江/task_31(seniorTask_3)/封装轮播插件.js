// 创造者
$.fn.slides = function(options) {
  this.each(function() {
    var element = this
    var slide = new Slide($(element), options)
  })
}

var Slide = function($element, options) {
  this.options = options
  this.$element = $element
  this.timer = null
  this.current = 0
  this.hover
  this.init()
}


Slide.prototype.init = function() {
  this.prepareHTML()
  this.bindEvents()
  if (this.options.auto) {
    this.autoPlay()
  }
}


Slide.prototype.prepareHTML = function() {
  var $art = this.$element
  var options = this.options
  var originLength = this.originLength = $art.children()
    .length
  var $firstToLast = $art.children()
    .first()
    .clone()
  var $lastToFirst = $art.children()
    .last()
    .clone()
  $firstToLast.appendTo($art)
  $lastToFirst.prependTo($art)
  var $pics = this.$pics = $art.children()
    .wrapAll('<div class=list></div>')
    .css({
      float: 'left'
    })
  var $img = $art.children()
    .find('img')
    .css({
      width: options.width
    })
  var $list = this.$list = $art.children()
    .wrapAll('<div class=viewpoint></div>')
  $list.css({
    width: $pics.length * options.width,
    overflow: 'hidden',
    position: 'relative',
    left: -options.width
  })
  var $viewpoint = $list.parent()
    .css({
      width: options.width,
      overflow: 'hidden'
    })
  var $prev = this.$prev = $('<button>prev</button>')
    .appendTo($art)
  var $next = this.$next = $('<button>next</button>')
    .appendTo($art)
}

Slide.prototype.bindEvents = function() {
  var self = this
  this.$prev.click(function() {
    self.next()
  })
  this.$next.click(function() {
    self.next()
  })
  this.$pics.mouseenter(function() {
      clearInterval(self.timer)
      self.hover = true
    })
    .mouseleave(function() {
      self.hover = false
      self.autoPlay()
    })


}


Slide.prototype.next = function() {
  this.go(this.current + 1)
}
Slide.prototype.prev = function() {
  this.go(this.current - 1)
}

Slide.prototype.autoPlay = function() {
  var self = this
  this.timer = setInterval(function() {
    self.next()
  }, 2000)
}

Slide.prototype.go = function(index) {
  var self = this
  var timer = this.timer
  var $list = this.$list
  var originLength = this.originLength
  var options = this.options
  if (timer) {
    clearInterval(timer)
  }
  var left = (index + 1) * (-options.width)
  $list.stop(true, true)
    .animate({
      left: left
    }, function() {
      self.current = index
      console.log(self.current)
      if (self.current === originLength) {
        $list.css({
          left: -options.width
        })
        self.current = 0
      } else if (self.current === -1) {
        $list.css({
          left: -originLength * options.width
        })
        self.current = originLength - 1
      }
      if (!self.hover) {
        self.autoPlay()
      }
    })




}


// 使用者
$('.arts')
  .slides({
  width: 500,
    auto: true
  })
