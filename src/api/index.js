const api = {
    Login: 'http://59.230.230.40/api/login',
  //  Login: 'http://172.20.8.28:8080/api/ProxyLogin',

    
    Logout: '/auth/logout',
    ForgePassword: '/auth/forge-password',
    Register: '/auth/register',
    SendSms: '/account/sms',
    // get my info
  //  UserInfo: '/user/info',
    // myuserinfo:'http://59.230.230.40/api/userInfo',
    UserInfo: '/user/info',
    myUserInfo:'http://59.230.230.40/api/GetAllRolesDepIDPermission'
  
    // myUserInfo:'http://59.230.230.40/api/admininfo'
}
export default api