<template>
  <div class="songs" ref="table">
    <div class="s-img">
      <img :src="songList.coverImgUrl" alt="" />
    </div>
    <div class="s-menu">
      <div class="title">
        <div>
          <span class="tol">歌单</span>
          <span class="title-a">{{ songList.name }}</span>
        </div>
        <div class="r-nums">
          <div class="sums">
            歌曲数
            <p>{{ songList.trackCount }}</p>
          </div>
          <div class="plays">
            播放数
            <p>{{ (songList.playCount / 10000).toFixed(0) }}万</p>
          </div>
        </div>
      </div>
      <div class="time">
        <a href="">
          <img :src="creators.avatarUrl" alt="" />
        </a>
        <a href="" class="source">{{ creators.nickname }}</a>
        <span class="time-t">{{ songList.createTime | showDate }}创建</span>
      </div>
      <div class="btn">
        <el-button size="mini" type="primary" icon="el-icon-video-play" @click="playAll">
          播放全部
          <button class="btn-a">+</button>
        </el-button>
        <el-button size="small" icon="el-icon-star-off"
          >收藏({{ songList.subscribedCount }})</el-button
        >
        <el-button size="small" icon="el-icon-thumb"
          >分享({{ songList.shareCount }})</el-button
        >
        <el-button size="small" icon="el-icon-download">下载全部</el-button>
      </div>
      <div class="tag">
        <span>标签：</span>
        <a href="" v-for="(item, index) in songList.tags" :key="index">
          {{ index + 1 === songList.tags.length ? item : item + " / " }}
        </a>
      </div>
      <div class="brief">
        <span style="marginRight: 8px">简介</span>
        <span style="lineheight: 1.5">{{
          (songList.description + "").substr(0, 200) + "..."
        }}</span>
      </div>
    </div>
    <div class="songstable">
      <el-tabs v-model="activeName" style="marginLeft: 50px">
        <el-tab-pane label="歌曲列表" name="first">
          <SongTable :load="load" :numbers="count"></SongTable>
        </el-tab-pane>
        <el-tab-pane :label="gettalk" name="second">
          <SongComment></SongComment>
        </el-tab-pane>
        <el-tab-pane label="收藏者" name="third">
          <SongCollect></SongCollect>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SongTable from "./SongTable";
import SongComment from "./SongComment";
import SongCollect from './SongCollect'
import { getSongListInfo } from "network/home";
import { formatDate } from "common/uctil";
import {MUSIC_LISTIDS} from '@/store/mutationType'
export default {
  name: "SongList",
  components: {
    SongTable,
    SongComment,
    SongCollect
  },
  data() {
    return {
      id: 0, //歌单ID，可以由route参数获取
      songList: {}, //请求回来的歌单信息
      creators: {}, //歌单详细信息，包括图片，歌单名
      ids: [], //歌单内各个歌曲的ID
      count: 0, //歌单歌曲数量
      activeName: "first", //标签栏
      load: false,
      nums: 1,
    };
  },
  methods: {
    //播放全部
    playAll(){
      // console.log(id);
      // console.log(this.ids);
      //修改vuex的歌单id数据
       this.$store.commit(MUSIC_LISTIDS,this.ids);
      // this.getSongListInfoSongs(id);
    },
    //获取歌单数据
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
            // console.log(res.playlist);
            this.songList = res.playlist;
            this.creators = res.playlist.creator;
            res.playlist.trackIds.forEach((item) => {
            this.ids.push(item.id);
            this.count = this.songList.trackCount;
            });
        });
    },
  },
  computed:{
    //获取评论数
    gettalk() {
      return `评论(${this.songList.commentCount})`;
    },
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getSongListInfo(this.id);
  },
  filters: {
    //日期过滤
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.songs {
  display: flex;
  flex-wrap: wrap;
  max-height: 680px;
  overflow: auto;
  padding-top: 30px;
}

.s-img {
  width: 20%;
  margin: 0 20px;
}
.s-img img {
  width: 100%;
}

.s-menu {
  width: 70%;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  justify-content: space-between;
}
.tol {
  border: 1px solid red;
  font-size: 14px;
  color: red;
  padding: 2px;
  margin-right: 7px;
}
.title {
  font-size: 23px;
  font-weight: 10px;
}
.r-nums {
  display: flex;
  color: #ccc;
  font-size: 14px;
  min-width: 110px;
  min-height: 30px;
}
.sums {
  border-right: 1px solid #ccc;
  padding-right: 8px;
  position: relative;
}
.sums p {
  position: absolute;
  right: 8px;
  top: 17px;
}
.plays {
  position: relative;
  padding-left: 15px;
}
.plays p {
  position: absolute;
  right: 0;
  top: 17px;
}

.time {
  margin-top: 15px;
}
.time img {
  border-radius: 50%;
  width: 28px;
  margin-right: 8px;
  vertical-align: middle;
}
.source {
  color: rgba(0, 0, 255, 0.7);
  margin-right: 8px;
}
.source:hover {
  color: blue;
}
.time-t {
  font-size: 13px;
  color: #333;
}

.btn {
  margin-top: 15px;
}
.btn-a {
  background: #409eff;
  cursor: pointer;
  border: none;
  color: #fff;
}

.tag {
  margin-top: 15px;
  font-size: 13px;
}
.tag span {
  margin-right: 8px;
}
.tag a {
  color: #0c73c2;
}

.brief {
  font-size: 13px;
  margin-top: 15px;
}

.songstable {
  position: relative;
  width: 90%;
  margin-top: 20px;
}
</style>