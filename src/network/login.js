import { request } from './request';
//获取用户登录信息
export function getPhoneLogin(phone,password) {
    return request({
        url:'/login/cellphone',
        params:{
            phone,
            password,
        }
    })
}
//申请退出账号
export function getPhoneLoginOut(){
    return request({
        url:'logout',
    })
}
//获取用户歌单
export function getUserSongList(uid){
    return request({
        url:'user/playlist',
        params:{
            uid,
        }
    })
}
//获取用户电台
export function getUserAnchor(uid){
    return request({
        url:'user/dj',
        params:{
            uid,
        }
    })
}