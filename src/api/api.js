import { request } from '@/core/sdk/request.js'

//个人用户登录接口
export async function userLogin(data) {
    const res = await request({
        url: '/userLoginAction',
        method: 'post',
        data
    })
    return res
}

// 活动管理员登录接口
export async function activityLogin(data) {
    const res = await request({
        url: '/activityLoginAction',
        method: 'post',
        data
    })
    return res
}

// 系统管理员登录接口
export async function backLogin(data) {
    const res = await request({
        url: '/backLoginAction',
        method: 'post',
        data
    })
    return res
}
// 获取用户列表
export async function getUserList(data) {
    const res = await request({
        url: '/getUserList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 获取活动管理账号列表接口
export async function getCollegeAdminList(data) {
    const res = await request({
        url: '/getCollegeAdminList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 获取系统管理员账号列表
export async function getBackAdminList(data) {
    const res = await request({
        url: '/getBackAdminList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 删除系统管理员账号接口
export async function deleteBackAdminAction(data) {
    const res = await request({
        url: '/deleteBackAdminAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            back_admin_id: data
        },
    })
    return res.data
}

// 删除活动管理员账号接口
export async function deleteCollegeAdminAction(data) {
    const res = await request({
        url: '/deleteCollegeAdminAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            college_admin_id: data
        },
    })
    return res.data
}

// 删除活动管理员账号接口
export async function deleteUserAction(data) {
    const res = await request({
        url: '/deleteUserAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            user_id: data
        },
    })
    return res.data
}

// 获取系统管理员信息
export async function getBackAdminInfo(data) {
    const res = await request({
        url: '/getBackAdminList',
        method: 'post',
        data
    })
    return res.data
}

// 获取活动管理员信息
export async function getCollegeAdminInfo(data) {
    const res = await request({
        url: '/getCollegeAdminInfo',
        method: 'post',
        data
    })
    return res.data
}

// 获取用户信息
export async function getUserInfo(data) {
    const res = await request({
        url: '/getUserInfo',
        method: 'post',
        data
    })
    return res.data
}

//修改活动管理员密码
export async function collegeAdminEditPasswordAction(data) {
    const res = await request({
        url: '/collegeAdminEditPasswordAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

//修改系统管理员密码
export async function editBackAdminPasswordAction(data) {
    const res = await request({
        url: '/editBackAdminPasswordAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

//修改用户密码
export async function userEditPasswordAction(data) {
    const res = await request({
        url: '/userEditPasswordAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 添加用户接口
export async function addUserAction(data) {
    const res = await request({
        url: '/addUserAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 获取学院列表接口
export async function getCollegeList() {
    const res = await request({
        url: '/getCollegeList',
        method: 'post'
    })
    return res.data
}

//修改用户账号信息
export async function editUserAction(data) {
    const res = await request({
        url: '/editUserAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

//修改活动管理员账号信息
export async function editCollegeAdminAction(data) {
    const res = await request({
        url: '/editCollegeAdminAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

//修改系统管理员账号信息
export async function editBackAdminAction(data) {
    const res = await request({
        url: '/editBackAdminAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 添加活动管理员账号
export async function addCollegeAdminAction(data) {
    const res = await request({
        url: '/addCollegeAdminAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}
// 添加系统管理员账号
export async function addBackAdminAction(data) {
    const res = await request({
        url: '/addBackAdminAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}


// 用户端接口
// 获取已签到活动列表
export async function joinActivityList(data) {
    const res = await request({
        url: '/joinActivityList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}
// 用户：获取申诉列表
export async function getStatementList(data) {
    const res = await request({
        url: '/getStatementList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}
// 用户：提交申诉接口
export async function submitStatementAction(data) {
    const res = await request({
        url: '/submitStatementAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}
//用户： 取消申诉接口
export async function cancelStatementAction(data) {
    const res = await request({
        url: '/cancelStatementAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 用户：发布评论
export async function submitCommentAction(data) {
    const res = await request({
        url: '/submitCommentAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员端
// 获取活动列表
export async function getActivityList(data) {
    const res = await request({
        url: '/getActivityList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 录入活动接口
export async function addActivityAction(data) {
    const res = await request({
        url: '/addActivityAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// excel导入签到记录
export async function importActivityJoinLogAction(data) {
    const res = await request({
        url: '/importActivityJoinLogAction',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data" //值得注意的是，这个地方一定要把请求头更改一下
        },
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：添加单个签到记录
export async function addActivityJoinLogAction(data) {
    const res = await request({
        url: '/addActivityJoinLogAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：获取活动签到记录接口
export async function getActivityJoinList(data) {
    const res = await request({
        url: '/getActivityJoinList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：发布活动纪要
export async function setActivitySummaryAction(data) {
    const res = await request({
        url: '/setActivitySummaryAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 公共接口：获取活动纪要
export async function getActivitySummaryAction(data) {
    const res = await request({
        url: '/getActivitySummaryAction',
        method: 'post',
        data: {
            ...data
        },
    })
    return res.data
}

// 活动管理员：获取申诉列表
export async function getCollegeStatementList(data) {
    const res = await request({
        url: '/getCollegeStatementList',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：excel导入学生用户接口
export async function importStudentUserAction(data) {
    const res = await request({
        url: '/importStudentUserAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：excel导入教职工用户接口
// export async function importStudentUserAction(data) {
//     const res = await request({
//         url: '/importStudentUserAction',
//         method: 'post',
//         data: {
//             token: localStorage.getItem('token'),
//             ...data
//         },
//     })
//     return res.data
// }

// 活动管理员：处理申述接口
export async function handleJoinStatementAction(data) {
    const res = await request({
        url: '/handleJoinStatementAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：活动纪要保存草稿
export async function saveActivitySummaryDraftAction(data) {
    const res = await request({
        url: '/saveActivitySummaryDraftAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：活动删除接口
export async function deleteCollegeActivity(data) {
    const res = await request({
        url: '/deleteCollegeActivity',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：活动修改接口
export async function editCollegeActivity(data) {
    const res = await request({
        url: '/editCollegeActivity',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 活动管理员：提交活动banner图
export async function submitBannerAction(data) {
    const res = await request({
        url: '/submitBannerAction',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}

// 公共接口：获取所有活动
export async function getAllActivityList(data) {
    const res = await request({
        url: '/getAllActivityList',
        method: 'post',
        data: {
            ...data
        },
    })
    return res.data
}

// 公共接口：获取banner图
export async function getActivityPictureList(data) {
    const res = await request({
        url: '/getActivityPictureList',
        method: 'post',
        data: {
            ...data
        },
    })
    return res.data
}

// 公共接口：获取活动用户评论列表
export async function getActivityComment(data) {
    const res = await request({
        url: '/getActivityComment',
        method: 'post',
        data: {
            ...data
        },
    })
    return res.data
}

// 公共接口：获取活动用户上传的图片列表
export async function getUserActivityPictureList(data) {
    const res = await request({
        url: '/getUserActivityPictureList',
        method: 'post',
        data: {
            ...data
        },
    })
    return res.data
}

// 公共接口：上传图片接口
export async function uploadActivityImageAction(data) {
    const res = await request({
        url: '/uploadActivityImageAction',
        method: 'post',
        data: {
            ...data
        },
    })
    return res.data
}

// 活动管理员：删除评论
export async function collegeDeleteActivityComment(data) {
    const res = await request({
        url: '/collegeDeleteActivityComment',
        method: 'post',
        data: {
            token: localStorage.getItem('token'),
            ...data
        },
    })
    return res.data
}