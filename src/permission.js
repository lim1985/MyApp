import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN,User_ID } from "@/store/mutation-types"

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/user/login', '/user/register', '/user/register-result']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
   console.log(ACCESS_TOKEN)
  if (Vue.ls.get(ACCESS_TOKEN)) {
      console.log(Vue.ls.get(ACCESS_TOKEN));
   //console.log('生成的token是'+Vue.ls.get(ACCESS_TOKEN));
    /* has token */     
    if (to.path === '/user/login') {
     next({ path: '/views/DepTreelist' })     
      // next({ path: '/dashboard/workplace' })
     //  next({ path: '/myform/basic-form' })   
     console.log('本地有token 可以登录') 
      NProgress.done()
    } 
    else 
    {
      if (store.getters.roles.length === 0 ) {

     let  userid= {AdminID:Vue.ls.get(User_ID)}
     
      //  console.log(`userID：`+userid)
        store.dispatch('myGetInfo',userid).then(res => {
          console.log(res)
          let roles
          if(res.code==1 && !res.result.RolesID)
          {
            roles=[]           
          }
          else
          {
            roles = res.result && res.result.role
          }
           
          console.log(roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            // console.log(store.getters.addRouters)

            console.log(store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          }) 
        }).catch(() => {
          notification.error({ message: '错误', description: '请求用户信息失败，请重试' })
          store.dispatch('Logout').then(() => {
            next({ path: '/user/login' })
          })
        })

      } 
      else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/user/login')
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }

  }

})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})