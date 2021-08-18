import {request} from './request'

export function getSwiper(){
    return request({
        url: '/banner'
    })
}

export function getMusicUrl(musicId){
    return request({
        url:'/song/url',
        params:{
            id:musicId
        }
    })
}

//获取歌曲详情
export function getMusicMenu(musicId){
    return request({
        url:'/song/detail',
        params:{
            ids:musicId,
        }
    })
}
//获取歌曲列表
export function getMusicList(){
    return request({
        url:'/top/playlist',
        params:{
            offset: (Math.random() * 1297).toFixed(0) - 12,
            limit: 12,
        }
    })
}
//获取个性化推荐
export function getOnlyList(){
    return request({
        url:'/personalized/privatecontent'
    })
}

//推荐新音乐
export function getNewList(){
    return request({
        url:'/personalized/newsong'
    })
}

//获取歌单的详细信息
export function getSongListInfo(id){
    return request({
        url:'playlist/detail',
        params:{
            id
        }
    })
}

//根据榜单歌曲ID获取歌曲信息
export function getSongListInfoSongs(ids){
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    })
}

//获取评论内容
export function getSongListComment(id){
    return request({
        url:"/comment/playlist",
        params:{
            id
        }
    })
}

//获取收藏者信息
export function getSongListCollect(id){
    return request({
        url:'/playlist/subscribers',
        params:{
            id
        }
    })
}

//获取歌词
export function getSongLyric(id){
    return request({
        url:'/lyric',
        params:{
            id,
        }
    })
}

//获取歌曲评论
export function getSongLyricComment(id,limit=20,offset=0){
    return request({
        url:'/comment/music',
        params: {
            id,
            limit,
            offset,
        }
    })
}