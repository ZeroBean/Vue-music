import {request} from './request'

export function getSongListCatlist(){
    return request({
        url:'playlist/hot'
    })
}

export function getSongsList(limit,offset,cat){
    return request({
        url:'top/playlist',
        params:{
            cat,
            limit,
            offset
        }
    })
}