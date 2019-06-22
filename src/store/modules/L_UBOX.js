// import Vue from 'vue'
// import { login, getAdminInfo, getInfo,logout } from "@/api/login"
// import { ACCESS_TOKEN ,User_ID} from "@/store/mutation-types"
// import { welcome } from "@/utils/util"

const UBOX = {
  state: {
    HandleID: '',
    Event:'',
    Type:'',
    PhoneNumber:'',
    NumKey:'',
    Numkeys:'',
  
  },

  mutations: {
   
    SET_HANDLEID: (state, HandleID) => {
      state.HandleID = HandleID
    },
    SET_EVENT: (state, Event) => {
      state.Event = Event
    },
    SET_TYPE: (state, Type) => {
      state.Type = Type
    },
    SET_PHONENUMER: (state, PhoneNumber) => {
      state.PhoneNumber = PhoneNumber
    },
    SET_NUMKEY: (state, NumKey) => {
      state.Numkeys+= NumKey
    }, 
    SET_NUMKEYS: (state, key) => {
      state.Numkeys= key
    },        
  },

  actions: {
    // 登录
  //   Login({ commit }, userInfo) {
  //  //   console.log('登录页输入的内容：');
  //     // console.log(userInfo);
  //     return new Promise((resolve, reject) => {
  //       login(userInfo).then(res => {
  //       //  console.log('服务器打印的')       
  //         if(res.code===1)
  //         {
  //          // console.log('服务器生成的token'+res.token)
  //           //console.log(res.)           
  //           Vue.ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)  
           
  //           console.log(`登陆后`+res.userinfo.AdminID)               
  //           Vue.ls.set(User_ID,res.userinfo.AdminID)
  //           // commit('SET_USERID',res.userinfo.AdminID)  
  //           commit('SET_USERINFO',res.userinfo)              
  //           commit('SET_TOKEN',res.token) 
  //           resolve(res)
  //         }
  //         else
  //         {
  //          // console.log(res)
  //           resolve(res)
  //         }
        
        
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   }, 
    // 获取用户信息
    // GetInfo({ commit }) {
    
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(response => {
    //       console.log(response)
    //       const result = response.result

    //      // console.log(result)
    //       if (result.role && result.role.permissions.length > 0) {
    //         const role = result.role
    //         role.permissions = result.role.permissions
    //         role.permissions.map(per => {
    //           if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
    //             let action = per.actionEntitySet.map(action => { return action.action })
    //             per.actionList = action
    //           }
    //         })
    //         role.permissionList = role.permissions.map(permission => { return permission.permissionId });
    //         commit('SET_ROLES', result.role)
    //         commit('SET_INFO', result)
    //         commit('SET_USERINFO',  result.username)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', { name: result.name, welcome: welcome() })
    //       commit('SET_AVATAR', result.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
  // 获取用户信息
  // myGetInfo({ commit },UserID) {
  //   console.log(UserID)
  //   return new Promise((resolve, reject) => {
  //     getAdminInfo(UserID).then(response => {          
  //       const result = response
  //     //  console.log('来自user.js')
  //     //  console.log(result.result.role)
  //       if (result.result.role && result.result.role.permissions.length > 0) {
  //         const role = result.result.role
  //         // console.log(role)
  //         role.permissions = result.result.role.permissions
  //         role.permissions.map(per => {
  //           if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
  //             let action = per.actionEntitySet.map(action => { return action.action })
  //             per.actionList = action
  //           }
  //         })
  //         role.permissionList = role.permissions.map(permission => { return permission.permissionId });
  //         // commit('SET_USERID','8')  
  //         console.log(result.result.role)  
  //         console.log(`1-1-1-1-1-1-1-1-`)      
  //         console.log(role.permissionList)      
  //         commit('SET_ROLES', result.result.role)
  //         commit('SET_INFO', result.result)
  //         commit('SET_USERINFO',  result.result.username)
  //       } else {
  //         reject('getInfo: roles must be a non-null array !')
  //       }
  //       commit('SET_NAME', { name: result.result.name, welcome: welcome() })
  //       commit('SET_AVATAR', result.result.avatar)
  //       resolve(response)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
    // 登出
    // Logout({ commit, state }) {
    //   return new Promise((resolve) => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     commit('SET_USERID', '')        
    //     Vue.ls.remove(ACCESS_TOKEN)
    //     Vue.ls.remove(User_ID)
    //     logout(state.token).then(() => {
    //       resolve()
    //     }).catch(() => {
    //       resolve()
    //     })
    //   })
    // },

  }
}

export default UBOX