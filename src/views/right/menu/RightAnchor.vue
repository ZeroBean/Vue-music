<template>
  <div class="rt-anchor">
    <SwiperAnchor :swipers="banners"></SwiperAnchor>
    <TitleIcon></TitleIcon>
    <div class="content">
      <TitleHeader
        name="精选电台"
        style="margin: 0 auto"
        path="/hotAnchor"
      ></TitleHeader>
      <Card
        v-for="item in recommends"
        :key="item.id"
        :item="item"
        :wth="23"
      ></Card>
      <TitleHeader
        name="付费精选"
        style="marginTop: 50px"
        path="/payAnchor"
      ></TitleHeader>
      <PayCard v-for="item in pays" :key="item.id" :item="item"></PayCard>
      <TitleHeader name="电台个性推荐" style="marginTop: 50px" :show="false">
      </TitleHeader>
      <Card
        v-for="(item, index) in PerRecommend"
        :key="index"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text">{{ item.name }}</div>
      </Card>
      <TitleHeader name="创作|翻唱" style="marginTop: 50px" path="/anchor2001">
      </TitleHeader>
      <Card
        v-for="item in creations"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text" >{{item.name}}</div>
      </Card>
      <TitleHeader name='3D|电子' style="marginTop:50px" path='/anchor10002'> </TitleHeader>
      <Card
        v-for="item in electrs"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text" >{{item.name}}</div>
      </Card>
      <TitleHeader name='音乐故事' style="marginTop:50px" path='/anchor2'> </TitleHeader>
      <Card
        v-for="item in musicStory"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text" >{{item.name}}</div>
      </Card>
      <TitleHeader name='情感调频' style="marginTop:50px" path='/anchor3'> </TitleHeader>
      <Card
        v-for="item in emotions"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text" >{{item.name}}</div>
      </Card>
       <TitleHeader name='二次元' style="marginTop:50px" path='/anchor3001'> </TitleHeader>
       <Card
        v-for="item in animation"
        :key="item.id"
        :item="item"
        :wth="15"
        :topShow="false"
        :userShow="false"
      >
        <div slot="btm-text" class="slot-text" >{{item.name}}</div>
      </Card>
    </div>
  </div>
</template>

<script>
import SwiperAnchor from "components/common/swiper/SwiperAnchor";
import TitleIcon from "components/common/anchor/TitleIcon";
import TitleHeader from "components/common/titleheader/TitleHeader";
import Card from "components/common/anchor/Card";
import PayCard from "components/common/anchor/PayCard";
import {
  getAnchorBanner,
  getAnchorRecommend,
  getAnchorPay,
  getAnchorPerRecommend,
  getAnchorCateList,
  getAnchorType,
} from "network/anchor";
export default {
  name: "RightAnchor",
  components: {
    SwiperAnchor,
    TitleIcon,
    TitleHeader,
    Card,
    PayCard,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      pays: [],
      PerRecommend: [],
      creations: [],
      cate: [],
      electrs:[],
      musicStory:[],
      emotions:[],
      animation:[],
    };
  },
  methods: {
    //获取主播banner数据
    getAnchorBanner() {
      getAnchorBanner().then((res) => {
        // console.log(res);
        this.banners = res.data;
        // console.log(this.banners);
      });
    },
    //获取精选电台信息
    getAnchorRecommend() {
      getAnchorRecommend().then((res) => {
        // console.log(res);
        this.recommends = res.djRadios.splice(4, 4);
        // console.log(this.recommends);
      });
    },
    //获取付费精选
    getAnchorPay() {
      getAnchorPay().then((res) => {
        // console.log(res);
        this.pays = res.data.list;
        // console.log(this.pays);
      });
    },
    //获取个性推荐电台
    getAnchorPerRecommend() {
      getAnchorPerRecommend().then((res) => {
        // console.log(res.data);
        this.PerRecommend = res.data;
        // console.log(this.PerRecommend);
      });
    },

    //获取电台分类
    getAnchorCateList() {
      getAnchorCateList().then((res) => {
        // console.log(res);
        res.categories.map((item) => {
          this.cate.push({ name: item.name, id: item.id });
        });
        console.log(this.cate);
      });
    },
    //获取创作翻唱
    getCreations(id) {
      getAnchorType(id).then((res) => {
        // console.log(res);
        this.creations = res.djRadios.splice(0, 6);
        // console.log(this.creations);
      });
    },
    //获取3D/电子
    getElectr(id){
      getAnchorType(id).then((res) => {
        // console.log(res);
        this.electrs = res.djRadios.splice(0, 6);
        // console.log(this.electrs);
      });
    },
    //获取音乐故事
    getMusicStory(id){
      getAnchorType(id).then(res=>{
        this.musicStory = res.djRadios.splice(0,6);
        // console.log(this.electrs);
      })
    },
    //获取情感电台
    getEmotion(id){
      getAnchorType(id).then(res=>{
        this.emotions = res.djRadios.splice(0,6);
        // console.log(this.emotions);
      })
    },
    //获取二次元
    getAnimation(id){
      getAnchorType(id).then(res=>{
        this.animation = res.djRadios.splice(0,6);
        console.log(this.animation);
      })
    }
  },
  created() {
    this.getAnchorBanner();
    this.getAnchorRecommend();
    this.getAnchorPay();
    this.getAnchorPerRecommend();
    this.getAnchorCateList();
    this.getCreations(2001); //创造翻唱ID为2001
    this.getElectr(10002);
    this.getMusicStory(2);
    this.getEmotion(3);
    this.getAnimation(3001);
  },
};
</script>

<style scoped>
.rt-anchor {
  width: 95%;
  max-height: 590px;
  overflow: auto;
  margin: 0 auto;
  padding-bottom: 30px;
}

.content {
  width: 85%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>