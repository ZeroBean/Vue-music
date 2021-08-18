<template>
  <div class="topListCard">
    <div
      class="card-top"
      :style="{
        background:
          'url(' + cards.coverImgUrl + ') no-repeat 0 -65px/300px 215px',
        height: '90px',
      }"
    >
      <span class="card-time">{{ cards.updateTime }}更新</span>
      <i class="el-icon-caret-right top-play"></i>
    </div>
    <div class="card-table">
      <div class="card-row" v-for="(item, index) in songRes" :key="index">
        <div class="card-left">
          <div class="card-num">{{ item.num }}</div>
          <!-- <div class="card-hot">392%</div> -->
          <div class="card-song">{{ item.name }}</div>
          <div class="card-lafter">
            {{ item.alia[0] === undefined ? "" : "(" + item.alia[0] + ")" }}
          </div>
        </div>
        <div class="card-sing">{{ item.ar[0].name }}</div>
      </div>
    </div>
    <div class="card-bottom" style="padding: 10px">
      <a
        style="color: #999; fontsize: 12px"
        href="#"
        @click.prevent="togSongList"
        >查看全部＞</a
      >
    </div>
  </div>
</template>

<script>
import { getSongListInfo, getSongListInfoSongs } from "network/home";
// import { formatDate } from "common/uctil";
export default {
  name: "TopListCard",
  props: {
    cards: {
      type: Object,
      default() {
        return {};
      },
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      songs: [],
      songId: [],
      songRes: [],
      nums: 1,
    };
  },
  methods: {
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        // console.log(res);
        this.songs = res.privileges.splice(0, 8);
        // console.log(this.songs);
        this.songs.map((item) => {
          this.songId.push(item.id);
        });
        this.songId.map((item) => {
          getSongListInfoSongs(item).then((res) => {
            console.log(res.songs[0]);
            res.songs[0].num = this.nums++;
            this.songRes.push(res.songs[0]);
            console.log(this.songRes);
          });
        });
      });
    },
  },
  created() {
    this.getSongListInfo(this.id);
  },
  //   filters: {
  //     showDate: function (value) {
  //       let date = new Date(value);
  //       return formatDate(date, "MM月dd日");
  //     },
  //   },
};
</script>

<style scoped>
.topListCard {
  width: 300px;
  border: 1px solid #ccc;
  position: relative;
  margin-top: 20px;
}
.card-top {
  position: relative;
}
.card-top img {
  width: 100%;
}
.card-time {
  position: absolute;
  bottom: 8px;
  left: 20px;
  color: rgba(255, 255, 2552, 0.7);
  font-size: 14px;
}

.top-play {
  font-size: 20px;
  padding: 5px;
  color: #fff;
  position: absolute;
  bottom: 5%;
  left: 87%;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

.card-row {
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  line-height: 30px;
  background: #fafafa;
  cursor: pointer;
  user-select: none;
}

.card-left {
  display: flex;
  justify-content: space-around;
}

.card-left > div {
  margin: 0 2px;
}

.card-num {
  font-size: 18px;
  color: red;
  font-weight: bold;
}

.card-lafter {
  margin: 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
.card-song {
  color: #666;
  font-size: 13px;
  overflow: hidden;
}
.card-sing {
  font-size: 12px;
  margin-right: 5px;
  font-size: 14px;
  color: #999;
  overflow: hidden;
}
</style>