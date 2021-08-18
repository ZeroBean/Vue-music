<template>
  <div class="rt-list">
    <div class="rt-content">
      <TitleHeader
        name="官方榜"
        style="marginTop: 20px; width: 100%"
        :show="false"
      ></TitleHeader>
      <TopListCard
        v-for="(item, index) in allMes"
        :key="index"
        :cards="item"
        :id="item.id"
      ></TopListCard>
      <TitleHeader
        name="全球榜"
        style="marginTop: 30px; width: 100%"
        :show="false"
      ></TitleHeader>
      <div class="rt-card">
        <MusicListItem
          v-for="(item, index) in globalList"
          :key="index"
          :item="item"
          :wth="18"
          :topShow="false"
          :userShow="false"
          style="marginRight: 10px"
        ></MusicListItem>
      </div>
    </div>
  </div>
</template>

<script>
import TitleHeader from "components/common/titleheader/TitleHeader";
import TopListCard from "components/common/toplist/TopListCard";
import MusicListItem from "components/common/musiclist/MusicListItem";
import { getTopList } from "network/toplist";
export default {
  name: "RightList",
  components: {
    TitleHeader,
    TopListCard,
    MusicListItem,
  },
  data() {
    return {
      globalList: [], //全部榜单
      allMes: [], //获取榜单的前六个
    };
  },
  methods: {
    getTopList() {
      getTopList().then((res) => {
        this.globalList = res.list;
        this.allMes = res.list.splice(0, 6);
        console.log(this.allMes);
      });
    },
  },
  created() {
    this.getTopList();
  },
};
</script>

<style scoped>
.rt-list {
  width: 95%;
  max-height: 580px;
  margin: 0 auto;
  overflow: auto;
  padding-bottom: 40px;
}
.rt-content {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.rt-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>