<template>
  <a-modal
    title="操作"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
 
       
    <template>
      <div style="width: 100%">
        <a-radio-group v-model="mode" :style="{ marginBottom: '8px' }">
          <a-radio-button value="top">横排</a-radio-button>
          <a-radio-button value="left">竖排</a-radio-button>
        </a-radio-group>
        <a-tabs defaultActiveKey="sysdxqrmzf" :tabPosition="mode" :style="{ height: '100%'}" @prevClick="callback" @nextClick="callback">
          <template v-for="(item) in AllDepUsers.data">
            <a-tab-pane :tab="item.areaname" :key="item.areakey">
              <template v-for="(Permission,index) in item.Permission" >
                <a-card :hoverable="true" :key="index" class="card" :title="Permission.Permission_name" :bordered="false">
                  <a-row
                    :gutter="24"
                    :style="{ marginBottom: '12px' }">
                    <a-col :span="24" v-for="(DEP, index) in Permission.DEP" :key="index" :style="{ marginBottom: '12px' }">                    
                      <a-col :span="24">
                        <h3><a-icon type="idcard" :style="{fontSize: '22px',padding:'10px' }" theme="twoTone" twoToneColor="#409EFF"/>{{ DEP.DepartmentName }}：</h3>
                      </a-col>            
                      <a-row 
                        :gutter="24" 
                        :style="{padding:'40px 10px 0px 20px',marginBottom: '12px' }">
                   
                        <!-- <a-checkbox-group @change="onChangeCheck"> -->
                        <a-col v-for="(Users,index) in DEP.Users" :key="index" :span="6">         
                          <a-checkbox @change="onChangeCheck" :checked="checkGroup(Users.ID)" :value="Users.ID"></a-checkbox>
                          <span :style="{padding:'10px'}" :span="12">{{ Users.UserName }}</span>  
                        </a-col>
                        <!-- </a-checkbox-group> -->
                      </a-row>              
                    </a-col>
                  </a-row>
                </a-card>
              </template>
            </a-tab-pane>
          </template>       
        </a-tabs>
      </div>

    </template>
   
    <!-- <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="DepID"
          v-show="false"
        >
          <a-input v-decorator="['DepID', {}]"/>
        </a-form-item>
        <a-form-item
          label="GroupID"
        >
          <a-input v-decorator="['GroupID', {}]" disabled />
        </a-form-item>

        <a-form-item
          label="组名称"
        >
          <a-input
            @change="InputpOnChange"
            placeholder='输入自定义组名称如：区政府办班子成员' 
            v-decorator="['GroupName', {rules: [{ required: true, message: '组名称不能为空！' },{validator:v().checkGroupName}]}]" />
        </a-form-item>
      </a-form>
    </a-spin> -->
  </a-modal>
</template>

<script>
  import { GetAllDepUser,AddUserToGroup ,InGroupUsersID} from '@/api/manage'
  //CreateCustomGroup//
  import Vue from 'vue'  
  import { User_ID } from "@/store/mutation-types" 
  import { Promise } from 'q'

export default {
  name: 'UserToGroupAddModal',
  data () {
    return {
      vmodelList:null,
      checkModel:[50,39,1159],
      mode: 'top',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      form: this.$form.createForm(this),
      permissions: [],
      AllDepUsers:[],
      Mymdl:[]
    }
  },
  created () {
    // this.loadPermissions()
  },
  async mounted(){    
    this.GetAllDepAndUser();  
   
  },
  methods: {
    FindAllUserInGroup(s){
      console.log(s);
      let data={
       GroupID:s
       }
       InGroupUsersID(data).then(res=>{
         res.data.forEach(v => {          
          this.Mymdl.push(v.UserPhoneID);
         });
        //  console.log(this.Mymdl)
       })      
    },
    checkGroup(s)
    {            
      return this.Mymdl.indexOf(s)==-1?false:true
    },
      callback (val) {
      console.log(val)
    },      
    add (s) {
      this.edit(s)
    },
    edit (record) {
      console.log(record)
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.Mymdl=[];
      this.FindAllUserInGroup(this.mdl.key)
      // 有权限表，处理勾选
      // if (this.mdl.permissions && this.permissions) {
      //   // 先处理要勾选的权限结构
      //   const permissionsAction = {}
      //   this.mdl.permissions.forEach(permission => {
      //     permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
      //   })
      //   // 把权限表遍历一遍，设定要勾选的权限 action
      //   this.permissions.forEach(permission => {
      //     permission.selected = permissionsAction[permission.id] || []
      //   })
      // }

  // let {value} = e.target
  //            let s=makePy(value)
      // this.$nextTick(() => {
      //   this.form.setFieldsValue({
      //     DepID:record.DepID,
      //     GroupID:this.mdl.DepID+'-'+this.mdl.Key+'-',
      //     GroupName:''
      //   })
      // })
      console.log('this.mdl', this.mdl)
    },
    async GetAllDepAndUser()
    {
       let  userid= {AdminID:Vue.ls.get(User_ID)} 
      //  console.log(userid)
       this.AllDepUsers=await GetAllDepUser(userid)
        // console.log(this.AllDepUsers.data)
       
    },
    //   async GetDepnameAndchild()
    // {
    //   let _arr=[] 
    //   let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）   
    //   const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个 
    //   console.log(roleslist)     
    //       for (let x in roleslist.roles)
    //       {
    //          let result=await Select_PermissionsByRolesID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型  
    //          _arr.push(result.res)          
    //       }
    //       console.log(_arr)
    //      let arr=[]       
    //       _arr.forEach(v => {
    //         for(let x in v)
    //         {
    //            if(v[x].IsView && v[x].IsParent)
    //            {
    //              let obj=new Object();               
    //               obj.label=v[x].label
    //               obj.value=v[x].value                
    //               let DepArr=[]                     
    //               v[x].actionOptions.forEach(s=>{
    //                   let childObj=new Object();
    //                 if(s.IsView && s.Permission_Key==obj.value ) 
    //                 {                       
    //                     // console.log(s)
    //                      childObj.label=s.Abbreviation
    //                      childObj.value=s.DepartmentId
    //                      DepArr.push(childObj)                                        
    //                 }
    //                    obj.children=DepArr
    //               })                 
    //                 arr.push(obj)
    //            }               
    //         }
    //       });
    //         console.log(arr);
    //       return arr        
    //   },
    close () {
      this.$emit('close')
      this.visible = false
    },
    ok()
    {
      this.$emit('ok')
      this.visible=false
    },
    handleOk () {
      const _this = this 
      console.log(_this.Mymdl)   
      let _data=new Object();
      _data.UIDS=_this.Mymdl,
      _data.GroupID=_this.mdl.key    
       console.log(_data);
        _this.confirmLoading = true
        new Promise((resolve)=>{
          setTimeout(() => {
           AddUserToGroup(_data).then(res=>{
              resolve(res)
        })  
          }, 2000);
      }).then(result=>{
        if(result.code==1)
        {
            _this.$message.success('添加成功')
            _this.confirmLoading = false
            _this.ok();
        }
        else
        {
           _this.$message.error('添加失败')
        }
        console.log(result)
      })
         
     
   
      // 触发表单验证
      // this.form.validateFields((err, values) => {
      //   // 验证表单没错误
      //   if (!err) {
          
      //     console.log('form values', values)

      //     _this.confirmLoading = true
      //     // 模拟后端请求 2000 毫秒延迟
      //     new Promise((resolve) => {

      //       setTimeout(() => {
      //         CreateCustomGroup(values).then(res=>{            
      //           resolve(res)
      //         })
      //       }, 1000)
      //       }).then(result=>{
      //           console.log(result)
      //           if(result.code==-1)
      //           {
      //              _this.$message.error(result.msg)
      //              _this.confirmLoading = false
      //           }
      //           else
      //           {
      //               _this.$message.success(result.msg)
      //               _this.confirmLoading = false
      //               _this.close();
      //           }
      //         })
      //   }
      // })
    },
    handleCancel () {
      this.close()
    },
    onChangeCheck (e) {
        e.target.checked?this.Mymdl.push(e.target.value):this.Mymdl.splice(this.Mymdl.indexOf(e.target.value),1) 
        // console.log(this.Mymdl);
     
        console.log(this.Mymdl);
      // permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      // permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll (e, permission) {
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    // loadPermissions () {
    //   const that = this
    //   getPermissions().then(res => {
    //     const result = res.result
    //     that.permissions = result.map(permission => {
    //       const options = actionToObject(permission.actionData)
    //       permission.checkedAll = false
    //       permission.selected = []
    //       permission.indeterminate = false
    //       permission.actionsOptions = options.map(option => {
    //         return {
    //           label: option.describe,
    //           value: option.action
    //         }
    //       })
    //       return permission
    //     })
    //   })
    // }

  }
}
</script>

<style scoped>

</style>
