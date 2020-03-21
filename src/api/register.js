import axios from 'axios'

//获取验证码
export function apiGetCode(code, phone) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "POST",
        data: {
            code,
            phone
        },
        // 跨域必须携带cookie
        withCredentials: true
    })
}
//注册提交
export function apiRegister({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}) {
    return axios({
        url: process.env.VUE_APP_URL + "/register",
        method: "POST",
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        }
    })
}