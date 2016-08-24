var $ct = $('ul.ct'),
	$items = $ct.children(),
	$pre = $('.pre'),
	$next = $('.next'),
	$bullet = $('.bullet'),
	imgWidth = $items.width(),
	imgCount = $items.size();

console.log($ct);
$ct.prepend($items.last().clone());
$ct.append($items.first().clone());
imgRealCount = $ct.children().length;
console.log(imgRealCount);

$ct.css({
	left: 0 - imgWidth,
	width: imgRealCount * imgWidth
});

var curIdx = 0,
	isAnimate = false;
$next.on('click', function() {
	playNext()
});
$pre.on('click', function() {
	playPre()
});
$bullet.find('li').on('click', function() {
	var idx = $(this).index();
	if(idx > curIdx) {
		playNext(idx - curIdx)
	}
	if(idx < curIdx) {
		playPre(curIdx - idx)
	}
});

function playNext(idx) {
	var idx = idx || 1;
	if(!isAnimate) {
		isAnimate = true;
		$ct.animate({
			left: '-=' + (imgWidth * idx)
		}, function() {
			curIdx++;
			if(curIdx === imgCount) {
				$ct.css({
					left: 0 - imgWidth
				})
				curIdx = 0;
			}
			isAnimate = false;
			setBullet();
		})
	}
};

function playPre(idx) {
	var idx = idx || 1;
	if(!isAnimate) {
		isAnimate = true;
		$ct.animate({
			left: '+=' + (imgWidth * idx)
		}, function() {
			curIdx = (imgCount + curIdx - idx) & imgCount;
			if(curIdx === (imgCount - 1)) {
				$ct.css({
					left: 0 - (imgCount * imgWidth)
				})
			}
		})
		isAnimate = false;
		setBullet();
	}
};
function setBullet(){
	$ct.find('li').removeClass('active')
				  .eq(curIdx).addClass('active')	
};
