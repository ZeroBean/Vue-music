<template>
  <div class="centerall">
    <el-container class="ct-container">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
        <LeftMenu></LeftMenu>
      </el-aside>
      <div class="con-all" v-loading="false">
        <!-- <transition :name="transitionName">
          <keep-alive> -->
            <router-view></router-view>
          <!-- </keep-alive>
        </transition> -->
      </div>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "views/left/LeftMenu";
export default {
  name: "CenterAll",
  components: {
    LeftMenu,
  },
  // data(){
  //     return{
  //         transitionName: "",
  //     }
  // }
};
</script>

<style scoped>
.centerall {
  position: relative;
  width: 100%;
  max-height: 680px;
  height: 680px;
}
.ct-container {
  width: 100%;
  height: 680px;
  border: 1px solid #eee;
}

.con-all{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-height: 680px;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>