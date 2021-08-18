<template>
    <div class="mvsimicard">
        <div class="simi-img">
            <img :src="simis.coverUrl" alt="">
            <div class="r-top">
                <i class="el-icon-video-camera"></i>
                {{simis.playTime > 10000 ? (simis.playTime/10000).toFixed(0) + '万' : simis.playTime}}
            </div>
        </div>
        <div class="simi-content">
            <div class="simi-title">
                <span class="simi-mv">视频</span>
                <span>{{simis.title}}</span>
            </div>
            <p>{{simis.durationms | showTime}}</p>
            <div v-if="simis.creator.length > 1" class="simi-creater">
                <i
                    v-for="(item,index) in simis.creator"
                    :key="item.userId"
                >{{simis.creator.length === index+1 ? item.userName : item.userName + '/' }}</i>
            </div>
            <span v-else>{{simis.creator[0].userName}}</span>
        </div>
    </div>
</template>

<script>
import {timeFormat } from 'common/uctil'
export default {
    name: 'VideoCard',
    props:{
        simis:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
    // 时间过滤 显示格式为 00:00
      showTime(value){
          return timeFormat(value);
      }
    },
}
</script>

<style scoped>
.mvsimicard {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.simi-img {
  width: 46%;
  position: relative;
  cursor: pointer;
}
.simi-img img {
  width: 100%;
}
.r-top{
  position: absolute;
  top: 2px;
  right: 3px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.4)
  );
  color: #f5f5f7;
  font-size: 13px;
}
.simi-content {
  width: 46%;
}
.simi-content p{
    font-size: 13px;
    color: #888;
    margin-bottom: 10px;
}
.simi-title {
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  display: inline-block;
  padding: 15px 0;
}
.simi-mv {
  font-size: 13px;
  padding: 3px 2px;
  border: 1px solid red;
  margin-right: 4px;
}
.simi-creater{
    font-size: 13px;
    color:#888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>