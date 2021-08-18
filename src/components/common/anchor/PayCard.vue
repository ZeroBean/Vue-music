<template>
    <div class="payCard" style="width:48%;">
        <div class="pay-img">
            <a href="#">
                <img :src="item.picUrl" alt="">
            </a>
            <!-- <span class="time" v-if="timeShow">{{time| showDate}}...</span> -->
        </div>
        <div class="content">
            <p class="title">
                <a href="#">{{item.name}}</a>
            </p>
            <p>{{item.rcmdText || item.rcmdtext}}</p>
            <slot name="count">
                <p>{{item.lastProgramName}}</p>
            </slot>
            <p class="price" v-if="priceShow">￥{{item.originalPrice/100}}</p>
        </div>
    </div>
</template>

<script>
// import {getAnchorDetail} from 'network/anchor'
export default {
    name:'PayCard',
    data(){
        return{
            time:0
        }
    },
    props:{
        item:Object,
        default(){
            return {}
        },
        timeShow:{
            type:Boolean,
            default:true
        },
        priceShow:{
            type:Boolean,
            default:true
        }
    },
    // getAnchorDetail(){}
}
</script>

<style scoped>
.payCard{
    margin-top: 10px;
    padding-bottom: 8px;
    display: flex;
    border-bottom: 1px solid #ccc;
}
.pay-img{
    position: relative;
    width: 28%;
    margin-right: 8px;
}
.pay-img img{
    width: 100%;
}
.content p{
    font-size: 13px;
    color: #999;
    margin-bottom: 13px;
    padding-left: 5px;
}
.content p.title{
    margin: 8px 0 20px 0;
}
</style>