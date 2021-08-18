<template>
    <div class="onlyone">
        <TitleHeader name="独家放送"></TitleHeader>
        <MusicListItem
            v-for="(item,index) in onlylist"
            :key="index"
            :item="item"
            :wth="28"
        >
            <div slot="music-t"></div>
        </MusicListItem>
    </div>
</template>

<script>
import TitleHeader from 'components/common/titleheader/TitleHeader'
import MusicListItem from "components/common/musiclist/MusicListItem";
import { getOnlyList } from 'network/home'
export default {
    name: 'OnlyOne',
    data(){
        return{
            onlylist:{},
        }
    },
    components:{
        TitleHeader,
        MusicListItem
    },
    methods:{
        getOnlyList(){
            getOnlyList().then(res=>{
                // console.log(res);
                this.onlylist = res.result
            })
        },
    },
    created(){
        this.getOnlyList()
    }
}
</script>

<style scoped>
.onlyone{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>