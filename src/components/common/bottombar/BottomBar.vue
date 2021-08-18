<template>
  <div id="btmbar">
    <div>
      <div class="scroll">
        <el-slider
          v-model="musicDuration"
          :max="totalDuration"
          :show-tooltip="false"
          :disabled="isUrl"
          @change="musicDurationChange"
        ></el-slider>
      </div>
      <div class="content">
        <div class="left">
          <div class="singimg">
            <a href="javascript:void(0)" @click.stop="togSingel">
              <div class="s-img">
                <img :src="getNowMusicMenu.al.picUrl" alt="" />
                <div class="m-img">
                  <a href="javascript:void(0)" @click.stop="togSingel"></a>
                  <i
                    class="el-icon-arrow-up"
                    style="color: rgba(255, 255, 255, 0.8)"
                  ></i>
                  <i
                    class="el-icon-arrow-up"
                    style="
                      color: rgba(255, 255, 255, 0.8);
                      position: absolute;
                      top: 12px;
                      left: 13px;
                    "
                  ></i>
                </div>
              </div>
            </a>
          </div>
          <div class="sing">
            <div>
              <a href="">
                {{ getNowMusicMenu.ar[0].name }} -
                {{ getNowMusicMenu.name || getNowMusicMenu.al.name }}
              </a>
            </div>
            <div class="sing-time">
              <span>{{ musicDuration | showTime }}</span
              >/
              <span>{{ getTime }}</span>
            </div>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-star-off" v-show="true"></i>
              <i class="el-icon-star-on" v-show="false"></i>
            </span>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-download"></i>
            </span>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-chat-dot-square"></i>
            </span>
          </div>
          <div class="icon">
            <span style="cursor: pointer">
              <i class="el-icon-more-outline"></i>
            </span>
          </div>
        </div>
        <div class="play">
          <div class="pre" @click="preMusic">
            <span style="cursor: pointer">
              <i class="el-icon-caret-left"></i>
            </span>
          </div>
          <div class="start" @click="playMusic">
            <span style="cursor: pointer">
              <i class="el-icon-video-pause" v-show="isplay"></i>
              <i class="el-icon-video-play" v-show="!isplay"></i>
            </span>
          </div>
          <div class="next" @click="nextMusic">
            <span style="cursor: pointer">
              <i class="el-icon-caret-right"></i>
            </span>
          </div>
        </div>
        <div class="more">
          <div style="marginright: 30px" class="loundBox">
            <a href="#">
              <i class="el-icon-mic"></i>
            </a>
            <div class="lound">
              <el-slider
                v-model="value"
                vertical
                height="60px"
                size="mini"
                @change="volumeChange"
              ></el-slider>
            </div>
          </div>
          <el-button type="primary" class="more-btn">
            倍速
            <i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
          <el-button type="primary" class="more-btn">
            标准
            <i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
          <div>
            <a href="#">
              <i class="el-icon-sort"></i>
            </a>
          </div>
          <div>
            <a href="#">
              <i class="el-icon-close-notification"></i>
            </a>
          </div>
          <div>
            <span @click="showRightList" style="cursor: pointer">
              <i class="el-icon-s-unfold"></i>
            </span>
          </div>
        </div>
        <audio
          :src="getNowMusic"
          autoplay
          class="playMusicAudio"
          ref="audio"
        ></audio>
      </div>
    </div>
    <el-dialog
      :modal="false"
      :show-close="false"
      title="播放列表"
      :visible.sync="showRightDialog"
      width="23%"
      center
    >
      <LiterTable
        size="mini"
        :indexShow="false"
        :doShow="false"
        :anchorShow="false"
        :wth1="165"
        :wth2="130"
        :wth3="80"
      >
      </LiterTable
    ></el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { songTimeFormat, timeFormat } from "common/uctil";
import LiterTable from "components/common/songlist/LiterTable";
import { SET_PLAY, ADD_COUNT,NOW_MUSIC,NOW_MUSICMENU, SET_DURATION,CLEAR_COUNT,MINUS_COUNT} from "@/store/mutationType";
import { getMusicUrl, getMusicMenu } from "network/home";
export default {
  name: "BottomBar",
  components: {
    LiterTable,
  },
  data() {
    return {
      isplay: false, //播放状态
      musicDuration: 0, //音乐当前播放事件
      totalDuration: 100, //总时长
      isUrl: true, //设置无歌曲时进度条不可拖动
      value: 100, //音量
      showRightDialog: false, // 展示右边的歌单对话框
      debance:true,//简单防抖
    };
  },
  methods: {
    togSingel() {
      if (!this.getNowMusicMenu.id) return false;
      this.$router.push("/singleSong");
      return false;
    },
    preMusic() {
      if(this.getMusicListIds.length===0){
        console.log("最前面一首了")
      }
      this.$store.commit(MINUS_COUNT);
      this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
      this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
    },
    //播放和暂停音乐
    playMusic() {
      if (this.getNowMusic !== "") {
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
        this.isplay = !this.isplay;
        this.$store.commit(SET_PLAY, this.isplay);
      }
      return false;
    },
    //下一首音乐
    nextMusic() {
      // console.log(this.getMusicListIds)
      // console.log(this.getMusicCount)
      if (!this.getMusicListIds.length){
        console.log("没有下一首啦");
        return false;
      }
      this.$store.commit(ADD_COUNT);
      // console.log(this.getMuicCount);
      // console.log(this.getMusicListIds[this.getMuicCount])
      this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
      this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
      return false;
    },
    //获取音乐地址
    getMusicUrl(id){
      getMusicUrl(id).then(res=>{
        console.log(res);
        //获取到以后改变当前音乐
        this.$store.commit(NOW_MUSIC,res.data[0].url)
      })
    },
    //获取音乐信息菜单
    getMusicMenu(id){
      getMusicMenu(id).then(res=>{
        console.log(res);
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      })
    },
    //展示播放列表
    showRightList() {
      this.showRightDialog = true;
    },
    //改变音量
    volumeChange(){
      let audio = this.$refs.audio;
      audio.volume = this.value / 100;
    },
    //改变音乐进度条
    musicDurationChange(){
      let audio = this.$refs.audio;
      audio.currentTime = this.musicDuration;
      audio.addEventListener('timeupdate',()=>{
        this.totalDuration = audio.duration;
        this.musicDuration = audio.currentTime;
        this.$store.commit(SET_DURATION, audio.currentTime);
        // 音乐播放完以后自动下一首
        if(audio.currentTime>=audio.duration){
          if(this.debance){
            this.debance=false;
            this.nextMusic();
            setTimeout(()=>{
              this.debance = true;
            },400);
          }
        this.isplay  = true;
        this.$store.commit(SET_PLAY,this.isplay);
        }
      })


    }
  },
  computed: {
    ...mapGetters([
      "getNowMusicMenu", 
      "getNowMusic", 
      "getMusicListIds",
      "getMusicCount",
      ]),

    // 将音乐详情菜单的时间转换为标准时间
    getTime() {
      return timeFormat(this.getNowMusicMenu.dt);
    },
  },
  filters: {
    showTime(value) {
      return songTimeFormat(value);
    },
  },
  watch: {
    getNowMusic() {
      this.isplay = true;
      this.$store.commit(SET_PLAY, this.isplay);
      this.isUrl = false;
    },
    getMusicListIds(){
      this.$store.commit(CLEAR_COUNT);
      this.getMusicUrl(this.getMusicListIds[this.getMusicCount]);
      this.getMusicMenu(this.getMusicListIds[this.getMusicCount]);
    }
  },
  mounted(){
    this.musicDurationChange();
  }
};
</script>

<style>
.scroll .el-slider__bar {
  background-image: linear-gradient(to left, #a1c4fd 0%, #c2e9fb 100%);
}
.lound .el-slider__bar {
  background: linear-gradient(#a1c4fd 0%, #c2e9fb 100%);
}
.loundBox:hover .el-slider.is-vertical .el-slider__runway {
  display: block;
}
.lound .el-slider__button {
  width: 10px;
  height: 10px;
}
.lound .el-slider.is-vertical .el-slider__runway {
  width: 4px;
  display: none;
}
#btmbar .el-dialog{
  position: absolute;
  right: 260px;
  bottom: 80px;
  max-height: 600px;
  overflow: auto;
}
</style>

<style scoped>
#btmbar {
  position: relative;
  height: 70px;
  background: rgba(0, 0, 0, 0.6);
}
.scroll {
  width: 98%;
  position: absolute;
  top: -22px;
}

.content {
  display: flex;
  justify-content: space-between;
}
.content .left {
  display: flex;
}
.content .left > div {
  margin-left: 10px;
  margin-top: 10px;
}
.singimg img {
  width: 45px;
  height: 45px;
}
.s-img {
  position: relative;
}
.s-img:hover .m-img {
  display: block;
}
.m-img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 62px;
  font-size: 20px;
  border-radius: 5px;
  display: none;
}

.sing {
  padding-top: 8px;
  font-size: 14px;
}
.sing-time {
  margin-top: 8px;
  color: rgb(187, 192, 195);
}

.icon {
  padding-top: 15px;
  padding-left: 8px;
  font-size: 20px;
}
.play {
  display: flex;
  justify-content: space-between;
}
.play > div {
  font-size: 40px;
  margin-top: 10px;
}
.play i {
  color: #5192fe;
}

.more {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
}
.more-btn {
  padding: 0;
  width: 60px;
  height: 20px;
  background: none;
  color: #888;
  margin-right: 8px;
}
.more div i {
  margin-right: 10px;
  font-size: 16px;
  color: #888;
}
.more div:last-of-type {
  margin-right: 200px;
}
.lound {
  position: absolute;
  top: -26px;
  left: 10px;
}

</style>