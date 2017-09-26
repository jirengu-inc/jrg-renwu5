<template>
  <!--<div id="app">
<div class="styleEditor">
    <pre>
     {{code}}
    </pre> 
   <div v-html="styleCode"></div>
   </div>
  
   
   <div class="resumeEditor" id="resumeEditor">
    <div v-if="enableHtml" v-html="result" :markdown="currentMarkdown"> </div>
    <pre v-else>{{result}}</pre>
  </div>
  </div>-->

  <div id="app">
    <!--左边：代码部分-->
    <!--ref为子组件指定一个索引ID，直接访问子组件-->
    <styleEditor ref="styleEditor" :code="currentStyle">

    </styleEditor>
    <!--右边：markdown部分-->
    <resumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml">

    </resumeEditor>
    
  </div>

</template>

<script>
import styleEditor from './components/styleEditor'
import resumeEditor from './components/resumeEditor'

export default {
  // 组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。
  name: 'app',
  components: {
    styleEditor,
    resumeEditor
    
  },
  data(){
  // return{
  //   code:``,
  //   finalCode:
  return {
        interval: 30,
        currentStyle: '',
        enableHtml: false,
        fullStyle: [ 
    `/*
    * Inspired by http://strml.net/
    * hello,大家好！我是吴思敏 
    * 金秋九月，很多公司都在招聘
    * 这里我用vue给自己写酷炫的简历

    */
    /* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: rgb(0,43,54);
}
/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码颜色太过单调啦，我们给代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }
/* 加点 3D 效果*/
html{
  perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}
/* 接下来是做一个编辑器 */
.resumeEditor{
  position: fixed; left: 47vw; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */
`,
          `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具marked 翻译成 HTML 就行了
 */
`
          ,
          `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}

    
    `],
        currentMarkdown: '',
        fullMarkdown: `吴思敏
----
前端工程师，正在寻找一个前端开发工作，希望能够和更多的前端工程师交流前端知识。
技能
----
* Node.js 开发
* 熟悉HTML、CSS、页面架构和布局，对Web标准和标签语义化有深入理解
* 熟悉Ajax、JavaScript、jQuery、JSON等前端技术，掌握面向对象编程思想
* 了解ECMA5的标签规范以及HTML5新标签及CSS3样式及动画

项目
----
1. [井字游戏](http://book.jirengu.com/jirengu-inc/jrg-renwu5/%E5%90%B4%E6%80%9D%E6%95%8F/game/index.html)
2. [在线的备忘录](https://github.com/siminmin/demo/tree/master/note)
3. [实战页面](http://book.jirengu.com/jirengu-inc/jrg-renwu5/吴思敏/js_senior_5_npm-npmscript-gulp-webpack/task15.html)
4. [漂亮的项目页面](http://book.jirengu.com/jirengu-inc/jrg-renwu5/%E5%90%B4%E6%80%9D%E6%95%8F/task_14/task14_1.html)

链接
----
* [GitHub](https://github.com/siminmin)

        
  `}

  },
  created(){
  // var n=0;
  // setInterval(()=>{
  // this.code=this.finalCode.substring(0,n)
  // n+=1
  // },10),
    this.makeResume()
},
  // computed:{
  // styleCode:function(){
  // return '<style>'+this.code +'</style>'
  
  // }
  // },
  methods: {
      makeResume: async function () {
        await this.progressivelyShowStyle(0)
        await this.progressivelyShowResume()
        await this.progressivelyShowStyle(1)
        await this.showHtml()
        await this.progressivelyShowStyle(2)
      },
      showHtml: function () {
        return new Promise((resolve, reject) => {
          this.enableHtml = true
          resolve()
        })
      },
      progressivelyShowStyle(n) {
        return new Promise((resolve, reject) => {
          let interval = this.interval
          let showStyle = (async function () {
            let style = this.fullStyle[n]
            if (!style) { return }
            let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)
            let prefixLength = length - style.length
            if (this.currentStyle.length < length) {
              let l = this.currentStyle.length - prefixLength
              let char = style.substring(l, l + 1) || ' '
              this.currentStyle += char
              if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                this.$nextTick(() => {
                  this.$refs.styleEditor.goBottom()
                })
              }
              setTimeout(showStyle, interval)
            } else {
              resolve()
            }
          }).bind(this)
          showStyle()
        })
      },
      progressivelyShowResume() {
        return new Promise((resolve, reject) => {
          let length = this.fullMarkdown.length
          let interval = this.interval
          let showResume = () => {
            if (this.currentMarkdown.length < length) {
              this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1)
              let lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]
              let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2]
              if (prevChar === '\n' && this.$refs.resumeEditor) {
                this.$nextTick(() => this.$refs.resumeEditor.goBottom())
              }
              setTimeout(showResume, interval)
            } else {
              resolve()
            }
          }
          showResume()
        })
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    min-height: 100vh;
  }
  
  * {
    box-sizing: border-box;
  }
</style>