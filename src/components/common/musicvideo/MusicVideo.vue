<template>
  <div class="musicvideo" ref="scroll">
    <div class="musicvideo-main">
      <div class="musicvideo-btn">
        <el-button
          :class="[isTog ? 'active' : '']"
          size="small"
          round
          @click.native="toVideo"
          >视频</el-button
        >
        <el-button
          :class="[isTog ? '' : 'active']"
          size="small"
          round
          @click.native="togMv"
          >MV</el-button
        >
      </div>
      <div class="title">
        <span>热门标签:</span>
        <span
          v-for="(item, index) in catlist"
          :key="index"
          style="cursor: pointer"
          :class="[curIndex === index ? 'actived' : '']"
          @click="changeMusicListCat(index)"
        >
          {{ item.name }}
          <i style="paddingLeft: 8px; color: #666">{{
            index === catlist.length - 1 ? "" : "|"
          }}</i>
        </span>
      </div>
      <div class="videosList">
        <VideoItem
          v-for="item in videosList"
          :key="item.id"
          :item="item.data"
          :wth="24"
          :topShow="false"
          :userShow="true"
          v-show="isTog"
        ></VideoItem>
        <MusicListItem
          v-for="(item,index) in mvList"
          :key="index"
          :item="item"
          :wth="24"
          :topShow="false"
          :userShow="true"
          :mvType="true"
          v-show="!isTog"
        ></MusicListItem>
        <el-pagination
        layout="prev, pager, next"
        :page-size="limit"
        :total="totals"
        @current-change="handleCurrentChange"
        style="textAlign:center;margin:0 auto;marginBottom:20px"
      ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoTitle,getVideoGroups,getVideoAll } from "network/musicvideo";
import VideoItem from "components/common/musicvideo/VideoItem";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  name: "MusicVideo",
  data() {
    return {
      isTog: true,
      catlist: [], //标签
      videoCatList:[],//video标签
      curIndex: 0, //标签下标
      titleIds:[],//标签ID
      // flag:false,请求titleIds是否完成
      videosList:[],//视频列表
      limit:20,
      offset:0,
      totals:0,//获取总数
      mvList:[],
      mvTitles: [
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "韩国" },
        { name: "日本" },
      ],//mv标签接口未找到 自己写的
    };
  },
  components:{
    VideoItem,
    MusicListItem
  },
  methods: {
    //切换 视频页面
    toVideo(){
      if(this.isTog) return;
      this.isTog = true;
      this.curIndex = 0;
      this.offset = 0;
      this.totals = 0;
      console.log(this.videoCatList);
      this.catlist = this.videoCatList;
    },
    //切换MV页面
    togMv(){
      if(!this.isTog) return;//isTog 为假就返回,isTog为真则是视频，isTog为假则是MV
      this.isTog = false;
      //重置参数
      this.totals = 0;
      this.curIndex = 0;
      this.offset = 0;
      this.getVideoAll(
        this.mvTitles[this.curIndex].name,
        this.limit,
        this.offset
      );
      this.catlist = this.mvTitles;
    },
    //切换视频标签
    changeMusicListCat(index){
      if(this.isTog){
        this.curIndex = index;
        this.offset = 0;
        this.getVideoGroups(this.titleIds[index],this.offset)
      }else{
        this.curIndex = index
        this.offset = 0;
        this.totals = 0;
        this.getVideoAll(
          this.mvTitles[index].name,
          this.limit,
          this.offset
        )
      }
    },
    //获取视频标签
     getVideoTitle() {
      getVideoTitle().then((res) => {
            console.log(res);
            this.videoCatList = res.data.splice(0, 9);
            this.videoCatList.map(item=>{
              this.titleIds.push(item.id)
            })
            if(this.titleIds.length===9){
              this.getVideoGroups(this.titleIds[this.curIndex],this.offset)
            }
            // console.log(this.titleIds);
            this.catlist = this.videoCatList
          });
    },
    //获取标签ID后再获取视频组
    getVideoGroups(id,offset) {
      getVideoGroups(id,offset).then(res=>{
        console.log(res)
        this.videosList=[];
        this.videosList.push(...res.datas);
        // console.log(this.videosList);
      })
    },
    //获取所有MV
    getVideoAll(area, limit, offset){
      getVideoAll(area, limit, offset).then(res=>{
        //只在第一次即totals=0的时候设置总数
        console.log(res);
        if(this.totals===0){
          this.totals = res.count;
        }
        this.mvList = res.data;
      })
    },
    handleCurrentChange(newPage){
      this.offset = (newPage-1) *this.limit;
      if(this.isTog){
        this.getVideoGroups(this.titleIds[this.curIndex],this.offset)
      }
      this.getVideoAll(
        this.mvTitles[this.curIndex].name,
        this.limit,
        this.offset
      )
    },
  },
  created() {
    this.getVideoTitle()
  },
};
</script>

<style scoped>
.musicvideo {
  width: 100%;
  padding-top: 20px;
  overflow: auto;
  max-height: 630px;
}
.active {
  background: skyblue;
  color: #f5f5f7;
}
.musicvideo-main {
  width: 90%;
  margin: 0 auto;
}
.musicvideo-btn {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.title {
  font-size: 13px;
  margin-top: 15px;
  color: #888;
}
.actived {
  color: red;
}

.videosList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>