import instance from '../utils/myhttp'

export function apiStatus(id) {
    return instance({
        url: '/enterprise/status',
        method: "POST",
        data: {
            id: id
        }
    })
}

export function apiGetEnterprise({
    name,
    page,
    limit,
    eid,
    username,
    status
}) {
    return instance({
        url: '/enterprise/list',
        method: "GET",
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    })
}

export function apiAddEnterprise({
    eid,
    name,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/enterprise/add',
        method: "POST",
        data: {
            eid,
            name,
            short_name,
            intro,
            remark
        }
    })
}

export function apiEditEnterprise({
    id,
    name,
    eid,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: '/enterprise/edit',
        method: "POST",
        data: {
            id,
            name,
            eid,
            short_name,
            intro,
            remark
        }
    })
}

export function apiDelEnterprise(id) {
    return instance({
        url: "/enterprise/remove",
        method: 'POST',
        data: {
            id
        }
    })
}