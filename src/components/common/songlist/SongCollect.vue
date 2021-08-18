<template>
    <div class="collect">
        <div class="item" v-for="(item,index) in collects" :key="index">
            <img :src="item.avatarUrl" alt="">
            <p>{{item.nickname}}</p>
        </div>
    </div>
</template>

<script>
import {getSongListCollect} from 'network/home'
export default {
    name:'SongCollect',
    data(){
        return{
            id:0,
            collects:[]
        }
    },
    methods:{
        getSongListCollect(id){
            getSongListCollect(id).then(res=>{
                // console.log(res.subscribers);
                this.collects = res.subscribers;
                console.log(this.collects);
            })
        }
    },
    created(){
        this.id =parseInt(this.$route.params.id);
        this.getSongListCollect(this.id)
    }
}
</script>

<style scoped>
.collect{
    display: flex;
    flex-wrap: wrap;
}
.item{
    width: 120px;
    height: 120px;
    margin: 10px;
    overflow: hidden;
    font-size: 13px;
    color: red;
    text-align: center;
}
.item img{
    border-radius: 50%;
    width: 90px;
    height: 90px;
    margin-bottom: 9px;
}
</style>