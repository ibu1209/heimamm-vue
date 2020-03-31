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
//引入过滤器
import './filters/timefilter'

//导入全局组件（学科下拉框）
import subjectcom from './components/subjectcom.vue'
//设置全局组件
Vue.component('subjectcom', subjectcom)

//导入全局组件（城市次级菜单）
import city from './components/city.vue'
//设置全局组件
Vue.component('city', city)

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */ )

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')