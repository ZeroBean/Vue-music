import {request} from './request'


//获取所有榜单
export function getTopList(){
    return request({
        url:'/toplist'
    })
}


