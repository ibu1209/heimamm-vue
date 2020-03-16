import Vue from 'vue'
import App from './App.vue'
//导入router
import router from './router'
//导入element-ui
import Element from 'element-ui'
//导入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')