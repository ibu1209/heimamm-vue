import instance from '../utils/myhttp'

//获取用户列表
export function apiGetUser({
    username,
    email,
    role_id,
    page,
    limit
}) {
    return instance({
        url: "/user/list",
        method: 'GET',
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

//创建用户
export function apiAddUser({
    username,
    email,
    phone,
    role_id,
    status,
    remark
}) {
    return instance({
        url: '/user/add',
        method: 'POST',
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark
        }
    })
}

//设置用户状态
export function apiUserStatus(id) {
    return instance({
        url: '/user/status',
        method: 'POST',
        data: {
            id
        }
    })
}

//删除用户
export function apiRemoveUser(id) {
    return instance({
        url: '/user/remove',
        method: 'POST',
        data: {
            id
        }
    })
}

//编辑用户
export function apiEditUser({
    id,
    username,
    phone,
    email,
    avatar,
    password,
    remark,
    status,
    role_id
}) {
    return instance({
        url: '/user/edit',
        method: 'POST',
        data: {
            id,
            username,
            phone,
            email,
            avatar,
            password,
            remark,
            status,
            role_id
        }
    })
}