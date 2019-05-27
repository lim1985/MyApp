import { axios } from '@/utils/request'
const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  orgTree: '/org/tree',
  permission: '/permission',
  //权限接口
  addPermission: 'http://172.20.8.28:3001/api/PermissionAdd',//添加权限//src\views\list\PermissionList.vue页面使用了该接口
  UpdataPermission: 'http://172.20.8.28:3001/api/PermissionUpdata',//修改权限//src\views\list\PermissionList.vue页面使用了该接口
  DelPermission: 'http://172.20.8.28:3001/api/PermissionDel',//修改权限//src\views\list\PermissionList.vue页面使用了该接口
  GetAllPermissionList:'http://172.20.8.28:3001/api/PermissionList',//未找到使用页面
  GetPermissionInfo:'http://172.20.8.28:3001/api/Permissionbykey',//使用页面src\views\list\Department.vue
  GetPermissionAll:'http://172.20.8.28:3001/api/getAllPermissAndDeplist',//返回所有权限和部门DepCardList.vue RoleList.vue 使用该接口
  GetDepTreelist:'http://172.20.8.28:3001/api/getAllDepTreeList',//返回部门树//src\views\other\TreeList.vue页面使用了该接口
  UpdataPermissionInformation:'http://172.20.8.28:3001/api/UpdataPermissionInformation',

  

  //角色接口
  addRole: 'http://172.20.8.28:3001/api/rolesAdd',
  getrolelist:'http://172.20.8.28:3001/api/roleslist',

  //管理员用户接口
  UpdataAdminRoles:'http://172.20.8.28:3001/api/ActionUpdataAdmin',  //修改管理员角色
  GetAdmininfo:'http://172.20.8.28:3001/api/userInfo', //查询管理员信息
  Delrole:'http://172.20.8.28:3001/api/rolesdel',//删除角色
  addrolePermission:'http://172.20.8.28:3001/api/rolesAddPermission',//添加管理员角色
  GetPermissionByroleID:'http://172.20.8.28:3001/api/getPermissionbyroleID',//获取权限
  GetrolesbyAdminID:'http://172.20.8.28:3001/api/GetrolesbyAdminID',//获取管理员权限
  GetAllPermissionInformationByRoleId:'http://172.20.8.28:3001/api/GetAllPermissionInformationByRolesID',
  //'http://172.20.8.28:3001/api/rolesAdd?RoleValue=1&Description=111'
  //部门管理接口列表
  AddParment:'http://172.20.8.28:3001/api/AddParment',
  UpdatePartment:'http://172.20.8.28:3001/api/UpdateDEPartment',  
  DeleteDEPartment:'http://172.20.8.28:3001/api/DeleteDEPartment',  
  QueryAllDeplist:'http://172.20.8.28:3001/api/DepartmentQueryALL',
  SelectAllDepchild:'http://172.20.8.28:3001/api/selectAlldepartmentBykey',
  SelectDepartmentByID:'http://172.20.8.28:3001/api/DepartmentGetByID',
  //通讯录管理接口
  //通讯录人员添加


  UpdateUserPhone:'http://172.20.8.28:3001/api/UpdatePhoneUser',
  asyncValidateTel:'http://172.20.8.28:3001/api/asyncValidateTel',
  AddPhoneUser:'http://172.20.8.28:3001/api/AddPhoneUser',
  GetAllPhoneUserByPermissionKey:'http://172.20.8.28:3001/api/AllPhoneUserByPermissionkey',
  GetByDepIDAndPermissionKey:'http://172.20.8.28:3001/api/GetDepIDAndPermissionKey',
  GetAllPhoneuser:'http://172.20.8.28:3001/api/GetAllPhoneuser',
  GetALLByDepID:'http://172.20.8.28:3001/api/GetAllByDepID'//DepID=70 用于UserPhoneList页面获取通讯录用户数据用
 
}

export default api
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