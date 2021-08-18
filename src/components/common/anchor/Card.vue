<template>
  <div class="card" :style="{ width: wth + '%' }">
      <div class="img">
          <img :src="item.picUrl" alt="404">
          <span class="top" v-if="topShow">{{item.category}}</span>
          <span class="botm">
              <slot name="btm-text">
                  <i class="el-icon-view"></i>{{item.subCount}}
              </slot>
          </span>
      </div>
      <div class="talk">{{item.rcmdtext}}</div>
      <div class="c-user" v-if="userShow">
          <a href="#">
              <img :src="item.dj.avatarUrl" alt="404" class="u-img">
          </a>
          <a href="#" class="nickname">{{item.dj.nickname}}</a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Card',
    props:{
        item:{
            type:Object,
            default(){
                return{}
            }
        },
        wth:{
            type:Number,
            default:18,
        },
        topShow:{
            type:Boolean,
            default:true
        },
        userShow:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style scoped>
.card {
  margin-top: 15px;
}
.img{
    position: relative;
    cursor: pointer;
}
.img img{
    width: 100%;
}
.top{
    position: absolute;
    top:0;
    left: 0;
    background: #ff2c55;
    color: rgba(255, 255, 255, 0.9);
    border-bottom-right-radius: 6px;
    font-size: 12px;
    padding: 3px 8px 5px 0;
}
.botm{
    position: absolute;
    bottom: 5px;
    left: 0;
    background-image: linear-gradient(to right, rgba(0,0,0,0.5) , rgba(0,0,0,0.02));
    font-size: 12px;
    padding-right: 10px;
    color: rgba(255, 255, 255, 0.9);
}
.talk{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    margin: 8px 0;
}
.c-user{
    font-size: 12px;
    width: 100%;
}
.u-img{
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.nickname{
    vertical-align: middle;
    position: relative;
    top: -8px;
    color: red;
    left: 8px;
}
</style>