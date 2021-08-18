<template>
  <div class="main">
    <div class="back-img">
      <img
        src="./assets/img/bg/bg.jpg"
        alt=""
        style="width: 100%; filter: blur(80px)"
      />
    </div>
    <div id="app">
      <TopBar></TopBar>
      <CenterAll class="center-m"></CenterAll>
      <BottomBar class="btm-b"></BottomBar>
    </div>
  </div>
</template>
<script>
import "./assets/css/reset.css"
import TopBar from 'components/common/topbar/TopBar.vue'
import CenterAll from 'views/center/CenterAll'
import BottomBar from "components/common/bottombar/BottomBar";
export default {
  name: "APP",
  components:{
    TopBar,
    CenterAll,
    BottomBar
  }
};
</script>
<style lang="scss">
.center-m {
  position: relative;
}
.btm-b {
  position: relative;
}
.main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
#app {
  width: 1400px;
  margin: 0 auto;
  margin-top: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
}
// 背景图样式
.back-img {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.back-img img {
  width: 100%;
}
// 中间部分样式
.center-m{
  position: relative;
}
</style>
