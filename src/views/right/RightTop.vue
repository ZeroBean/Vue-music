<template>
  <div class="rt-top">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick"> 
        <el-tab-pane
            class="tab-item"
            v-for="item in tabs"
            :key="item.name"
            :label="item.label"
            :name="item.name"
        >
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "righttop",
  data() {
    return {
      activeName: "/home/rtstyle",
      tabs: [
        { label: "个性推荐", name: "/home/rtstyle" },
        { label: "歌单", name: "/home/rtsongs" },
        { label: "主播电台", name: "/home/rtanchor" },
        { label: "排行榜", name: "/home/rtlist" },
        { label: "歌手", name: "/home/rtsinger" },
        { label: "最新音乐", name: "/home/rtnewsing" },
      ],
    };
  },
  methods:{
    handleClick(tab){
      console.log(tab);
      this.$router.replace(tab.name);
      this.activeName = tab.name;
    }
  }
};
</script>

<style>
.tabs .el-tabs__item {
  /* border: 1px solid white; */
  /* background: rgba(255, 255, 255, 0.5); */
  padding: 0 10px;
  text-align: center;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
<style scoped>
.rt-top {
  width: 100%;
  text-align: center;
}
.tabs {
  display: flex;
  justify-content: center;
}
</style>