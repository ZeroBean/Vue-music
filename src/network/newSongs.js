import {request} from './request'

export function getNewSongs(type=0){
    return request({
        url:'top/song',
        params:{
            type
        }
    })
}