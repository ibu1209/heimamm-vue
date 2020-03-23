import Vue from 'vue'
import App from './App.vue'
//导入router
import router from './router'
//导入element-ui
import Element from 'element-ui'
//导入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);
//导入全局样式
import './style/index.css'
//引入store
import store from './store'

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')