import { axios } from '@/utils/request'
const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  orgTree: '/org/tree',
  permission: '/permission',
  //片区人员管理接口
  
  selectByJdId: '/api/selectByJdId',
  //权限接口
  addPermission: '/api/PermissionAdd',//添加权限//src\views\list\PermissionList.vue页面使用了该接口
  UpdataPermission: '/api/PermissionUpdata',//修改权限//src\views\list\PermissionList.vue页面使用了该接口
  DelPermission: '/api/PermissionDel',//修改权限//src\views\list\PermissionList.vue页面使用了该接口
  GetAllPermissionList:'/api/PermissionList',//未找到使用页面
  GetPermissionInfo:'/api/Permissionbykey',//使用页面src\views\list\Department.vue
  GetPermissionAll:'/api/getAllPermissAndDeplist',//返回所有权限和部门DepCardList.vue RoleList.vue 使用该接口
  GetDepTreelist:'/api/getAllDepTreeList',//返回部门树//src\views\other\TreeList.vue页面使用了该接口
  UpdataPermissionInformation:'/api/UpdataPermissionInformation',
  //GetAllPermissionList:'/api/PermissionList',
  
  //纠错模块
  submitErrorInfo:'/api/submitErrorInfo',
  selectErrorInfo:'/api/selectErrorInfo',
  UpdateErrorInfo:'/api/UpdateErrorInfo',

//舆情模块
  yuqinglogin:'http://api.dxzc.gov.cn:8080/api',
  // getCode:'http://api.dxzc.gov.cn:8080/getCode',



  //角色接口
  addRole: '/api/rolesAdd',
  getrolelist:'/api/roleslist',

  //管理员用户接口
  UpdataAdminRoles:'/api/ActionUpdataAdmin',  //修改管理员角色
  GetAdmininfo:'/api/userInfo', //查询管理员信息
  Delrole:'/api/rolesdel',//删除角色
  addrolePermission:'/api/rolesAddPermission',//添加管理员角色
  GetPermissionByroleID:'/api/getPermissionbyroleID',//获取权限
  GetrolesbyAdminID:'/api/GetrolesbyAdminID',//获取管理员权限
  GetAllPermissionInformationByRoleId:'/api/GetAllPermissionInformationByRolesID',//999
  GetDyNamicRoutes:'/api/GetDyNamicRoutesByAdminID',
  

  //'/api/rolesAdd?RoleValue=1&Description=111'
  //部门管理接口列表
  AddParment:'/api/AddParment',
  UpdatePartment:'/api/UpdateDEPartment',  
  DeleteDEPartment:'/api/DeleteDEPartment',  
  QueryAllDeplist:'/api/DepartmentQueryALL',
  SelectAllDepchild:'/api/selectAlldepartmentBykey',
  SelectDepartmentByID:'/api/DepartmentGetByID',
  SelectDepslistsbyLike:'/api/SelectDepslistsbyLike', 
  selectDepSmsCount:'/api/selectDepSmsCount',//查询单位短信条数
  updateDepSmsCount:'/api/updateDepSmsCount',//更新单位发送条数
  //短信接口配置参数
  selectSmsAccounts:'/api/selectSmsAccounts',//'http://api.dxzc.gov.cn:3001/api/selectSmsAccounts',//查询单位发短信接口参数。
  updateSmsAccounts:'/api/updateSmsAccounts',//'http://api.dxzc.gov.cn:3001/api/selectSmsAccounts',//查询单位发短信接口参数。
  AddSmsAccounts:'/api/AddSmsAccounts',//'http://api.dxzc.gov.cn:3001/api/selectSmsAccounts',//查询单位发短信接口参数。

  // .post('/updateSmsAccounts',SMSAccount.updateDepAccounts) 
  // //新增部门短信发送账号信息
  // .post('/AddSmsAccounts',SMSAccount.AddDepAccounts)
 
                   //http://api.dxzc.gov.cn:3001/api/selectSmsAccounts
  //通讯录管理接口
  //通讯录人员添加
 
  ChangeToQita:'/api/ChangeToQita',
  GetAllUserList:'/api/userlist',
  UpdateUserPhone:'/api/UpdatePhoneUser',
  asyncValidateTel:'/api/asyncValidateTel',
  AddPhoneUser:'/api/AddPhoneUser',
  GetAllPhoneUserByPermissionKey:'/api/AllPhoneUserByPermissionkey',
  GetByDepIDAndPermissionKey:'/api/GetDepIDAndPermissionKey',
  PostDepIDAndPermissionKey:'/api/PostDepIDAndPermissionKey',
  DeleteUserByUID:'/api/DeleteUser',//其实并不删除，只是将该联系人放到 其他 特定栏目中去
  GetuserInformationByTelNum:'/api/GetuserInformationbyTelNum',//获取用户信息By手机号
  GetuserInformationbyname:'/api/GetuserInformationbyname',//获取用户信息By用户名
  GetUserInformationByUserNameLIke:'/api/GetUserInformationByUserNameLIke',//获取用户信息By用户名  自定义组 和 首页搜索里用了该接口
  GetAllPhoneuser:'/api/GetAllPhoneuser',
  GetALLByDepID:'/api/GetAllByDepID',//DepID=70 用于UserPhoneList页面获取通讯录用户数据用
  GetUserByNameAndDepID:'/api/GetUserByNameAndDepID',//批量检查999
  importUsersList:'/api/importUsersList',//批量导入999
  SortUserPhoneList:'/api/SortUserPhoneList',//排序

  

 //引用表操作
  ReferenceAdd:'/api/ReferenceAdd',//用于list/modules/UserPhone/addUserPhone
  ReferenceDelete:'/api/ReferenceDelete',//用于list/modules/UserPhone/addUserPhone
  IsReference:'/api/IsReference',//用于判断该单位是否引用过该用户{DEPid，userid}999
  
 //发短信接口
   sendsms:'http://api.dxzc.gov.cn:3000/api/sendsms',
   GetVerificatCode:'/api/GetVerificatCode',   
   smsstatus:'http://api.dxzc.gov.cn:3000/api/status',
   SmsAddRecord:'http://api.dxzc.gov.cn:3000/api/smsAddrecord',
   smssucceedcount:'http://api.dxzc.gov.cn:3000/api/GetSmsSucceedCount',
   ChinaCMCCSendSMS:'http://api.dxzc.gov.cn:3000/api/sendCMCC',
   newChinaCMCCSendSMS:'http://api.dxzc.gov.cn:3000/api/newsendCMCC',
   GetSmsRecord:'http://172.20.8.28:3000/api/getsmsrecord',
   GetSmsmo:'http://172.20.8.28:3000/api/getsmsmo',
  //  172.20.8.28:3000/api/getsmsmo?DepID=158
   
//通过省里的深度融合接口返回数据
   //http://api.dxzc.gov.cn:3000/api/getalluserinfo
   GetUserInformation:'http://api.dxzc.gov.cn:3000/api/getalluserinfo',
   //添加自定义组
   CreateCustomGroup:'/api/createGroup',
   GetCustomGroup:'/api/GetGroup',
   GetAllDepUser:'/api/GetAllDepUser',
   AddUserToGroup:'/api/adduserTogroup',
   InGroupUsersID:'/api/InGroupUsersID',
   FindAllUserByGroupID:'/api/FindAllUserByGroupID',
   DeleteGroupUser:'/api/DeleteGroupUser',
   DeleteGroup:'/api/DeleteGroup',
   SortCustomGroupUsers:'/api/SortCustomGroupUserPhoneList',

  //上传xlsx文件
   Uploadfiles:'http://59.230.230.39:3002/api/upload',
   //省里发短信地址
   HuNansms:'https://auth.zwfw.hunan.gov.cn/aip/v1/gov/person/sms',
   GetPhoneNum:'http://localhost:8080/apis'
//  axios.get('http://api.dxzc.gov.cn:3000/api/sendsms', {
//   params: {
//   u:'limannlee',
//   p:'d8a341b329a63c4f0789511ae8a81fec',
//   m:phone,
//   c:'【区政府办】'+`您单位在大祥之窗上有信息未更新，`+contents+`，信息员变更请电话至13973990779`,
//   i:i,
//   tokens:params
//   }
// })
}

export default api
//自定义组的通讯录人员排序


//获取验证码
// export function YQGetCode (parameter) {
//   return axios({
//     url: api.getCode,
//     method: 'get',
//     params: parameter  
//   })
// }

//居民用户信息查询
export function selectByJdId (parameter) {
  return axios({
    url: api.selectByJdId,
    method: 'get',
    params: parameter  
  })
}


export function UpdateDepSmsCount (parameter) {
  return axios({
    url: api.updateDepSmsCount,
    method: 'get',
    params: parameter  
  })
}
export function AddSmsAccounts (parameter) {
  return axios({
    url: api.AddSmsAccounts,
    method: 'POST',
    data:parameter,
    async:false,
    headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json; charset=utf-8'
		},
  })
}
export function updateSmsAccounts (parameter) {
  return axios({
    url: api.updateSmsAccounts,
    method: 'POST',
    data:parameter,
    async:false,
    headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json; charset=utf-8'
		},
  })
}
export function SelectSmsAccounts (parameter) {
  return axios({
    url: api.selectSmsAccounts,
    method: 'POST',
    data:parameter,
    async:false,
    headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json; charset=utf-8'
		},
  })
}
export function yuqingLogin (parameter) {
  return axios({
    url: api.yuqinglogin,
    method: 'POST',
    data:parameter,
    async:false,
    headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json; charset=utf-8'
		},
  })
}
//修改纠错信息
export function UpdateErrorInfo (parameter) {
  return axios({
    url: api.UpdateErrorInfo,
    method: 'get',
    params: parameter  
  })
}
//查询纠错信息
export function selectErrorInfo (parameter) {
  return axios({
    url: api.selectErrorInfo,
    method: 'get',
    params: parameter  
  })
}
//提交纠错信息
export function submitErrorInfo (parameter) {
  return axios({
    url: api.submitErrorInfo,
    method: 'get',
    params: parameter  
  })
}
//查询部门短信条数
export function SelectDepSmsCount (parameter) {
  return axios({
    url: api.selectDepSmsCount,
    method: 'POST',
    data:parameter,
  })
}

//自定义组的通讯录人员排序
export function SortCustomGroupUsers (parameter) {
  return axios({
    url: api.SortCustomGroupUsers,
    method: 'POST',
    data:parameter,
  })
}
//将用户转到其他栏目替代删除
export function changeUserToQita (parameter) {
  return axios({
    url: api.ChangeToQita,
    method: 'get',
    params: parameter  
  })
}

//通过省里平台获取用户信息
export function GetDyNamicRoutes (parameter) {
  return axios({
    url: api.GetDyNamicRoutes,
    method: 'get',
    params: parameter  
  })
}
//通过省里平台获取用户信息
export function GetUserInformation (parameter) {
  return axios({
    url: api.GetUserInformation,
    method: 'get',
    params: parameter  
  })
}
//根据身份证获取手机号
export function GetPhoneNum (parameter) {
  return axios({
    url: api.GetPhoneNum,
    method: 'POST',
    data:parameter,
    // transformRequest: [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }],
    headers:{
      'Content-Type' :'application/x-www-form-urlencoded;'
    }
  })
}
//CMCC发短信
export function HuNansms (parameter) {
  return axios({
    url: api.HuNansms,
    method: 'post',
    data:parameter  ,
    headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
  })
}

//CMCC发短信
export function CMCCSendSMS (parameter) {
  return axios({
    url: api.ChinaCMCCSendSMS,
    method: 'post',
    data:parameter  
  })
}
//新CMCC发短信，增加了动态调用不同部门的短信发送账户密码
export function newChinaCMCCSendSMS (parameter) {
  return axios({
    url: api.newChinaCMCCSendSMS,
    method: 'post',
    data:parameter  
  })
}


//获取验证码
export function GetVerificatCode (parameter) {
  return axios({
    url: api.GetVerificatCode,
    method: 'get',
    params: parameter,
    withCredentials:true  
  })
}
export function SelectDepslistsbyLike (parameter) {
  return axios({
    url: api.SelectDepslistsbyLike,
    method: 'get',
    params: parameter
  })
}

export function GetUserInformationByUserNameLIke (parameter) {
  return axios({
    url: api.GetUserInformationByUserNameLIke,
    method: 'get',
    params: parameter
  })
}
//拖拽排序
//method=post
export function SortUserPhoneList (parameter) {
  return axios({
    url: api.SortUserPhoneList,
    method: 'post',
    data:parameter  
  })
}
//批量导入
export function importUsersList (parameter) {
  return axios({
    url: api.importUsersList,
    method: 'post',
    data:parameter  
  })
}
//批量检查
export function GetUserByNameAndDepID (parameter) {
  return axios({
    url: api.GetUserByNameAndDepID,
    method: 'post',
    data:parameter  
  })
}
export function Uploadfiles (parameter) {
  return axios({
    url: api.Uploadfiles,
    method: 'post',
    data:parameter,  
    headers: {
    'Content-Type': 'multipart/form-data'
    }
  })
}
export function GetAllUserList (parameter) {
  return axios({
    url: api.GetAllUserList,
    method: 'get',
    params: parameter
  })
}
export function GetuserInformationbyName (parameter) {
  return axios({
    url: api.GetuserInformationbyname,
    method: 'get',
    params: parameter
  })
}
export function GetUserInformationByTelnum (parameter) {
  return axios({
    url: api.GetuserInformationByTelNum,
    method: 'get',
    params: parameter
  })
}
//是否引用过
export function IsReference (parameter) {
  return axios({
    url: api.IsReference,
    method: 'get',
    params: parameter
  })
}
export function ReferenceDelete (parameter) {
  return axios({
    url: api.ReferenceDelete,
    method: 'get',
    params: parameter
  })
}
export function DeleteUser (parameter) {
  return axios({
    url: api.DeleteUserByUID,
    method: 'get',
    params: parameter
  })
}

export function DeleteGroup (parameter) {
  return axios({
    url: api.DeleteGroup,
    method: 'get',
    params: parameter
  })
}
export function DeleteGroupUser (parameter) {
  return axios({
    url: api.DeleteGroupUser,
    method: 'get',
    params: parameter
  })
}
export function FindAllUserByGroupID (parameter) {
  return axios({
    url: api.FindAllUserByGroupID,
    method: 'get',
    params: parameter
  })
}
export function InGroupUsersID (parameter) {
  return axios({
    url: api.InGroupUsersID,
    method: 'get',
    params: parameter
  })
}
export function AddUserToGroup (parameter) {
  return axios({
    url: api.AddUserToGroup,
    method: 'post',
    data:parameter  
  })
}
export function GetAllDepUser (parameter) {
  return axios({
    url: api.GetAllDepUser,
    method: 'get',
    params: parameter
  })
}
export function GetCustomGroupByDepID (parameter) {
  return axios({
    url: api.GetCustomGroup,
    method: 'get',
    params: parameter
  })
}
export function CreateCustomGroup (parameter) {
  return axios({
    url: api.CreateCustomGroup,
    method: 'get',
    params: parameter
  })
}
//引用
export function SmsSucceedcount (parameter) {
  return axios({
    url: api.smssucceedcount,
    method: 'get',
    params: parameter
  })
}
export function SmsAddrecord (parameter) {
  return axios({
    url: api.SmsAddRecord,
    method: 'post',
    data:parameter 
  })
}

// GetSmsRecord:'http://api.dxzc.gov.cn:3000/api/getsmsrecord',
// GetSmsmo:'http://api.dxzc.gov.cn:3000/api/getsmsmo',
//获取短信发送记录
export function GetSmsRecord (parameter) {
  return axios({
    url: api.GetSmsRecord,
    method: 'get',
    params: parameter
  })
}
//获取短信回复记录
export function GetSmsmo (parameter) {
  return axios({
    url: api.GetSmsmo,
    method: 'get',
    params: parameter
  })
}
export function SendSMS (parameter) {
  return axios({
    url: api.sendsms,
    method: 'get',
    params: parameter
  })
}
export function ReferenceAdd (parameter) {
  return axios({
    url: api.ReferenceAdd,
    method: 'get',
    params: parameter
  })
}
export function UpdateUserPhone (parameter) {
  return axios({
    url: api.UpdateUserPhone,
    method: 'post',
    data:parameter 
  })
}
export function GetALLByDepID (parameter) {
  return axios({
    url: api.GetALLByDepID,
    method: 'get',
    params: parameter
  })
}
export function GetAllPhoneuser (parameter) {
  return axios({
    url: api.GetAllPhoneuser,
    method: 'get',
    params: parameter
  })
}

export function PostByDepIDPermissionKey (parameter) {
  return axios({
    url: api.PostDepIDAndPermissionKey,
    method: 'post',
    data:parameter   
  })
}
export function GetByDepIDAndPermissionKey (parameter) {
  return axios({
    url: api.GetByDepIDAndPermissionKey,
    method: 'get',
    params: parameter
  })
}
export function DepTreelist (parameter) {
  return axios({
    url: api.GetDepTreelist,
    method: 'get',
    params: parameter
  })
}
export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}
//获取角色ID的所有部门操作
export function Select_PermissionsByRolesID(parameter)
{  
  return axios({
    url: api.GetAllPermissionInformationByRoleId,
    method: 'get',
    params:parameter      
  })
}


//获取所有大类别和类别里的子部门
export function Updata_Permissioninfomation(parameter)
{  
  return axios({
    url: api.UpdataPermissionInformation,
    method: 'post',
    data:parameter     
  })
}
export function GetALLDep(parameter) {
  return axios({
    url: api.GetPermissionAll,
    method: 'get',
    params:parameter   
  })
}
//添加通讯录成员
export function SelectALLDepByKey(parameter) {
  return axios({
    url: api.SelectAllDepchild,
    method: 'get',
    params:parameter   
  })
}
//添加通讯录成员
export function GetAllPhoneUserByPermissionKey(parameter) {
  return axios({
    url: api.GetAllPhoneUserByPermissionKey,
    method: 'get',
    params:parameter   
  })
}
export function SelectDepByID(parameter) {
  return axios({
    url: api.SelectDepartmentByID,
    method: 'get',
    params:parameter   
  })
}


export function asyncValidateTel(parameter) {
  return axios({
    url: api.asyncValidateTel,
    method: 'post',
    data:parameter   
  })
}
export function AddPhoneUser(parameter) {
  return axios({
    url: api.AddPhoneUser,
    method: 'post',
    data:parameter   
  })
}
//修改部门信息
export function DelDePartment(parameter) {
  return axios({
    url: api.DeleteDEPartment,
    method: 'post',
    data:parameter   
  })
}

//修改部门信息
export function UpdatePartment(parameter) {
  return axios({
    url: api.UpdatePartment,
    method: 'post',
    data:parameter   
  })
}

export function QueryAllDeplist(parameter) {
  return axios({
    url: api.QueryAllDeplist,
    method: 'get',
    params:parameter   
  })
}

//添加部门接口
export function AddParment(parameter)
{
  return axios({
    url: api.AddParment,
    method: 'post',
    data: parameter,
  })
}

export function UpdataAdminBYID(parameter)
{
  return axios({
    url: api.UpdataAdminRoles,
    method: 'post',
    data: parameter,
  })
}
//查询管理员用户信息BY AdminID
export function GetAdmininfobyID(parameter) {
  return axios({
    url: api.GetAdmininfo,
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function AddrolesPermission(parameter) {
  return axios({
    url: api.addrolePermission,
    method: 'post',
    data: parameter,
  })
}
export function GetPermissioninfobyKey(parameter) {
  return axios({
    url: api.GetPermissionInfo,
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getRolesList(parameter) {
  return axios({
    url: api.getrolelist,
    method: 'get',
    params:parameter   
  })
}

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
//添加角色
export function Addroles(parameter) {
  return axios({
    url: api.addRole,
    method: 'get',
    params: parameter
  })
}
//获取角色里的权限列表
export function GetPermissionByroleID(parameter) {
  return axios({
    url: api.GetPermissionByroleID,
    method: 'get',
    params: parameter
  })
}
//获取管理员的权限BYADMINID
export function getUserrolesbyAdminID(parameter) {
  return axios({
    url: api.GetrolesbyAdminID,
    method: 'get',
    params: parameter
  })
}
//添加权限
export function AddPermission(parameter) {
  return axios({
    url: api.addPermission,
    method: 'get',
    params: parameter
  })
}
//获取权限列表
export function GetAllPermissionList(parameter) {
  return axios({
    url: api.GetAllPermissionList,
    method: 'get',
    params: parameter
  })
}


//修改权限UpdataPermission
export function UpdataPermission(parameter) {
  return axios({
    url: api.UpdataPermission,
    method: 'get',
    params: parameter
  })
}
//删除权限
export function DelPermission(parameter) {
  return axios({
    url: api.DelPermission,
    method: 'get',
    params: parameter
  })
}
export function Delroles(parameter) {
  return axios({
    url: api.Delrole,
    method: 'get',
    params: parameter
  })
}
export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id == 0 ? 'post' : 'put',
    data: parameter
  })
}