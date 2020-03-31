//封装一个自己的axios
import axios from 'axios'
import { getToken } from '../utils/mytoken'

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

//请求拦截器
instance.interceptors.request.use(function(config) {
        config.headers.token = getToken();
        return config;
    }, function(error) {
        return Promise.reject(error)
    })
    //响应拦截器
instance.interceptors.response.use(function(response) {
    return response
}, function(error) {
    return Promise.reject(error)
})

export default instance;