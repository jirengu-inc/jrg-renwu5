var playedSongList=[];//用于存放之前播放过的歌曲的sid;
var lyricTimeArr=[];//存放每一句歌词出现的时间；
var currentTimeSec=0;//
var currentChannel='public_tuijian_spring';//初始频道；
var comeOutL=true; //判断频道列表是否滑入
var comeOutR=true; //歌词页面是否滑入
var letPlay=false; //判断当前处于播放还是停止

$(function(){
	getSong();
	getSongInfo();
	btnEvent();
	autoPlay();
	timeUpdate();
	timeInit();
})


function songOn(){
	$('.play').hide();
	$('.pause').show();
	$('.needle').addClass('needleOn');
	$('.pic').addClass('picAnimate');
	$('audio')[0].play();
	letPlay=true;
}

function songOff(){
	$('.pause').hide();
	$('.play').show();
	$('.needle').removeClass('needleOn');
	$('.pic').removeClass('picAnimate');
	$('audio')[0].pause();
	letPlay=false;
}

//控制按钮事件集合
function btnEvent(){
	$('.play').on("click",function(){
		songOn();
	})
	$('.pause').on("click",function(){
		songOff();
	})
	$(".back").on("click",function(e){
		e.stopPropagation();
		preSong();
	})
	$(".ahead").on("click",function(e){
		e.stopPropagation();
		nextSong();
	})
}

//点击歌曲列表与歌词侧边栏的滑入滑出
$(".headL").on("click",function(e){
	if(comeOutL){
		if(!comeOutR){
			$(".lyric").animate({right:-300},500,function(){comeOutR=!comeOutR;});
		}
		$(".styleList").animate({left:0},500,function(){comeOutL=!comeOutL;});
	}else{
		$(".styleList").animate({left:-200},500,function(){comeOutL=!comeOutL;});
	}
})
$(".headR").on("click",function(e){
	if (comeOutR){
		if(!comeOutL){
			$(".styleList").animate({left:-200},500,function(){comeOutL=!comeOutL;});
		}
		$(".lyric").animate({right:0},500,function(){comeOutR=!comeOutR;});
	}else{
		$(".lyric").animate({right:-300},500,function(){comeOutR=!comeOutR;});
	}	
})


//点击切换上一首和下一首
function nextSong(channel){
	var newChannel=channel || currentChannel;
	songOff();
	lyricTimeArr=[];
	getSongInfo(newChannel);
	$('audio').on('canplay',function(){
		letPlay=true;
		if(letPlay){
			songOn();
			letPlay=false;
		}
	})

}

function preSong(){
	songOff();
	if(playedSongList.length>1){
		playedSongList.pop();	
		lyricTimeArr=[];
		fillInfo(playedSongList[playedSongList.length-1]);
		$('audio').on('canplay',function(){
			letPlay=true;
			if(letPlay){
				songOn();
				letPlay=false;
			}
		})	
	}
}

//自动下一首播放
function autoPlay(){
	$('audio').on("ended",function(){
		nextSong();
	})
}


//获取歌曲频道信息
function getSong(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getChannels.php', 
		type:'get',
		dataType:'json',
		success:function(data){
			dealWith(data.channels);
			// console.log(data);
		},
		error:function(){
			console.log('error');
		}

	})
	function dealWith(data){
		var str='';
		$('.styleList').empty();
		data.forEach(function(e,i,a){
			str+='<p data-channel="'+e['channel_id'];
			str+='">'+e.name+'</p>';
		});
		$('.styleList').append($(str));
		$('.styleList p:first').addClass('selected');
	}
}

//styleList侧边栏事件代理,点击选项切换频道
$(".styleList").on("click",'p',function(e){
	e.stopPropagation();
	e.preventDefault();
	var _this=e.currentTarget;
	currentChannel=$(_this).attr('data-channel');
	$(_this).parent().children().removeClass('selected');
	$(_this).addClass("selected");
	nextSong(currentChannel);
})

//以下是请求歌曲文件的
function getSongInfo(channel){
	var channel=currentChannel || 'public_tuijian_spring';
	$.ajax({
		url:'http://api.jirengu.com/fm/getSong.php',
		type:'get',
		dataType:'json',
		data:{
			channel:channel
		},
		success:function(data){
			playedSongList.push(data);
			fillInfo(data);
		},
		error:function(){
			console.log('error');
		}
	})

}

//将歌曲数据插入到页面中
function fillInfo(data){
	$('.songName').html(data.song[0].title)
	$('.artist').html(data.song[0].artist)
	$('.pic>img').attr('src',data.song[0].picture)
	$('#music').attr('src',data.song[0].url)
	$.get(data.song[0].lrc).done(function(data){
		lyricFormat(data);
	})

}


//对字符串歌词数据进行格式化处理成一段html字符串
function lyricFormat(lyric){
	var lyricArr=lyric.split('\n');
	var str='';
	for(var i=0,length=lyricArr.length;i<length;i++){
		var lrc=lyricArr[i].substr(10);
		if (!lrc) {
       lrc = '-';
    };
		str+='<p class='+'\'lyric'+i+'\'>'+lrc+'</p>';
		lyricTimeFormat(lyricArr[i]);//完成每句歌词对应的时间点数组
	}
	$('.lyricBox').children().remove();
	$('.lyricBox').append(str);
}


function lyricTimeFormat(lyric){
	var min=parseInt(lyric.slice(1,3));
	var second=Math.round(min*60+parseFloat(lyric.slice(4,9)));
	lyricTimeArr.push(second);
}

function timeUpdate(){
	$("audio").on("timeupdate",function(){
		if(currentTimeSec != Math.round($("audio")[0].currentTime)){
			currentTimeSec=Math.round($("audio")[0].currentTime);
			lyricBoxMove(currentTimeSec);
		}
	})
}

function lyricBoxMove(time){
	for(var i=0,len=lyricTimeArr.length;i<len;i++){
		if(time === lyricTimeArr[i]){
			var Top=150-40*i+'px';
			var lightlrc='.lyric'+i;
			$(lightlrc).siblings().removeClass('light');
			$(lightlrc).addClass('light');
			$('.lyricBox').animate({
				top:Top
			},200);
			$(".lyricSingle").html(null);
			$(".lyricSingle").append($('.light').html());
		}
	}
}


//当音频未完全加载时，音频对象的duration属性为NaN；
function timeInit(){
  $('audio').on('canplay',function(){
    $('.endTime').html(timeFormat($('audio')[0].duration));
    timeMove();
  })

}

function timeMove(){
  var endTime=$('audio')[0].duration;
  var barWidth=$('.barWap').width();
  var moveTime;

  $('audio').on('play',function(){
  	moveTime=setInterval(function(){
  		var currentTime=$('audio')[0].currentTime;
  		var precent=parseInt(currentTime * 100 / endTime) / 100;
	    $('.currentTime').text(timeFormat(currentTime));
	    $('.bar').width(barWidth*precent);
	    $('.proBall').css('left',barWidth*precent+'px');
	  },1000);
  });

  $('audio').on('pause',function(){
  	clearInterval(moveTime);
  })
   
}

function timeFormat(time){
  var t='';
  var m=parseInt(time/60);
  var s=parseInt(time%60);
  if(m===0){
    t='00:' + (s<10 ? '0'+s : s);
  }else{
    t='0' + m + ':' + (s<10 ? '0'+s : s);
  }
  return t;
}

$('.barWap').on('click',function(e){
  var offsetX=e.offsetX;
  var barWidth=$('.barWap').width();
  var precentPro=offsetX/barWidth;
  var endTime=$('audio')[0].duration;
  $('audio')[0].currentTime=endTime*precentPro;
})