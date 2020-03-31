import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/index.vue'
import Index from '../views/index/index.vue'
//导入child
import child from './childRouter'

//单独引入message
import { Message } from 'element-ui'

//引入store
import store from '../store/index'

//导入nprogress
import Nprogress from 'nprogress'
//导入样式
import "../../node_modules/_nprogress@0.2.0@nprogress/nprogress.css"
import { getToken } from '../utils/mytoken';
import { apiInfo } from "@/api/index.js";

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                roles: ["管理员", "老师", "学生"]
            }
        },
        {
            path: '/index',
            component: Index,
            //路由元
            meta: {
                title: '首页',
                roles: ["管理员", "老师", "学生"]
            },
            //嵌套路由
            children: child
        }
    ]
})

// 设置一个全局前置导航守卫， 当路由发生改变之前
//to：要跳转的目标路由
//from：当前跳转的来源
//next：是否执行后续代码
router.beforeEach((to, from, next) => {
    window.console.log(from)
    Nprogress.start();
    //判断是否请求的是登陆页面
    if (to.path !== '/login') {
        if (!getToken()) {
            Message.error('您还未登录')
            Nprogress.done();
            next('/login');
        } else {
            //得到用户信息
            apiInfo().then(res => {
                // window.console.log(res);
                if (res.data.code == 200) {
                    //判断token的真假判断
                    var userInfo = {
                        username: res.data.data.username,
                        userImg: process.env.VUE_APP_URL + '/' + res.data.data.avatar,
                    }
                    store.commit('setUserInfo', userInfo);
                    //得到当前登录系统的角色
                    var role = res.data.data.role;
                    store.commit('setRole', role);
                    //访问权限
                    if (to.meta.roles.includes(role)) {
                        next();
                    } else {
                        Message.error("您无权访问此页面");
                    }
                    next();
                } else {
                    Message.error('您还未登录')
                    Nprogress.done();
                    next("/login");
                }
            });
        }
    } else {
        next();
    }
})

//添加一个全局后置钩子，路由发生改变后执行
router.afterEach((to, from) => {
    window.console.log(from);
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    Nprogress.done();
})

export default router