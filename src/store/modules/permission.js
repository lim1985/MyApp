import { asyncRouterMap, constantRouterMap, NewAsyncDyNamicRouter} from "@/config/router.config"
//newasyncRoterMap
import Vue from 'vue'
import { User_ID } from "@/store/mutation-types"
// const importRouter = require('@/utils/import_routes')
import lazyLoading from '@/utils/lazyLoading'

// import  BasicLayout from '@/components/layouts/BasicLayout'
// const BasicLayout = () => import('@comp/layouts/BasicLayout.vue')
// import AsyncComponent from '@/utils/lazyLoading'
/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
// function hasPermission(permission, route) {
//   if (route.meta && route.meta.permission) {
//     let flag = -1
//     for (let i = 0, len = permission.length; i < len; i++) {
//       flag = route.meta.permission.indexOf(permission[i])
//       if (flag >= 0) {
//         return true
//       }
//     }
//     return false
//   }
//   return true
// }

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(roles.id)
  } else {
    return true
  }
}
function filterAsyncDyNamicRoute(routeMap)
{
 
   const accessedRouters=routeMap.filter(route=>{     
     if(route.component)
     {       
      route.component= lazyLoading(route.component)   
      if (route.children && route.children.length) {
        filterAsyncDyNamicRoute(route.children);
      } 
      return true;
     }    
     return false;
   
    //  if(route.DyNamicRoutes.Layoutcomponent==='BasicLayout')
    //  route.DyNamicRoutes.Layoutcomponent=BasicLayout
    //  if(route.DyNamicRoutes.children && route.DyNamicRoutes.children.length)
    //  {
       
    //  }

    //   return true;
   })
  
  //  console.log(accessedRouters)
return accessedRouters;
}
// function filterAsyncRouter(routerMap, roles) {停用
  
//   const accessedRouters = routerMap.filter(route => {
//     if (hasPermission(roles.permissionList, route)) {

//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   // console.log(accessedRouters)
//   return accessedRouters
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(async resolve => {
        const { roles } = data
        let accessedRouters
       console.log(asyncRouterMap)
       console.log(roles);
      //  console.log(typeof(newasyncRoterMap))
       let  userid= {AdminID:Vue.ls.get(User_ID)}
     
      //  const obj=newasyncRoterMap(userid)
       const obj2=await NewAsyncDyNamicRouter(userid)
    
    //  obj2.then(r=>{
    //      console.log(r)
    //      commit('SET_ROUTERS', r)
    //      resolve()
    //    });
        // console.log(obj)
        console.log(obj2)
        
       accessedRouters= filterAsyncDyNamicRoute(obj2);
       //  accessedRouters = filterAsyncRouter(obj, roles)  
        console.log(accessedRouters);   
      
         commit('SET_ROUTERS', accessedRouters)
         resolve()
      })
    }
  }
}

export default permission