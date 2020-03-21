import axios from "axios";

var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // 跨域必须携带cookie
    withCredentials: true
})

export function apiLogin({ phone, password, code }) {
    return instance({
        url: "/login",
        method: "POST",
        data: {
            phone: phone,
            password: password,
            code: code
        },
    })
}