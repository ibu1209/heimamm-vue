import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login/index.vue'

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, ]
})
export default router