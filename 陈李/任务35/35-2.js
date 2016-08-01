/*
 *创建一个 GoTop 对象，当 new 一个 GotTop 对象则会在页面上创建一个回到顶部的元素，点击页面滚动到顶部。拥有以下属性和方法 (难度: ****)
 *   ct属性，GoTop 对应的 DOM 元素的容器
 *   target属性， GoTop 对应的 DOM 元素
 *   bindEvent 方法， 用于绑定事件
 *   createNode 方法， 用于在容器内创建节点
 */
function goTop($ct){
    this.ct = $ct
    this.target = $('<div class="go-top">TOP</div>')
    this.bindEvent = function(){
        this.target.on('click',function(){
            $(window).scrollTop(0)
        })
    }
    this.createNode = function(){
        this.ct.append(this.target)
    }

    this.createNode()
    this.bindEvent()
}

var GoTop = new goTop($('.ct'))