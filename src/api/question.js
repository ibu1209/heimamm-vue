import instance from '../utils/myhttp'

//获取题目列表
export function apiGetQuestion({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: '/question/list',
        method: 'GET',
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit
        }
    })
}

//获取单个题目信息
export function apiGetOne(id) {
    return instance({
        url: '/question/one',
        method: "POST",
        data: {
            id
        }
    })
}

//题目状态
export function apiStatus(id) {
    return instance({
        url: "/question/status",
        method: 'POST',
        data: {
            id
        }
    })
}

//删除题目
export function apiDelQtion(id) {
    return instance({
        url: "/question/remove",
        method: 'POST',
        data: {
            id
        }
    })
}

//编辑题目
export function apiEditQtion({
    id,
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options
}) {
    return instance({
        url: '/question/edit',
        method: 'POST',
        data: {
            id,
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options
        }
    })
}

//上传文件
export function apiUpload(file) {
    return instance({
        url: '/question/upload',
        method: 'POST',
        data: {
            file
        }
    })
}

//发布题目
export function apiAddQtion({
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options
}) {
    return instance({
        url: "/question/add",
        method: "POST",
        data: {
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options
        }
    })
}