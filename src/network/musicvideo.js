import {request} from './request'
//获取视频分类
export function getVideoTitle(){
    return request({
        url:'/video/category/list'
    })
}
//获取各个分类的视频组
export function getVideoGroups(id,offset){
    return request({
        url:'/video/group',
        params:{
            id,
            offset
        }
    })
}
//获取不同分类的MV
export function getVideoAll(area='内地',limit=20,offset=0){
    return request({
        url:'/mv/all',
        params:{
            area,
            limit,
            offset
        }
    })
}
//获取视频的详细信息
export function getVideoDetail(id){
    return request({
        url:'/video/detail',
        params:{
            id
        }
    })
}
//获取视频播放地址
export function getVideoUrl(id){
    return request({
        url:'/video/url',
        params:{
            id
        }
    })
}
//获取视频详细信息（点赞数，评论）
export function getVideoDetailInfo(vid){
    return request({
        url:'/video/detail/info',
        params:{
            vid
        }
    })
}
//获取视频评论信息
export function getVideoComment(id,limit=20,offset=0) {
    return request({
        url: "/comment/video",
        params:{
            id,
            limit,
            offset,
        }
    })
}
//获取相似视频内容
export function getVideoSimilar(id){
    return request({
        url:'/related/allvideo',
        params:{
            id,
        }
    })
}