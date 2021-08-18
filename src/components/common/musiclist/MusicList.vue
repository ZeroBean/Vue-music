<template>
    <div class="musiclist">
        <TitleHeader name="推荐歌单"></TitleHeader>
        <MusicListItem v-for="(item,index) in musiclist" :key="index" :item="item"></MusicListItem>
    </div>
</template>

<script>
import TitleHeader from 'components/common/titleheader/TitleHeader'
import MusicListItem from 'components/common/musiclist/MusicListItem'
import { getMusicList } from 'network/home'
export default {
    name: 'MusicList',
    data(){
        return {
            musiclist:{},
        }
    },
    components:{
        TitleHeader,
        MusicListItem
    },
    methods:{
        getMusicList(){
            getMusicList().then(res=>{
                // console.log(res);
                this.musiclist = res.playlists.slice(0,10);
            })
        }
    },
    created(){
        this.getMusicList();
    }
}
</script>

<style scoped>
.musiclist{
    width:80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>