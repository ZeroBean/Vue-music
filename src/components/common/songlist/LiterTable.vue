<template>
  <div>
    <el-table
      :data="tableList"
      style="width: 100%"
      @scroll.passive="handleScroll"
      :lazy="true"
      :size="size"
    >
      <el-table-column type="index" v-if="indexShow"></el-table-column>
      <el-table-column label="操作" width="70" v-if="doShow">
        <a href="" class="icon">
          <i class="el-icon-star-off" v-show="isshow"></i>
          <i class="el-icon-star-on" v-show="!isshow"></i>
        </a>
        <a href="#" class="icon">
          <i class="el-icon-download"></i>
        </a>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题"
        :width="wth1"
      ></el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手"
        :width="wth2"
      ></el-table-column>
      <el-table-column
        prop="al.name"
        label="专辑"
        v-if="anchorShow"
      ></el-table-column>
      <el-table-column prop="dt" label="时长" :width="wth3"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { NOW_MUSICMENU,SET_COUNT,NOW_MUSIC} from "@/store/mutationType";
import { timeFormat } from "common/uctil";
import {
  getSongListInfoSongs,
  getMusicUrl,
  getMusicMenu,
} from "network/home";
export default {
  name: "LiterTable",
  props: {
    doShow: {
      type: Boolean,
      default: true,
    },
    indexShow: {
      type: Boolean,
      default: true,
    },
    anchorShow: {
      type: Boolean,
      default: true,
    },
    load: {
      type: Boolean,
      default: false,
    },
    numbers: {
      type: Number,
      default: 0,
    },
    wth1: {
      type: Number,
      default: 280,
    },
    wth2: {
      type: Number,
      default: 200,
    },
    wth3: {
      type: Number,
      default: 100,
    },
    size: {
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      tableList: [],
      id: 0,
      ids: [],
      nums: 1,
      isshow: true,
    };
  },
  methods: {
    //播放歌单歌曲
    playMusicList(row){
      if(this.getMusicListIds.length>0){
        //设置歌单数量
        this.$store.commit(SET_COUNT,row.num-1);
        this.getMusicUrl(this.getMusicListIds[this.getMusicCount])
        return;
      }
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
    },
    //更改当前音乐地址
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    //修改歌曲信息
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    //获取单首歌数据
    getSongListInfoSongs(id) {
      getSongListInfoSongs(id).then((res) => {
        res.songs[0].num = this.nums++;
        res.songs[0].dt = timeFormat(res.songs[0].dt);
        this.tableList.push(res.songs[0]);
      });
    },
  },
  computed:{
      ...mapGetters(["getMusicListIds", "getMusicCount"])
  },
  watch:{
    //监听vuex的歌单id是否改变
    getMusicListIds() {
      //遍历id获取数据
      if(this.getMusicListIds.length == 0) return;
      this.tableList = [];
      this.getMusicListIds.map((item) => {
        this.getSongListInfoSongs(item);
      });
    },
  },
  created() {
    if (this.getMusicListIds.length > 0) {
      this.tableList = [];
      this.getMusicListIds.map((item) => {
        this.getSongListInfoSongs(item);
      });
    }
  },
};
</script>