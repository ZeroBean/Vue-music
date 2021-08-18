import {request} from './request'

export function getAnchorBanner(){
    return request({
        url:'/dj/banner'
    })
}

export function getAnchorCateList(){
    return request({
        url:'/dj/catelist'
    })
}

export function getAnchorRecommend(){
    return request({
        url:'/dj/recommend'
    })
}

export function getAnchorPay(limit=4){
    return request({
        url:'/dj/paygift',
        params:{
            limit
        }
    })
}

export function getAnchorPerRecommend(limit){
    return request({
        url:'/dj/personalize/recommend',
        params:{
            limit
        }
    })
}


export function getAnchorType(id){
    return request({
        url:'/dj/recommend/type',
        params:{
            type:id
        }
    })
}