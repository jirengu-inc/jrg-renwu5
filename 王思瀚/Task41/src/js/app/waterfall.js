define(['jquery'],function($){
      var waterfall = {
              init: function(){
                    this.$target = $('.load');
                    this.start = 1;
                    this.len = 12;
                    this.heightNum = [];
                    this.clock;
              },
              bind: function(){
                    var $cur = this;
                    $cur.$target.on('click',function(){
                          if ($cur.clock) {
                            clearTimeout($cur.clock);
                          }
                            $cur.clock = setTimeout(function(){
                              $cur.checkImg();
                            },100);
                    });
              },
              checkImg: function(){
                    var $cur = this;
                    if ($cur.isShow($cur.$target)) {
                      $cur.dosth();
                    }
              },
              isShow: function(){
                    var $cur = this;
                    $cur.scrollTop = $(window).scrollTop();
                    $cur.winH = $(window).height();
                  //  $cur.top = e.offset().top;

                if ($cur.winH + $cur.scrollTop > 500) {
                  return true;
                }else{
                  return false;
                }
              },

              dosth: function(){
                    var $cur = this;
                    $.ajax({
                      url:'http://platform.sina.com.cn/slide/album_tech',
                      type:'get',
                      dataType:'jsonp',
                      jsonp:'jsoncallback',
                      data:{
                            app_key:'1271687855',
                            num:$cur.len,
                            page:$cur.start
                      },
                      success:function (ret){
                        //status是因为这里可能出现false所以才不能用三个等号吗？一旦使用三个等号就报错
                        if (ret.status.code == 0) {
                          $cur.dataArr = ret.data;
                          $cur.$nodes = $cur.renderData($cur.dataArr);
                                  $cur.render($cur.$nodes);
                                  $cur.start++;
                        }
                      }
                    });
              },
              renderData: function(items){
                        var $cur = this;
                            $cur.tpl = '';

                          for (var i = 0; i < items.length; i++) {
                                $cur.tpl += '<li class="item">';
                                $cur.tpl += '<a href="#" class="link"><img src="'+items[i].img_url+'"></a>';
                                $cur.tpl += '<h4 class="header">'+items[i].short_name+'</h4>';
                                $cur.tpl += '<p class="intro">'+items[i].short_intro+'<p>';
                                $cur.tpl += '</li>';
                          }
                          //视频里说的easyTpl的函数怎么写的。。。
                          $cur.$nodes = $($cur.tpl);//这一步是把tpl变成了什么？
                          $('.ul-list').append($cur.$nodes);
                          return $cur.$nodes;
              },
              render: function($nodes){
                          var $cur = this;
                          $cur.nodeWidth = $nodes.outerWidth(true);

                          //很关键的一点，这里不是用窗口的宽度除元素的宽度，而是用你自己设置的div或ul宽度
                          $cur.nodeNum = parseInt($('.ul-list').width() / $cur.nodeWidth);


                          if ($cur.heightNum.length === 0) {
                            for (var i = 0; i < $cur.nodeNum; i++) {
                                    $cur.heightNum.push(0);
                            }
                          }

                          $nodes.each(function(){
                            //这里如果不注释掉下一行的话101行会说无法读取heightNum[0],使用console.log的话会发现heightNum没有定义
                              var $cur2 = $(this);
    //                            console.log($cur.heightNum);
                            $(this).find('img').on('load',function(){
                                  $cur.idx = 0;
                              //      console.log($cur.heightNum);
                                  $cur.minHeight = $cur.heightNum[0];

                              for (var i = 0; i < $cur.heightNum.length; i++) {
                                  if ($cur.heightNum[i] < $cur.minHeight) {
                                        $cur.idx = i;
                                        $cur.minHeight = $cur.heightNum[i];
                                  }
                              }
                            //  console.log($cur.heightNum);
                              //这里如果不使用jquery的this的话会说不是一个方程，这是为什么
                              //!!!!!不只是jquery的this，而是使用了$cur2
                              $cur2.css({
                                left:$cur.idx*$cur.nodeWidth,
                                top:$cur.minHeight
                              });
                              //这里的outerHeight前面不加jquery的this也会出现不是一个方程的报错，为什么
                              $cur.heightNum[$cur.idx] = $cur.heightNum[$cur.idx] + $cur2.outerHeight(true);
                              $('.ul-list').height(Math.max.apply(null,$cur.heightNum));
                              //刷新容器高度，否则下拉之后产生的新元素会出现在左上角
                            });



                          });
              },
              open: function(){
                this.init();
                this.bind();
                this.checkImg();
              }
      };
      return waterfall;
});
