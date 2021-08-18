<template>
  <div class="titleIcon">
    <div class="tt-item" v-for="(item, index) in cateList" :key="index" @click="handleclick">
        <div class="img">
            <img :src="item.picIPadUrl" alt="404">
        </div>
        <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
import { getAnchorCateList } from "network/anchor";
export default {
  name: "TitleIcon",
  data() {
    return {
      cateList: [],
    };
  },
  methods: {
    //获取电台分类
    getAnchorCateList() {
      getAnchorCateList().then((res) => {
        // console.log(res);
        this.cateList = res.categories.splice(0,5);
      });
    },
    //点击跳转后续做
    handleclick(){}
  },
  created() {
    this.getAnchorCateList();
  },
};
</script>

<style scoped>
.titleIcon{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.tt-item{
    width: 16%;
    text-align: center;
    cursor: pointer;
    font-size: 13px;
    color:rgba(255, 0, 0, 0.7);
    margin: 0 50px;
    padding: 10px 0;
}
.img img{
    width: 35px;
    height: 35px;
}
</style>