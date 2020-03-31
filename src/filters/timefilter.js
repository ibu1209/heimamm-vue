//创建全局过滤器
//导入vue
import Vue from 'vue'
//导入moment
import moment from 'moment'

Vue.filter('mytime', function(v) {
    return moment(v).format("YYYY-MM-DD");
})