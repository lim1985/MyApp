import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
//let data ={remember_me: true, username: "1", password: "c4ca4238a0b923820dcc509a6f75849b"}
export function login(parameter) {
  return axios({
  //url:'http://localhost:8080/banns',
    url: api.Login,
  // url:'/auth/login',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }) 
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: api.UserInfo,
    method: 'get',  
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getAdminInfo(parameter) {
  return axios({
    url: api.myUserInfo,
    params: parameter,
    method: 'get',  
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}




export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}