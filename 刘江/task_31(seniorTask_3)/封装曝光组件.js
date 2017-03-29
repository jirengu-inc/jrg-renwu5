function Exposure($target) {
  this.$target = $target
  this.bind()
  this.check()
}

Exposure.prototype.bind = function() {
  var self = this
  $(window)
    .on('scroll', function() {
      self.check()
    })
}

Exposure.prototype.check = function() {
  if (this.isShow(this.$target)) {
    this.showImg(this.$target)
  }
}

Exposure.prototype.isShow = function() {
  var windowHeight = $(window)
    .height()
  var scrollTop = $(window)
    .scrollTop()
  var offsetTop = this.$target.offset()
    .top
  var nodeHeight = this.$target.height()
  if (windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight) {
    return true
  } else {
    return false
  }
}

Exposure.prototype.showImg = function ($img) {
  var imgUrl = $img.attr('data-src');
  $img.attr('src', imgUrl);
}

$.fn.Lazy = function() {
  this.each(function() {
    var element = this
    new Exposure($(element))
  })
}
$('img')
  .Lazy()

