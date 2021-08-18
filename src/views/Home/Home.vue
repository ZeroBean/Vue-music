<template>
    <div id="home">
        <RightTop></RightTop>
        <keep-alive exclude="RightSinger">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import RightTop from 'views/right/RightTop'
export default {
    name: "Home",
    components:{
        RightTop
    }
}
</script>

<style scoped>
/* 先绑定滚动条样式 */
/* #home{
    overflow: auto;
} */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>