<template>
  <div class="single" ref="scroll">
    <div class="single-main">
      <div class="single-top">
        <div class="bck-img">
          <img :src="getNowMusicMenu.al.picUrl" alt="" />
        </div>
        <div class="single-play-img">
          <div class="play-bar" ref="playBar">
            <img src="~assets/img/playMusic/player_bar.png" alt="404" />
          </div>
          <div class="play-disc" ref="playDisc">
            <img src="~assets/img/playMusic/disc.png" alt="404" />
            <div class="disc-img">
              <img :src="getNowMusicMenu.al.picUrl" alt />
            </div>
          </div>
          <div class="btn">
            <el-button size="mini" icon="el-icon-circle-plus-outline"
              >喜欢</el-button
            >
            <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
            <el-button size="mini" icon="el-icon-thumb">分享</el-button>
            <el-button size="mini" icon="el-icon-download">vip下载</el-button>
          </div>
        </div>
        <div class="singer-text">
          <div class="single-title">
            <span style="fontSize: 25px; color: #000; marginRight: 10px">{{
              getNowMusicMenu.name || getNowMusicMenu.al.name
            }}</span>
            <span
              style="
                border: 1px solid red;
                fontSize: 12px;
                color: red;
                padding: 1px 4px;
              "
              >标准音质</span
            >
            <div style="margin: 19px 0; fontSize: 13px">
              专辑：
              <span style="color: #2559a4">{{
                getNowMusicMenu.alia[0] || getNowMusicMenu.al.name
              }}</span>
              歌手:
              <span style="color: #2559a4">{{
                getNowMusicMenu.ar[0].name
              }}</span>
            </div>
          </div>
          <div class="lyric">
            <!-- 歌词部分 -->
            <div
              style="
                width: 350px;
                height: 350px;
                overflow: auto;
                marginTop: 25px;
                transition: scrollTop 0.3s;
              "
              ref="lyricScroll"
            >
              <ul ref="lyric">
                <li
                  v-for="(item,index) in lrcObject"
                  :key="index"
                  :style="{color: lyricIndex === index ? 'red' : 'black'}"
                  :ref="[lyricIndex === index ? 'lyricRef' : '']"
                >
                {{item.c}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="single-back">
          <el-button @click="comBack" icon="el-icon-copy-document" size="small"></el-button>
        </div>
      </div>
      <div class="single-btm">
        <div class="singer-left">
          <TitleHeader name="听友评论" :show="false" style="marginBottom:20px"></TitleHeader>
          <MvComment :comments="lyricComment"></MvComment>
          <el-pagination
            background
            :page-size="limit"
            layout="prev, next"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <div class="singer-right"></div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { getSongLyric,getSongLyricComment } from "network/home";
import TitleHeader from "components/common/titleheader/TitleHeader";
import MvComment from "components/common/singerlist/MvComment";
export default {
  name: "singleSong",
  components:{
    TitleHeader,
    MvComment
  },
  computed: {
    ...mapGetters([
      "getNowMusic",
      "getNowMusicMenu",
      "getDuration",
      "getIsPlay",
    ]),
  },
  data() {
    return {
      lyrics: "",
      lrcObject:{},
      lyricIndex:0,//歌词相对于存储数组的位置
      limit:20,//歌曲评论每页大小
      offset:0,//获取偏移量
      lyricComment: [],
      routeNum: 0,//旋转角度
      timerId: 0,//旋转定时器
      duration:0,//歌曲时长
    };
  },
  methods: {
    //请求歌词
    getSongLyric(id) {
      getSongLyric(id).then((res) => {
        // console.log(res.lrc.lyric);
        this.lyrics = res.lrc.lyric;
        this.createLrcObj(this.lyrics);
      });
    },
    //解析歌词
    createLrcObj(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n");//用回车拆分成数组 (每一句歌词都用换行隔开了)
      // console.log(lrcs[0]);
      for(let i in lrcs){
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, "");//去除前后的空格
        let arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
        let start=0;
        for(let k in arr){
          start+=arr[k].length;//获取歌词内容的起始位置，方便后去截取
        }
        let content = lrcs[i].substring(start);//截取歌词内容
        //下一步截取歌词时间节点
        for(let k in arr){
          let t = arr[k].substring(1,arr[k].length - 1)
          let s = t.split(":");
          oLRC.ms.push({
            t:(parseFloat(s[0])*60 + parseFloat(s[1])).toFixed(3),
            c: content===""?".............." : content,
          })
        }
      }
      oLRC.ms.sort((a,b)=>a.t-b.t)
      // for (var i in oLRC) {
      //   //查看解析结果
      //   console.log(i, ":", oLRC[i]);
      // }
      this.lrcObject = oLRC.ms;
    },
    comBack() {
      //   console.log("返回");
      //   console.log(this.$route);
      this.$router.back();
    },
    //获取歌词评论
    getSongLyricComment(id,limit,offset){
      getSongLyricComment(id,limit,offset).then(res=>{
        console.log(res);
        this.lyricComment = res.comments;
      })
    },
    //评论翻页
    handleCurrentChange(newPage){
      this.offset = (newPage - 1) * this.limit;
      this.getSongLyricComment(this.getNowMusicMenu.id,this.limit,this.offset);
      this.$refs.scroll.scrollTop = 530;
    },
    //唱片旋转
    routeDeg() {
      let playDisc = this.$refs.playDisc;
      playDisc.style.transform = "rotateZ(" + this.routeNum + "deg)";
      this.routeNum += 4;
    },
  },
  created() {
    this.getSongLyric(this.getNowMusicMenu.id);
    this.getSongLyricComment(this.getNowMusicMenu.id);
    this.timerId = setInterval(this.routeDeg,167)
  },
  watch:{
    getIsPlay(){
      if(this.getIsPlay){
        //如果播放
        clearInterval(this.timerId)
        this.timerId = setInterval(this.routeDeg,167);
        let playBar = this.$refs.playBar;
        playBar.style.transform = "rotate(0deg)";
      } else {
        clearInterval(this.timerId);
        let playBar = this.$refs.playBar;
        playBar.style.transform = "rotate(-30deg)";
      }
    },
    //歌词进度条
    getDuration(){
      //获取当前歌曲时长
      this.duration = this.getDuration;
      //遍历歌词组
      //使用循环找到最接近当前播放时间的歌词
      for(let i =0;i<this.lrcObject.length;i++){
        if(this.getDuration<=parseFloat(this.lrcObject[i].t)){
          if(this.lyricIndex===i-1){
            break
          }
          this.lyricIndex = i-1;
          if (
            this.$refs.lyricScroll.scrollTop + 55 >
            this.$refs.lyricRef[0].offsetTop
          ) {
            console.log("不自动滑动");
          } else {
            if (this.$refs.lyricRef[0].offsetTop > 175) {
              this.$refs.lyricScroll.scrollTop =
                this.$refs.lyricRef[0].offsetTop - 175;
            }
          }
          //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
          if (this.lyricIndex === this.lrcObject.length - 1) {
            this.lyricIndex = 0;
          }
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #cecdd3;
  border-radius: 3px;
}


.single {
  width: 100%;
  height: 630px;
  padding-top: 20px;
  overflow: auto;
}
.single-main {
  width: 80%;
  margin: 0 auto;
}
.single-top {
  display: flex;
  position: relative;
}
.bck-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.bck-img img {
  width: 100%;
  filter: blur(80px);
  max-height: 400px;
  border-radius: 50%;
}
.single-play-img {
  margin-left: 35px;
  position: relative;
}
.play-bar {
  position: absolute;
  top: -30px;
  left: 120px;
  z-index: 10;
  transform: rotate(0deg);
  transform-origin: left top;
  transition: transform 0.5s;
}
.play-disc {
  position: relative;
  margin-top: 30px;
  width: 254px;
  height: 255px;
}
.disc-img {
  position: absolute;
  top: 57px;
  left: 58px;
  width: 140px;
  height: 140px;
}
.disc-img img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}

.btn {
  display: flex;
  margin-top: 30px;
}

.singer-text {
  margin-left: 100px;
}

/* 歌词列表的样式 */
li {
  margin-top: 15px;
}
.lyric{
  position: relative;
  z-index: 199;
}

.single-back {
  position: absolute;
  top: 0;
  right: -100px;
}
</style>
