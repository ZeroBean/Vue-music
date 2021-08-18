import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL:'/api',
        timeout:30000,
    })
    //请求拦截和相应拦截
    instance.interceptors.request.use(config=>{
        console.log(config);
        return config;
    },err=>{
        console.log(err);
    })

    // 响应请求
    instance.interceptors.response.use(res=>{
        return res.data;
    },err=>{
        console.log(err);
    })

    return instance(config);
}