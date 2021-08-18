<template>
  <div class="rt-songs" ref="scoll">
    <el-dropdown @command="handleCommand">
      <el-button size="mini">
        音乐
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in catt"
          :key="index"
          :index="index"
          :command="item.name"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="title">
        <span>热门标签:</span>
        <span
            v-for="(item,index) in catlist"
            :key="index"
            style="cursor:pointer;"
            :class="[curIndex===index?'active':'']"
            @click="changeMusicListCat(item.name,index)"
        >{{item.name}}
            <i style="paddingLeft:8px;color:#666;">
                {{index===catlist.length-1?'':'|'}}
            </i>
        </span>
    </div>
    <div class="songsList">
        <MusicListItem
            v-for="(item,index) in songsList"
            :key="index"
            :item="item"
            :wth="18"
            :topShow="false"
            :userShow="false"
        ></MusicListItem>
        <el-pagination
            layout="prev,pager,next"
            :page-size="limit"
            :total="totals"
            @current-change="handleCurrentChange"
            style="textAlign:center;margin:0 auto;marginBottom:20px"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getSongListCatlist,getSongsList } from "network/songs";
import MusicListItem from "components/common/musiclist/MusicListItem";
export default {
  name: "RightSongs",
  components: {
      MusicListItem
  },
  data() {
    return {
      catt: [],
      catlist: [],
      curIndex:0,
      songsList:[],
      totals:0,
      limit:30,
      cat:"全部",
      offset:0
    };
  },
  methods: {
      //获取歌单分类
    getSongListCatlist() {
      getSongListCatlist().then((res) => {
        // console.log(res.tags))
        this.catlist = res.tags.splice(0, 10);
        const arr = [...this.catlist];
        this.catt = arr.splice(0,5)
      });
    },
    //获取歌单
    getSongsList(limit=30,offset,cat){
        getSongsList(limit,offset,cat).then(res=>{
            console.log(res);
            this.songsList = res.playlists;
            this.totals = res.total;
        })
    },
    //切换分类
    changeMusicListCat(name,index){
    //    console.log(name,index);
        this.curIndex = index;
        this.cat = name;
        this.getSongsList(this.limit, this.offset, this.cat);
    },
    //切换页码
    handleCurrentChange(newPage){
        this.offset = (newPage-1) *this.limit;
        this.getSongsList(this.limit,this.offset,this.cat)
        //返回列表顶部
        this.$refs.scoll.scrollTop = 0;
    },
    //下拉菜单项点击回调处理
    handleCommand(command,index){
        console.log(command,index);
        this.curIndex = index.$attrs.index;
        this.cat = command;
        this.getSongsList(this.limit,this.offset,this.cat)
    }
    //菜单组件点击跳转详情页还没做
  },
  created() {
    this.getSongListCatlist();
    this.getSongsList(this.limit,this.offset,this.cat);
  },
};
</script>

<style scoped>
.active{
    color:red;
}
.rt-songs {
  width: 90%;
  height: 620px;
  max-height: 620px;
  overflow: auto;
  margin: 0 auto;
  padding-right: 30px;
}
.title{
    font-size: 13px;
    margin-top: 8px;
}
.title span{
    margin: 0 8px;
}
.songsList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>