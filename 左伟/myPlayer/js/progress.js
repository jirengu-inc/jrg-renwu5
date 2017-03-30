$(function(){
  timeInit();
  timeMove();
})

//当音频未完全加载时，音频对象的duration属性为NaN；
function timeInit(){
  $('audio').on('canplay',function(){
    $('.endTime').html(timeFormat($('audio')[0].duration));
  })

}

function timeMove(){
  var currentTime=$('audio')[0].currentTime;
  var endTime=$('audio')[0].duration;
  var precent=parseInt(currentTime*100/endTime)/100;
  var barWidth=$('.barWap').width();
  var moveTime=setTimeout(function(){
    $('.currentTime').html(timeFormat(endTime*precent));
    $('.bar').width(barWidth*precent);
    $('.proBall').css('left',barWidth*precent);
    if(currentTime===endTime){
      clearInterval(moveTime);
    }
    timeMove();
  }); 
}

function timeFormat(time){
  var t='';
  var m=Math.floor(time/60);
  var s=Math.ceil(time - m*60);
  if(m==0){
    t='00:' + (s<10 ? '0'+s : s);
  }else{
    t='0' + m + ':' + (s<10 ? '0'+s : s);
  }
  return t;
}





