<template>
  <div class="titlebox">
    <span>{{name}}:</span>
    <div class="title-row" v-for="(item,index) in titles" :key="index">
        <span
            style="cursor:pointer;padding:5px 3px;display: inline-block;borderRadius:3px"
            :class="[curIndex === index ? 'active' : '']"
            @click="changeOne(item,index)"
        >{{item}}</span>
        <i style="paddingLeft:8px;color:#666;">{{index === titles.length-1 ? '' : "|"}}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleBox",
  props: {
    titles: {
      type: Array,
      default(){
          return []
      }
    },
    name:{
        type:String,
        default:'语种'
    }
  },
  data(){
      return{
          curIndex:0,
      }
  },
  methods:{
      changeOne(name,index){
          this.curIndex = index;
          this.$emit('changeClass',name)
      }
  }
};
</script>

<style scoped>
.titlebox {
  margin-top: 20px;
}
.title-row{
    display: inline-block;
}
.titlebox span{
    margin: 0 8px;
    line-height: 1.5;
}

.titlebox span.active {
  background: #bf9096;
  color: #f5f5f5;
}
</style>