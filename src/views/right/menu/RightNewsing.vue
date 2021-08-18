<template>
    <div class="rt-new">
        <div class="new-main">
            <div class="new-tog">
                <el-button :class="[isTog?'active':'']" size="small" round>新歌速递</el-button>
                <el-button :class="[isTog?'':'active']" size="small" round>新碟上架</el-button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                    <SingerAlbum
                        :imgShow="false"
                        :wth="95"
                        :tableList="songList"
                        topTitle="热门歌曲"
                        :images="true"
                        :nicknameshow="true"
                    >
                        <template v-slot:tableicon="poce">
                            <img :src="poce.item" alt="404" style="width:30px" />
                        </template>
                        <template v-slot:tablesinger="poces">
                            <span v-if="poces.item.length===1">{{poces.item[0].name}}</span>
                            <span v-else>
                                <i
                                    v-for="(item,index) in poces.item"
                                    :key="item.id"
                                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
                            </span>
                        </template>
                    </SingerAlbum>
                </el-tab-pane>
                <el-tab-pane label="华语" name="second">
                    <SingerAlbum
                        :imgShow="false"
                        :wth="95"
                        :tableList="CList"
                        topTitle="华语歌曲"
                        :images="true"
                        :nicknameshow="true"
                    >
                        <template v-slot:tableicon="poce">
                            <img :src="poce.item" alt="404" style="width:30px" />
                        </template>
                        <template v-slot:tablesinger="poces">
                            <span v-if="poces.item.length===1">{{poces.item[0].name}}</span>
                            <span v-else>
                                <i
                                    v-for="(item,index) in poces.item"
                                    :key="item.id"
                                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
                            </span>
                        </template>
                    </SingerAlbum>
                </el-tab-pane>
                <el-tab-pane label="欧美" name="third">
                    <SingerAlbum
                        :imgShow="false"
                        :wth="95"
                        :tableList="RList"
                        topTitle="欧美歌曲"
                        :images="true"
                        :nicknameshow="true"
                    >
                        <template v-slot:tableicon="poce">
                            <img :src="poce.item" alt="404" style="width:30px" />
                        </template>
                        <template v-slot:tablesinger="poces">
                            <span v-if="poces.item.length===1">{{poces.item[0].name}}</span>
                            <span v-else>
                                <i
                                    v-for="(item,index) in poces.item"
                                    :key="item.id"
                                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
                            </span>
                        </template>
                    </SingerAlbum>
                </el-tab-pane>
                <el-tab-pane label="韩国" name="fourth">
                    <SingerAlbum
                        :imgShow="false"
                        :wth="95"
                        :tableList="KList"
                        topTitle="韩国歌曲"
                        :images="true"
                        :nicknameshow="true"
                    >
                        <template v-slot:tableicon="poce">
                            <img :src="poce.item" alt="404" style="width:30px" />
                        </template>
                        <template v-slot:tablesinger="poces">
                            <span v-if="poces.item.length===1">{{poces.item[0].name}}</span>
                            <span v-else>
                                <i
                                    v-for="(item,index) in poces.item"
                                    :key="item.id"
                                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
                            </span>
                        </template>
                    </SingerAlbum>
                </el-tab-pane>
                <el-tab-pane label="日本" name="five">
                    <SingerAlbum
                        :imgShow="false"
                        :wth="95"
                        :tableList="JList"
                        topTitle="日本歌曲"
                        :images="true"
                        :nicknameshow="true"
                    >
                        <template v-slot:tableicon="poce">
                            <img :src="poce.item" alt="404" style="width:30px" />
                        </template>
                        <template v-slot:tablesinger="poces">
                            <span v-if="poces.item.length===1">{{poces.item[0].name}}</span>
                            <span v-else>
                                <i
                                    v-for="(item,index) in poces.item"
                                    :key="item.id"
                                >{{index+1 === poces.item.length ? item.name : item.name + '/'}}</i>
                            </span>
                        </template>
                    </SingerAlbum>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import SingerAlbum from 'components/common/singerlist/SingerAlbum'
import { getNewSongs} from "network/newSongs";
export default {
    name:'RightNewsing',
    components:{
        SingerAlbum
    },
    data() {
        return {
            isTog:true,
            activeName:'first',//标签名
            songList:[],//全部列表
            CList:[],//华语列表
            togShow: true,//作为顶部按钮的切换选项
            RList:[],//欧美列表
            KList:[],//韩国列表
            JList:[],//日本列表
        }
    },
    methods:{
        //请求新歌，有几个分类
        getNewSongs(type){
            getNewSongs(type).then(res=>{
                console.log(res);
                switch(type){
                    case 7:
                        this.CList = res.data;
                        break;
                    case 96:
                        this.RList = res.data;
                        break;
                    case 16:
                        this.KList = res.data;
                        break;
                    case 8:
                        this.JList = res.data;
                        break;
                    default:
                        this.songList = res.data;
                }
            })
        },
        //切换选项卡，请求不同数据
        handleClick(tab){
            if(this.togShow){
                switch(tab.name){
                    case "second":
                        this.getNewSongs(7);
                        break;
                    case "third":
                        this.getNewSongs(96);
                        break;
                    case "fourth":
                        this.getNewSongs(16);
                        break;
                    case "five":
                        this.getNewSongs(8);
                        break;
                    default:
                        this.getNewSongs(0);
                }
            }
        }
    },
    created(){
        this.getNewSongs()
    }
}
</script>

<style scoped>
.rt-new {
  width: 100%;
  max-height: 620px;
  overflow: auto;
}
.new-main{
    width: 80%;
    margin: 0 auto;
}
.new-tog {
  display: flex;
  width: 100%;
  justify-content: center;
}
.active {
  background: skyblue;
  color: #f5f5f7;
}
</style>