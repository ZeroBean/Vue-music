<template>
  <div class="leftmenu">
    <el-menu :default-openeds="['1']" default-active="1-1">
      <el-submenu index="1">
        <template slot="title"> <i></i>推荐 </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="toFindMusic">
            <i class="el-icon-magic-stick"></i>发现音乐
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-news"></i>私人FM
          </el-menu-item>
          <el-menu-item index="1-3">
            <i class="el-icon-video-camera-solid"></i>LOOK直播
          </el-menu-item>
          <el-menu-item index="1-4" @click="togMusicvideo">
            <i class="el-icon-video-camera"></i>视频
          </el-menu-item>
          <el-menu-item index="1-5">
            <i class="el-icon-s-custom"></i>朋友
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"> <i></i>我的音乐 </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <i class="el-icon-bangzhu"></i>本地音乐
          </el-menu-item>
          <el-menu-item index="2-2">
            <i class="el-icon-download"></i>下载管理
          </el-menu-item>
          <el-menu-item index="2-3">
            <i class="el-icon-cloudy"></i>我的音乐云盘
          </el-menu-item>
          <el-menu-item index="2-4">
            <i class="el-icon-coin"></i>我的电台
          </el-menu-item>
          <el-menu-item index="2-5">
            <i class="el-icon-star-off"></i>我的收藏
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"> <i></i>创建的歌单 </template>
        <el-menu-item-group>
            <el-menu-item
                v-for="(item,index) in getUserSongList"
                :key="item.id"
                :index="`3-${{index}}`"
                class="song-list"
            >
            <i :class="[index === 0 ? 'el-icon-star-on' : 'el-icon-s-data']"></i>
            {{item.name}}
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getUserAnchor } from 'network/login'
export default {
  name: "LeftMenu",
  data() {
    return {
      currentUserInfo:
        window.localStorage.getItem("currentUserInfo") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("currentUserInfo")),
    };
  },
  computed:{
      ...mapGetters(["getUserSongList"])
  },
  methods:{
      //路由歌单跳转后续再做
      getUserAnchor(uid){
        getUserAnchor(uid).then(
          console.log("打印Anchor")
        )
      },
      //路由跳转
      toFindMusic(){
        this.$router.push("/home/rtstyle")
      },
      togMusicvideo(){
        this.$router.push('/musicvideo');
      },
  },
  created(){
      if(this.currentUserInfo){
          this.getUserAnchor(this.currentUserInfo.userId);
      }
  }
};
</script>

<style scoped>
.song-list{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>