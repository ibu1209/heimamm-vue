import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建一个store对象
const store = new Vuex.Store({
    //用来管理数据
    //在vue调用this.$store.state.参数名
    state: {
        username: '',
        userImg: '',
        role: ''
    },
    //用来修改state的方法
    mutations: {
        //所有mutations中的方法中第一个参数都是：state
        //在vue调用this.$store.commit(方法名)
        setUserInfo: function(state, payload) {
            state.username = payload.username;
            state.userImg = payload.userImg;
        },
        //定义一个设置用户角色的方法
        setRole: function(state, payload) {
            state.role = payload
        }
    }
})

//暴露stroe
export default store