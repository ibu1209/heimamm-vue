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

export function apiStatus(id) {
    return instance({
        url: '/subject/status',
        method: "POST",
        data: {
            id: id
        }
    })
}

export function apiGetSubject({
    name,
    page,
    limit,
    rid,
    username,
    status
}) {
    return instance({
        url: '/subject/list',
        method: "GET",
        params: {
            name,
            page,
            limit,
            rid,
            username,
            status
        }
    })
}

export function apiAddSubject({
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/subject/add',
        method: "POST",
        data: {
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

export function apiEidtSubject({
    id,
    rid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/subject/edit',
        method: "POST",
        data: {
            id,
            rid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

export function apiDelSubject(id) {
    return instance({
        url: "/subject/remove",
        method: 'POST',
        data: {
            id
        }
    })
}