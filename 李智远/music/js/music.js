/**
 * Created by NICK on 2016/11/1.
 */


function Fm($node) {
    this.$node = $node;
    this.$audio = $node.find('.player');
    this.audio = $node.find('.player')[0];

    //歌曲
    this.$pic =  $node.find('.fm-pic');
    this.$title = $node.find('.info-title');
    this.$artist = $node.find('.info-artist');

    this.$play = $node.find('.control-play');
    this.$next = $node.find('.control-next');
    this.$circle = $node.find('.control-circle');


    this.$channelShow = $node.find('.control-channel');


    //进度条
    this.$progress = $node.find('.fm-progress');
    this.$progressStatus = $node.find('.progress-status');

    //进度条时间
    this.$curTime = $node.find('.current-time')
    this.$totalTime = $node.find('.total-time')
    this.totalTime = 0;
    this.clock = 0;

    //音量
    this.$sound = $node.find('.sound-icon');
    this.$soundControl = $node.find('.sound-control');
    this.$soundStatus = $node.find('.sound-status');

    //下载
    this.$download = $node.find('.operation-download');

    //上一曲
    this.$prev = $node.find('.control-pre');
    this.preshow = false;
    this.prevSong = null
    this.curSong = null

    this.isGetsong = false

    this.$channelAll = $('.channel')
    this.$channel = $('.channel-list')
    this.currentChannel = ''
    this.channel = {
        tuijian: this.$channel.find('.channel-tuijian'),
        shiguang: this.$channel.find('.channel-shiguang'),
        fengge: this.$channel.find('.channel-fengge'),
        xinqing: this.$channel.find('.channel-xinqing'),
        yuzhong: this.$channel.find('.channel-yuzhong')
    }



    this.getSong();
    this.bindEvent();
    this.setVolume(60);
    this.getChannel();
}

Fm.prototype.bindEvent = function() {


    var _this = this,
        $audio = this.$audio,
        audio = this.audio;

    this.$audio
        .on('play',function () {
            _this.$audio.data('play',true);
            _this.setCurTime();
            _this.$play.removeClass('icon-play').addClass('icon-stop');
        })
        .on('pause',function(){
            _this.$audio.data('play',false);
            _this.$play.removeClass('icon-stop').addClass('icon-play');
        })
        .on('ended',function () {
            _this.getSong(_this.currentChannel);
            _this.preshow = false;
            _this.preIfShow(_this.preshow)
        })
        .on('volumechange',function () {
            if(audio.muted){
                _this.$sound.removeClass('icon-sound').addClass('icon-mute');
                _this.$soundStatus.width(0);
                return
            }
            _this.$sound.removeClass('icon-mute').addClass('icon-sound')//不需要调节音量
        })
        .on('durationchange',function () {
            _this.setDuration();
        })
        .on('canplay',function () {
            _this.play();
            _this.isGetsong = false;
        })



    this.$play.on('click',function () {
        if(!$audio.data('play')){
            audio.play();
            _this.$play.attr('title','暂停')
        }else{
            audio.pause();
            _this.$play.attr('title','播放')
        }
    })

    this.$next.on('click',function () {
        _this.getSong(_this.currentChannel);
        _this.preshow = false;
        _this.preIfShow(_this.preshow)
    })

    this.$circle.on('click',function () {
        _this.isCircle();
    })

    this.$progress.on('click',function (e) {
        var percentage = _this.setProgress(e.offsetX);
        audio.currentTime = percentage*_this.totalTime;//加入audio,这里需要存下来
        _this.$curTime.text(_this.formatTime(audio.currentTime));//formatTime取整时间
    })

    this.$sound.on('click',function () {
        if(audio.muted){
            audio.muted = false;
            _this.setVolume();//写这里不是muted = false;
        }else{
            audio.muted = true;
        }
    })

    this.$soundControl.on('click',function (e) {
        if(audio.muted){
            audio.muted = false;
        }
        _this.setVolume(e.offsetX);
    })

    this.$prev.on('click',function () {
        if(_this.preshow){
            _this.preIfShow(_this.preshow)
            return
        }
        _this.preIfShow(_this.preshow)
        _this.preshow = true;
        _this.songInit(_this.prevSong)
        _this.renderLrc(_this.prevSong.lrc)
        _this.preIfShow(_this.preshow)
    })

    Fm.prototype.preIfShow = function(status){
        if(status == true){
            _this.$prev.css('color','#fff');
            return
        }else{
            _this.$prev.css('color','rgb(0, 0, 0)')
                .css('opacity','0.6')
            _this.preshow = false
        }
    }


    this.$channel.on('click', function(event){
        _this.accordion.call(this)
        if ($(event.target).data('channelid')) {
            _this.currentChannel = $(event.target).data('channelid')
            _this.getSong(_this.currentChannel)
        }
    })

    this.$channelShow.on('click', function(){
        _this.$channelAll.slideToggle()
    })

}

Fm.prototype.formatTime = function (time) {
    var min = Math.floor(time/60),
        sec = Math.floor(time%60);
    if(sec<10){
        sec = '0' + sec
    }
    return min + ':' + sec
}

Fm.prototype.setDuration = function () {
    this.$totalTime.text(this.formatTime(this.audio.duration));
    this.totalTime = Math.floor(this.audio.duration);
}

Fm.prototype.setCurTime = function () {
    var _this =this;

    (function setTime() {
        if(!_this.$audio.data('play')) return
        _this.$curTime.text(_this.formatTime(_this.audio.currentTime));
        _this.setProgress()
        _this.setLrcEffect()
        setTimeout(setTime,1000)//interval貌似有问题
    })()

}

Fm.prototype.setProgress = function (len) {
    var progressWidth = this.$progress.innerWidth(),
        percent = 0;
    if(len){
        percent = (len/progressWidth)*100;
    }else{
        percent = (this.audio.currentTime/this.totalTime)*100;
    }
    this.$progressStatus.width(percent+'%');
    return percent/100
}

Fm.prototype.setVolume = function (len) {
    var soundWidth = this.$soundControl.width();
    if(len){
        this.audio.volume = len/soundWidth;
    }
    this.$soundStatus.width(this.audio.volume*soundWidth);
}

Fm.prototype.play = function () {
    this.audio.play();
    this.setCurTime();
}


Fm.prototype.isCircle = function() {
    var $audio = this.$audio
    var $circle = this.$circle
    if (!$audio.attr('loop')) {
        $audio.attr('loop', true)
        $circle
            .removeClass('icon-circle')
            .addClass('icon-shuffle')
            .attr('title', '单曲循环')
    } else {
        $audio.attr('loop',false)
        $circle
            .removeClass('icon-shuffle')
            .addClass('icon-circle')
            .attr('title', '循环播放')
    }
}

Fm.prototype.getSong = function (channelid) {
    var _this = this;

    if(this.isGetsong) return;
    this.isGetsong = true;

    this.prevSong = this.curSong;
    //clearTimeout(this.clock);

    var channelid = channelid || 4;
    $.get({
//                method: 'get',
        dataType: 'json',
        url: 'http://api.jirengu.com/fm/getSong.php',
        data:{
            channel: channelid
        }
    }).done(function (response) {
        var song = response.song[0],
            songid = song.sid;

        _this.curSong = song;//保留当前歌曲信息
        _this.songInit(song);
        _this.getLrc(songid);
        _this.play();//必须要，手机端需要



    })
}

Fm.prototype.songInit =function (song) {

    this.$pic.html($('<img/>').attr('src',song.picture));//添加元素
    this.$title.text(song.title);
    this.$artist.text(song.artist);
    this.$audio.attr('src',song.url);
    this.$download.attr('href',song.url)

}



Fm.prototype.getLrc = function(songId){
    var _this = this;
    $.get({
        url: 'http://api.jirengu.com/fm/getLyric.php?',
        dataType: 'json',
        data:{
            sid: songId
        },
    }).done(function (response) {
        _this.renderLrc(response.lyric);
        _this.curSong.lrc = response.lyric;
//                console.log(response.lyric)
    })
}

Fm.prototype.renderLrc = function (lrc) {
    var $lrcList = $('<ul class="lrc-list"></ul>'),
        lrcArr = lrc.match(/\[(\d+\:\d+\.\d+)\]([^\[\n]+)/g);//有g没g不一样
    lrcArr.shift();

    function formate(min,sec) {
        var min = parseInt(min,10),
            sec = parseInt(sec,10);
        return min*60 + sec
    }

    $.each(lrcArr,function (key,value) {
        var lrcLine = value.match(/\[(\d+)\:(\d+)\.\d+\]([^\[\n]+)/);
        var lrcTime = formate(lrcLine[1],lrcLine[2]);

        $('<li/>').data('timeline',lrcTime)
            .text(lrcLine[3])
            .appendTo($lrcList)
    })
    this.$node.find('.fm-lrc').html($lrcList)
}

Fm.prototype.setLrcEffect = function () {
    var $lrcItem = this.$node.find('.lrc-list > li'),
        audio = this.audio;

    $lrcItem.each(function (key,value) {
        if($(value).data('timeline') === Math.floor(audio.currentTime)){//注意回调函数this会变
            $(value)
                .addClass('lrc-show')
                .siblings()
                .removeClass('lrc-show')
        }
    })
}

Fm.prototype.getChannel = function () {
    var _this = this;
    $.get({
        url:'http://api.jirengu.com/fm/getChannels.php',
        dataType:'json'//需要添加为json，否则得到的是JSON格式的数据，需要$.parseJSON()才可
    }).done(function(response){
        var channelsArr = response.channels;
        $.each(channelsArr, function(index, item){
            _this.renderChannel(item)
        })
    })
}

Fm.prototype.renderChannel = function (item) {
    var channel = item.channel_id.match(/\_(\w+)\_/)[1];
    var $li = $('<li />')
        .text(item.name)
        .data('channelid',item.channel_id);
    switch (channel){
        case 'tuijian':
            $li.appendTo(this.channel.tuijian);
            break;
        case 'shiguang':
            $li.appendTo(this.channel.shiguang);
            break;
        case 'fengge':
            $li.appendTo(this.channel.fengge);
            break;
        case 'xinqing':
            $li.appendTo(this.channel.xinqing);
            break;
        case 'yuzhong':
            $li.appendTo(this.channel.yuzhong);
    }
}

Fm.prototype.accordion = function () {
    var $this = $(this);
    if($this.hasClass('channel-show')){
        $this.removeClass('channel-show')
    }else{
        $this.addClass('channel-show')
            .siblings()
            .removeClass('channel-show')
    }
}

$('.fm-lrc').on('mousedown', function(event) {
    var $this = $(this)
    var difX = event.clientX - $this.offset().left
    var difY = event.clientY - $this.offset().top

    var maxX = $(window).width() - $this.outerWidth()
    var maxY = $(window).height() - $this.outerHeight()

    $(document).on('mousemove', function(event){

        var posX = event.clientX - difX
        var posY = event.clientY - difY

        if (posX < 0) {posX = 0}
        if (posY < 0) {posY = 0}
        if (posX > maxX) {posX = maxX}
        if (posY > maxY) {posY = maxY}

        $this.offset({
            left: posX,
            top: posY
        })
    })

    $(document).on('mouseup', function(event){
        $(this).off('mousemove')
    })
})
