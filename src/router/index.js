import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/index.vue'
import Index from '../views/index/index.vue'
import Subject from '../views/index/subject/subject.vue'
import Chart from '../views/index/chart/chart.vue'
import Enterprise from '../views/index/enterprise/enterprise.vue'
import Question from '../views/index/question/question.vue'
import User from '../views/index/user/user.vue'
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
        meta: { title: '登录' }
    }, {
        path: '/index',
        component: Index,
        //路由元
        meta: { title: '首页' },
        //嵌套路由
        children: [{
            path: '/subject',
            component: Subject,
            meta: { title: '学科列表' }
        }, {
            path: '/chart',
            component: Chart,
            meta: { title: '数据概览' }
        }, {
            path: '/enterprise',
            component: Enterprise,
            meta: { title: '企业列表' }
        }, {
            path: '/question',
            component: Question,
            meta: { title: '题库列表' }
        }, {
            path: '/user',
            component: User,
            meta: { title: '用户列表' }
        }]
    }]
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
                //判断token的真假判断
                if (res.data.code == 200) {
                    var userInfo = {
                        username: res.data.data.username,
                        userImg: process.env.VUE_APP_URL + '/' + res.data.data.avatar
                    }
                    store.commit('setUserInfo', userInfo);
                    next();
                } else {
                    Message.error('您还未登录')
                    Nprogress.done();
                    next("/login");
                }
            });
            next();
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