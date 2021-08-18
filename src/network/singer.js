import {request} from './request'

export function getSinger(area=-1,type=-1,initial=-1,limit=20,offset=0){
    return request({
        url:'/artist/list',
        params:{
            area,
            type,
            initial,
            limit,
            offset
        }
    })
}