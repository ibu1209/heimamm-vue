//封装所有用来处理localstorage方法
const TOKEN_KEY = "heimamm"

//设置token
export function setToken(value) {
    window.localStorage.setItem(TOKEN_KEY, value)
}

//获取token
export function getToken() {
    return window.localStorage.getItem(TOKEN_KEY)
}

//删除token
export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEY)
}