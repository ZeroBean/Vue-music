<template>
    <div class="singcard">
        <div class="sing-img">
            <img :src="cards.img1v1Url">
        </div>
        <div class="sing-bottom">
            <a href="" style="color:red">{{cards.name}}</a>
            <a href="">
                <i :class="[cards.accountId===undefined?'':'el-icon-user s-user']"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:'SingerCard',
    props:{
        cards:{
            type:Object,
            default(){
                return{}
            }
        }
    }
}
</script>

<style scoped>
.singcard{
    width: 17%;
    margin-top: 15px;
    margin-right: 5px;
}
.singcard>div{
    width: 100%;
}
.sing-img img{
    width: 100%;
}
.sing-bottom{
    margin-top: 8px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
}
.s-user{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #5292fe;
    text-align: center;
    line-height: 15px;
}
</style>