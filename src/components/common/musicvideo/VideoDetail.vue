<template>
    <div class="mv-video" ref="scroll">
        <div class="mv-left">
            <header>
                <a href="">
                    <i class="el-icon-arrow-left"></i>
                </a>
                <span class="mv-title">视频</span>
                <span style="fontSize: 16px;marginRight:5px">{{topMenu.title}}</span>
            </header>
            <video
                controls
                muted
                loop
                style="width:99%;margin:20px 0;"
                id="my-video"
                :src="videoUrl"
            ></video>
            <el-button size="small" icon="el-icon-thumb">赞{{likeCount}}</el-button>
            <el-button size="small" icon="el-icon-star-off">收藏{{topMenu.subscribeCount}}</el-button>
            <el-button size="small" icon="el-icon-share">分享{{shareCount}}</el-button>
            <el-button size="small" icon="el-icon-download">下载MV</el-button>
            <a
                href="#"
                style="color:#888;fontSize:13px;textDecoration: underline;float:right;marginRight:5px"
            >举报</a>
            <TitleHeader :name="'评论('+commentCount+')'" :show="false" style="marginTop:50px"></TitleHeader>
            <MvComment :comments="comments"></MvComment>
            <el-pagination
                background
                :page-size="limit"
                layout="prev, next"
                @current-change="handleCurrentChange"
            ></el-pagination>
            </div>
        <div class="mv-right">
            <TitleHeader name="MV介绍" :show="false" style="marginBottom:8px;"></TitleHeader>
            <div class="right-head">
                <span>发布时间:{{topMenu.publishTime | showDate}}</span>
                <span>播放次数:{{topMenu.playTime > 10000 ? (topMenu.playTime/10000).toFixed(0) + '万' : topMenu.playTime}}次</span>
            </div>
            <TitleHeader name="相关推荐" :show="false" style="marginTop:50px"></TitleHeader>
            <VideoCard :simis="item" v-for="(item,index) in simiMvs" :key="index"></VideoCard>
        </div>
    </div>
</template>

<script>
import {getVideoDetail,getVideoUrl,getVideoDetailInfo,getVideoComment,getVideoSimilar} from 'network/musicvideo'
import TitleHeader from "components/common/titleheader/TitleHeader";
import MvComment from "components/common/singerlist/MvComment";
import VideoCard from "components/common/musicvideo/VideoCard";
import { formatDate } from "common/uctil";
export default {
    name :'VideoDetail',
    data(){
        return{
            mvId:0,//MVid
            topMenu:{},//获取顶部信息，标题等
            videoUrl:'',//视频地址
            likeCount:0,//点赞数
            shareCount:0,//分享数
            commentCount:0,//评论数
            comments:[],//评论数据
            limit:20,//每次请求的评论数
            offset:0,//偏移量
            simiMvs:[],//相似视频
        }
    },
    components:{
        TitleHeader,
        MvComment,
        VideoCard,
    },
    methods:{
        //获取视频的详细信息
        getVideoDetail(id){
            getVideoDetail(id).then(res=>{
                // console.log(res);
                this.topMenu = res.data
            })
        },
        //获取视频的播放地址
        getVideoUrl(id){
            getVideoUrl(id).then(res=>{
                // console.log(res);
                this.videoUrl = res.urls[0].url
            })
        },
        //获取视频的点赞转发评论数
        getVideoDetailInfo(id){
            getVideoDetailInfo(id).then(res=>{
                console.log(res);
                this.likeCount = res.likedCount;
                this.shareCount = res.shareCount;
                this.commentCount = res.commentCount;
            })
        },
        //获取视频评论信息
        getVideoComment(id,limit,offset){
            getVideoComment(id,limit,offset).then(res=>{
                console.log(res);
                this.comments = res.comments;
            })
        },
        //获取下一页评论
        handleCurrentChange(newPage){
            this.offset = (newPage-1)*this.limit;
            this.getVideoComment(this.mvId,this.limit,this.offset)
        },
        //获取相似视频内容
        getVideoSimilar(id){
            getVideoSimilar(id).then(res=>{
                // console.log(res);
                this.simiMvs = res.data;
            })
        }
    },
    filters: {
        //对日期过滤成想要格式
        showDate: function (value) {
        let date = new Date(value);
        return formatDate(date, "yyyy-MM-dd");
        },
    },
    created(){
        this.mvId = this.$route.params.id;
        this.getVideoDetail(this.mvId);
        this.getVideoUrl(this.mvId);
        this.getVideoDetailInfo(this.mvId);
        this.getVideoComment(this.mvId);
        this.getVideoSimilar(this.mvId);
    }
}
</script>

<style scoped>
.mv-video{
    width: 90%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin: 0 auto;
    max-height: 630px;
    overflow: auto;
}
.mv-left{
    width: 62%;
}
.mv-right{
    width: 32%;
}
.mv-title{
    border: 1px solid red;
    padding: 3px 4px;
    font-size: 13px;
    color: red;
    margin: 0 5px;
}

.right-head{
    display: flex;
    justify-content: space-between;
}
.right-head span{
    font-size: 13px;
    color: #888;
}
</style>