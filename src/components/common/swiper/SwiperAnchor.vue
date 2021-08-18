<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in swipers" :key="index">
        <el-image
          :src="item.pic || item.imageUrl"
          fit="contain"
          style="height: 100%;"
        ></el-image>
        <el-tag
          :type="item.typeTitle !== '独家' ? 'danger' : 'primary'"
          effect="dark"
          style="
            position: absolute;
            top: 76%;
            right: 0;
            border-radius: 10px 0 0 10px;
            height: 19px;
            line-height: 19px;
          "
        >{{item.typeTitle}}</el-tag>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "SwiperAnchor",
  props: {
    swipers: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
      //点击进入播放后续再做
  }
};
</script>

<style scoped>
.swiper{
    width: 1000px;
    margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>