<template>
  <div class="rt-sing" ref="tablell">
    <div class="sing-title">
      <div class="title-o">
        <TitleBox :titles="titleOne" @changeClass="changeOne"></TitleBox>
        <TitleBox :titles="titleTwo" name="分类" @changeClass="changeTwo"></TitleBox>
        <TitleBox :titles="titleThree" name="筛选" @changeClass="changeThree"></TitleBox>
      </div>
      <div class="singers">
        <SingerCard
          v-for="item in singerAll"
          :key="item.id"
          :cards="item"
        ></SingerCard>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBox from "components/common/singerlist/TitleBox";
import SingerCard from "components/common/singerlist/SingerCard";
import { getSinger } from "network/singer";
export default {
  name: "RightSinger",
  components: {
    TitleBox,
    SingerCard,
  },
  data() {
    return {
      titleOne: ["华语", "欧美", "日本", "韩国", "其他"],
      titleTwo: ["全部", "男歌手", "女歌手", "乐队组合"],
      titleThree: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      singerAll: [],
      offset: 0, //偏移量
      limit: 20, //每次取数据的量
      id1: -1,
      id2: -1,
      id3: -1,
    };
  },
  methods: {
    getSinger(area, tpye, initial, limit, offset) {
      getSinger(area, tpye, initial, limit, offset).then((res) => {
        //   console.log(res.artists);
        this.singerAll.push(...res.artists);
        console.log(this.singerAll);
      });
    },

    //改变语种
    changeOne(name) {
    //   console.log(name);
      switch (name) {
        case "欧美":
          this.id1 = 96;
          break;
        case "华语":
          this.id1 = 7;
          break;
        case "日本":
          this.id1 = 8;
          break;
        case "韩国":
          this.id1 = 16;
          break;
        case "其他":
          this.id1 = 0;
          break;
        default:
          this.id1 = -1;
      }
      (this.singerAll = []),
        //   console.log(this.singerAll);
        //   console.log(this.id1);
        (this.offset = 0);
      this.getSinger(this.id1, this.id2, this.id3, this.limit, this.offset);
      this.offset+=this.limit;
    },
    //改变分类
    changeTwo(name){
        // console.log(name);
        switch (name){
            case '男歌手':
                this.id2 = 1;
                break;
            case '女歌手':
                this.id2 = 2;
                break;
            case '乐队组合':
                this.id2 = 3;
                break;
            default:
                this.id2 = -1
        }
        this.singerAll=[]
        this.offset = 0;
        this.getSinger(this.id1, this.id2, this.id3, this.limit, this.offset);
        this.offset+=this.limit;

    },
    //改变姓氏
    changeThree(name){
        switch(name){
            case '#':
                this.id3 = 0;
                break;
            case '热门':
                this.id3 = -1;
                break;
            default:
                this.id3 = name.toLowerCase();
        }
        this.singerAll=[];
        this.offset = 0;
        this.getSinger(this.id1, this.id2, this.id3, this.limit, this.offset);
        this.offset+=this.limit;
    },
    handleScroll() {
      let scrollHeight = this.$refs.tablell.scrollHeight; //整个DIV的内容,包括溢出高度
      let scrollTop = this.$refs.tablell.scrollTop; //滚动高度
      let clientHeight = this.$refs.tablell.clientHeight;
      if (scrollHeight - clientHeight == scrollTop && this.offset <= 60) {
        console.log("到底了");
        console.log(this.offset);
        this.offset += this.limit;
        this.getSinger(this.id1, this.id2, this.id3, this.limit, this.offset);
      }
    },
  },
  created() {
    this.getSinger(this.id1, this.id2, this.id3, this.limit, this.offset);
    this.offset+=this.limit;
  },
  mounted() {
    // console.log("进入");
    this.$refs.tablell.addEventListener("scroll", this.handleScroll, true);
  },
  beforeDestroy() {
    // console.log("离开了");
    this.$refs.tablell.removeEventListener("scroll", this.handleScroll, true);
  },
};
</script>

<style scoped>
.rt-sing {
  width: 100%;
  max-height: 600px;
  overflow: auto;
  padding-bottom: 20px;
}
.sing-title {
  width: 95%;
  margin: 0 auto;
}
.title-o {
  width: 90%;
  font-size: 13px;
}

.singers {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>