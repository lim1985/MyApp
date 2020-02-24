import Vue from 'vue'
import { login, getAdminInfo, getInfo,logout } from "@/api/login"
import { ACCESS_TOKEN ,User_ID} from "@/store/mutation-types"
import { welcome } from "@/utils/util"

import { SelectDepSmsCount } from '@/api/manage'


const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    userinfo:'',
    userID:'',
    DEPKEY:'',
    UserPhoneID:'',
    ReferenceStatus:false,
    ReferenceUserId:'',
    DepId:'',
    UserInformation:'',
    smscount:'不可用'
  },

  mutations: {
    SET_PhoneUSERINFO: (state, UserInformation) => {
      state.UserInformation = UserInformation
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_SENDSMS: (state,SendSmsList) => {
      state.SendSmsList = SendSmsList
    },
    SET_COUNT: (state,count) => {
      state.smscount = count
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_USERID:(state,userid)=>{
      state.userID=userid
    },
    SET_DEPKEY:(state,key)=>{
      state.DEPKEY=key
    },
    SET_UserPhoneID:(state,key)=>{
      state.UserPhoneID=key
    },
    SET_ReferenceStatus:(state,key)=>{
      state.ReferenceStatus=key
    },
    SET_ReferenceUserId:(state,key)=>{
      state.ReferenceUserId=key
    },
    SET_DepId:(state,key)=>{
      state.DepId=key
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
   //   console.log('登录页输入的内容：');
      console.log(userInfo);
      return new Promise((resolve, reject) => {
      
        console.log(userInfo);
        login(userInfo).then(res => {
        //  console.log('服务器打印的')       
          if(res.code===1)
          {
           // console.log('服务器生成的token'+res.token)
            //console.log(res.)           
            Vue.ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)  
           
            console.log(`登陆后`+res.userinfo.AdminID)               
            Vue.ls.set(User_ID,res.userinfo.AdminID)
            // commit('SET_USERID',res.userinfo.AdminID)  
            commit('SET_USERINFO',res.userinfo)              
            commit('SET_TOKEN',res.token) 
            resolve(res)
          }
          else
          {
           // console.log(res)
            resolve(res)
          }
        
        
        }).catch(error => {
          reject(error)
        })
     
      })
    }, 
    // 获取用户信息
    GetInfo({ commit }) {
    
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log(response)
          const result = response.result

         // console.log(result)
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                let action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId });
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
            commit('SET_USERINFO',  result.username)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  // 获取用户信息
  myGetInfo({ commit },UserID) {
    console.log(UserID)
    return new Promise((resolve, reject) => {
      getAdminInfo(UserID).then(async response => {          
        const result = response
      //  console.log('来自user.js')
      console.log(result)
      if(result.code==1)//没有设置roleid 的情况下
      {
         
          commit('SET_ROLES', result.result.RolesID)
          commit('SET_INFO', result.result)
          commit('SET_USERINFO',  result.result.AdminName)
          commit('SET_NAME', { name: result.result.AdminName, welcome: welcome() })
          commit('SET_AVATAR', result.result.RolesID.avatar)
          commit('SET_SENDSMS', result.result.RolesID.SendsmsList)

        // console.log(result.result.RolesID.SendsmsList)
          resolve(response)
          console.log('89898989')
        return 
      }
        if (result.result.role && result.result.role.permissions.length > 0) {
          const role = result.result.role
         console.log(result)
          role.permissions = result.result.role.permissions
          role.permissions.map(per => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              let action = per.actionEntitySet.map(action => { return action.action })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map(permission => { return permission.permissionId });
          // commit('SET_USERID','8')  
          // let smscount
          //   if(!result.result.SendsmsList || result.result.SendSmsList===undefined)
          // {
         console.log(result.result.SendsmsList);
        
         if(result.result.SendsmsList.length>0)
         {
           //权限内勾选了可发短信选项
          console.log('勾选了发短息权限')
          let smscount= await SelectDepSmsCount(result.result.SendsmsList)
          console.log(smscount);
          if(smscount)
          {
            commit('SET_COUNT', smscount.depcount[0].SMSCount)
          }         
         }
         else
         {
          //没有发短信权限
          console.log('没有发短息权限')
         }
     
          console.log(result.result.role)  
          console.log(`1-1-1-1-1-1-1-1-`)      
          console.log(role.permissionList)      
          commit('SET_ROLES', result.result.role)
          commit('SET_INFO', result.result)
          commit('SET_USERINFO',  result.result.username)
          commit('SET_SENDSMS', result.result.SendsmsList)
        } 
        else 
        {
          reject('getInfo: roles must be a non-null array !')
        }
        commit('SET_NAME', { name: result.result.name, welcome: welcome() })
        commit('SET_AVATAR', result.result.avatar)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USERID', '')        
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(User_ID)
        console.log(state.token);
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  }
}

export default user