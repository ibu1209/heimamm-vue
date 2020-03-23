import axios from 'axios'
import { getToken } from '../utils/mytoken'

const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

//封装用户所有信息
export function apiInfo() {
    return instance({
        url: '/info',
        method: "GET",
        headers: {
            token: getToken()
        }
    })
}

//封装退出登录的方法
export function apiLogout() {
    return instance({
        url: '/logout',
        headers: {
            token: getToken()
        }
    })
}