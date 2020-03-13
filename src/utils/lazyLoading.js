//  export default (name) => () => import(`@/components/layouts/${name}.vue`)

export default file => {
    return map[file] || null
  }
  
  const map = {
    // BasicLayout: () => import('@/components/layouts/BasicLayout'),//import BasicLayout from '@/components/layouts/BasicLayout'   
   BlankLayout: () => import('@/components/layouts/BlankLayout.vue'),//() => import('@/views/other/TreeList'),
   UserLayout: () => import('@/components/layouts/UserLayout.vue'),
   BasicLayout: () => import('@/components/layouts/BasicLayout.vue'),
   RouteView: () => import('@/components/layouts/RouteView.vue'),
   PageView: () => import('@/components/layouts/PageView.vue'),
   TreeList: () => import('@/views/other/TreeList.vue'),
   TableList: () => import('@/views/list/UserPhonelist.vue'),
   Cusomgroup: () => import('@/views/other/customgroup.vue'),
   cmccSendSms: () => import('@/views/list/modules/sendSMS/cmccSendSms.vue'),
   DepartmentManager: () => import('@/views/list/Department.vue'),
   UploadUserlist: () => import('@/views/list/UploadUserlist.vue'),
   UserList: () => import('@/views/list/UserList.vue'),
   RoleList: () => import('@/views/list/RoleList.vue'),
   PermissionList: () => import('@/views/list/PermissionList.vue'),
   GlobalSearch: () => import('@/views/list/search/GlobalSearch.vue'),
   jiucuoList: () => import('@/views/list/jiucuo/jiucuo.vue'),
   smsrecord: () => import('@/views/list/smsrecord/smsrecord.vue'),
   yqdata: () => import('@/views/list/yqdata/yqdata.vue')
//    {
//     path: '/DepartmentManager',
//     name: 'DepartmentManager',
//     redirect: '/Department/manager',
//     component: PageView,
//     meta: { title: '管理', icon: 'dashboard', permission: [ 'Admin' ] },
//     children: [
//       {      
//             path: '/CMCCSend/send',
//             name: 'CMCCSend',
//             component: () => import('@/views/list/modules/sendSMS/cmccSendSms'),
//             meta: { title: '移动发短信' , permission: [ 'Admin' ] }
//       },
//       {
//         path: '/Department/manager',
//         name: 'Department',
//         component: () => import('@/views/list/Department'),
//         meta: { title: '部门管理', permission: [ 'Admin' ] }
//       },
//       {
//         path: '/list/uploadUserlist',
//         name: 'UploadUserlist',
//         component: () => import('@/views/list/UploadUserlist'),
//         meta: { title: '联系人批量导入', permission: [ 'Admin' ] }
//       },
//       // {
//       //   path: '/list/old-permission',
//       //   name: 'old-permission',
//       //   component: () => import('@/views/list/oldPermissionList'),
//       //   meta: { title: '原版权限管理', permission: [ 'Admin' ] }
//       // },
//       {
//         path: '/list/user-list',
//         name: 'UserList',
//         component: () => import('@/views/list/UserList'),
//         meta: { title: '用户管理', permission: [ 'Admin' ] }
//       },
//       {
//         path: '/list/role-list',
//         name: 'RoleList',
//         component: () => import('@/views/list/RoleList'),
//         meta: { title: '角色管理', permission: [ 'Admin' ] }
//       },
//       {
//         path: '/list/permission-list',
//         name: 'PermissionList',
//         component: () => import('@/views/list/PermissionList'),
//         meta: { title: '部门类别管理', permission: [ 'Admin' ] }
//       },
//     ]
//   },  

//    import TableList from '@/views/list/UserPhonelist'
// import Cusomgroup from '@/views/other/customgroup'

//    import UserLayout from '@/components/layouts/UserLayout'
// import BlankLayout from '@/components/layouts/BlankLayout'
// import BasicLayout from '@/components/layouts/BasicLayout'
// import RouteView from '@/components/layouts/RouteView'
// import PageView from '@/components/layouts/PageView'
// import TreeList from '@/views/other/TreeList'
    // 'Menu1-2': () => import('@/views/nested/menu1/menu1-2')
  }
  
 

// const AsyncComponent = () => ({
//     // 需要加载的组件 (应该是一个 `Promise` 对象)
//     component: import('@/components/layouts/BasicLayout.vue'),
//     // 异步组件加载时使用的组件
   
//     // 加载失败时使用的组件
  
//     // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//     delay: 200,
//     // 如果提供了超时时间且组件加载也超时了，
//     // 则使用加载失败时使用的组件。默认值是：`Infinity`
//     timeout: 3000
//   })

//   export default AsyncComponent