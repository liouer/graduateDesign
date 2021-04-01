// import { from } from 'core-js/fn/array'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Element from 'element-ui'

// 使用模块化机制编程，导入Vue和VueRouter，要调用vue.use(VueRouter)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/login/index.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
      },
    ]
  },

  // 系统管理员页面
  {
    path: '/sysManager',
    name: 'SysManager',
    component: () => import('@/views/backManager'),
    children: [
      // 学生账号列表
      {
        path: 'stuAccountList',
        name: 'stuAccountList',
        component: () => import('@/views/backManager/personalAccount/stuAccountList.vue')
      },
      // 教职工账号列表
      {
        path: 'teaAccountList',
        name: 'teaAccountList',
        component: () => import('@/views/backManager/personalAccount/teaAccountList.vue')
      },
      // 管理员账号列表
      {
        path: 'sysAccountList',
        name: 'sysAccountList',
        component: () => import('@/views/backManager/systemAccount/sysAccountList.vue')
      }
    ]
  },

  // 活动管理员页面
  {
    path: '/actManager',
    name: 'actManager',
    component: () => import('@/views/actManager'),
    children: [
      // 德育活动
      {
        path: 'moralityList',
        name: 'moralityList',
        component: () => import('@/views/actManager/moralityList.vue')
      },
      // 智育活动
      {
        path: 'intelligenceList',
        name: 'intelligenceList',
        component: () => import('@/views/actManager/intelligenceList.vue')
      },
      // 文体活动
      {
        path: 'sportsList',
        name: 'sportsList',
        component: () => import('@/views/actManager/sportsList.vue')
      },
      // 申述处理
      {
        path: 'handleList',
        name: 'handleList',
        component: () => import('@/views/actManager/handleList.vue')
      }
    ]
  },

  // 个人页面
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/personal'),
    children: [
      // 活动记录
      {
        path: 'activityRecord',
        name: 'activityRecord',
        component: () => import('@/views/personal/activityRecord.vue')
      },
      // 活动申述
      {
        path: 'askActivity',
        name: 'askActivity',
        component: () => import('@/views/personal/askActivity.vue')
      },
      // 活动广场
      {
        path: 'activityTalk',
        name: 'activityTalk',
        component: () => import('@/views/personal/activityTalk.vue')
      }

    ]
  }

]

// 创建router实例，然后传toutes配置
const router = new VueRouter({
  routes
})

//push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

axios.interceptors.request.use(config => {
  if (config.push === '/') {
  } else {
    if (localStorage.getItem('token')) {
      //在请求头加入token，名字要和后端接收请求头的token名字一样 
      config.headers.token = localStorage.getItem('token');
    }
  }
  return config;
},
  error => {
    return Promise.reject(error);
  }
)

//=============================
axios.create()

//响应回来token是否过期
axios.interceptors.response.use(response => {
  console.log('response:', response)
  console.log('响应回来：response.data.code:' + response.data.code)
  //和后端token失效返回码约定401
  if (response.data.code == 401) {
    // 引用elementui message提示框  
    Element.Message({
      message: '身份已失效',
      type: 'err'
    });
    //清除token 
    localStorage.removeItem('token');
    //跳转  
    router.push({ name: 'login' });
  } else {
    return response
  }
},
  error => {
    return Promise.reject(error);
  }
)

router.beforeEach((to, from, next) => {
  //to到哪儿 from从哪儿离开 next跳转 为空就是放行 
  console.log('to.path:', to.path)
  if (to.path === '/' || to.path === '/login') {
    //如果跳转为登录，就放行 
    next();
  } else {
    //取出localStorage判断
    let token = localStorage.getItem('token');
    if (token == null || token === '') {
      Element.Message({
        message: '请先登录',
        type: 'warning'
      });
      console.log('请先登录')
      next({ name: 'login' });
    } else {
      next();
    }
  }
});
export {
  router,
  axios
}
