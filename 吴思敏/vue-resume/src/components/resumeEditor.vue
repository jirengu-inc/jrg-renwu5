<template>
  <div class="resumeEditor" :class="{htmlMode:enableHtml}" ref="container">
    <div v-if="enableHtml" v-html="result"></div>
    <pre v-else>{{result}}</pre>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    // 让子组件使用父组件的数据，我们需要通过子组件的 props 选项
    props: ['markdown', 'enableHtml'],
    name: 'resumeEditor',
    computed: {
      result: function () {
        return this.enableHtml ? marked(this.markdown) : this.markdown
      }
    },
     methods: {
      goBottom: function () {
        this.$refs.container.scrollTop = 100000
      },
      goTop: function(){
        this.$refs.container.scrollTop = 0
      }
    }
   
  }



</script>

<style scoped>
  @media (max-width:500px){
    .resumeEditor{
    }
  }
  .htmlMode {
    animation: flip 2s;
  }
  @keyframes flip {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>