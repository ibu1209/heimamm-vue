import Subject from '../views/index/subject/subject.vue'
import Chart from '../views/index/chart/chart.vue'
import Enterprise from '../views/index/enterprise/enterprise.vue'
import Question from '../views/index/question/question.vue'
import User from '../views/index/user/user.vue'

export default [{
    path: 'chart',
    component: Chart,
    meta: {
        title: '数据概览',
        roles: ["管理员", "老师"],
        fullpath: '/index/chart'
    }
}, {
    path: 'subject',
    component: Subject,
    meta: {
        title: '学科列表',
        roles: ["管理员"],
        fullpath: '/index/subject'
    }
}, {
    path: 'enterprise',
    component: Enterprise,
    meta: {
        title: '企业列表',
        roles: ["管理员"],
        fullpath: '/index/enterprise'
    }
}, {
    path: 'question',
    component: Question,
    meta: {
        title: '题库列表',
        roles: ["管理员", "老师", "学生"],
        fullpath: '/index/question'
    }
}, {
    path: 'user',
    component: User,
    meta: {
        title: '用户列表',
        roles: ["管理员", "老师"],
        fullpath: '/index/user'
    }
}]