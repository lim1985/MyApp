<template>

  <a-modal
    title="添加人员"
    :width="680"
    v-model="PhoneVisible"
    @ok="handleOk"
  
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item         
          label='姓名'
          hasFeedback         
        >
          <a-input 
            placeholder='联系人姓名' 
            v-decorator="['UserName',{rules: [{ required: true, message: '用户名不能为空!' }]}]"
          /> 
          <!-- <a-input placeholder='联系人姓名' v-model="Mymdl.UserName" id='UserName' /> -->
        </a-form-item>
        <a-form-item
          label="性别"            
        >
          <a-radio-group v-decorator="['Sex',{initialValue:'1',rules: [{ required: true, message: '用户名不能为空!' }]}]">
            <a-radio value="1">男</a-radio>
            <a-radio value="2">女</a-radio>    
          </a-radio-group>
          <!-- <a-radio-group v-model="Sex">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>      
          </a-radio-group>       -->
        </a-form-item>   
        <a-row>
          <a-col :span="24">
            <a-form-item label='选择部门' hasFeedback>
              <a-cascader :showSearch="{filter}" placeholder="选择部门类别" v-decorator="['DepKeylist',{rules: [{ required: true, message: '部门不能为空！' }]}]" :options="options" @change="onChangeDeplist"/>
            </a-form-item>            
          </a-col>
          <a-col :span="24">
            <a-form-item               
              label='职务'
              hasFeedback        
            >
              <a-input placeholder='填写联系人的职务信息' v-decorator="['UJOB',{rules: [{ required: false, message: '部门不能为空！' }]}]"/> 
              <!-- <a-input placeholder='填写联系人的职务信息' v-model="Mymdl.UJOB" id='UJOB' />  -->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item             
              label='办公座机'
              hasFeedback        
            >
              <a-input placeholder='填写联系人的办公座机' v-decorator="['tel',{rules: [{ required: false, message: '' }]}]"/>
            </a-form-item>           
          </a-col>
          <a-col :span="24">
            <a-form-item
             
              label='办公手机'
              hasFeedback        
            >
              <a-input placeholder='填写联系人的办公手机' v-decorator="['cellphone',{rules: [{ required: true, message: '请填写办公手机！'}]}]"/> 
              <!-- <a-input placeholder='填写联系人的办公手机' v-model="Mymdl.cellphone" id='cellphone' /> -->
            </a-form-item>          
          </a-col>          
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
    
</template>

<script>
  import Vue from 'vue'  
  import { User_ID } from "@/store/mutation-types" 
  import {Select_PermissionsByRolesID,getUserrolesbyAdminID,AddPhoneUser} from '@/api/manage'
  //GetALLByDepID
export default {
  name: 'AdduserModal',
  data () {
    return {
      options:[],
      selectedRowKeys: [],
      selectedRows: [],
      PhoneVisible:false,        
      labelCol: {
        lg: {span: 15},
        xs: { span: 10 },
        sm: { span: 15 }
      },
      wrapperCol: {
        lg: {span:16},
        xs: { span: 20 },
        sm: { span: 24}
      },
      visible: false,
      confirmLoading: false,
      mdl: {}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {

  },
  async mounted(){   
      console.log(this.sDepID)
        //  this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);
     
      // this.DepName=await this.GetDepName();
      this.options=await this.GetDepnameAndchild()
      // console.log(this.options)
      
  
    },
  methods:  {
       async GetDepnameAndchild()
    {
      let _arr=[] 
      let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）   
      const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个      
          for (let x in roleslist.roles)
          {
             let result=await  Select_PermissionsByRolesID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型  
             _arr.push(result.res)          
          }
          // console.log(_arr)
         let arr=[]       
          _arr.forEach(v => {
            for(let x in v)
            {
               if(v[x].IsView && v[x].IsParent)
               {
                 let obj=new Object();               
                  obj.label=v[x].label
                  obj.value=v[x].value                
                  let DepArr=[]                     
                  v[x].actionOptions.forEach(s=>{
                      let childObj=new Object();
                    if(s.IsView && s.Permission_Key==obj.value ) 
                    {                       
                        // console.log(s)
                         childObj.label=s.Abbreviation
                         childObj.value=s.DepartmentId
                         DepArr.push(childObj)                                        
                    }
                       obj.children=DepArr
                  })                 
                    arr.push(obj)
               }               
            }
          });
            // console.log(arr);
          return arr        
      },
     filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      return value;
    },
    add () {
      this.edit();
    },
    edit () {
      // this.mdl = Object.assign({}, record)
      
      this.$nextTick(() => {
        this.form.resetFields();
        // this.form.setFieldsValue({ ...record })
        this.PhoneVisible = true       
      })
    },
    close () {
         this.$emit('close')
         this.PhoneVisible = false    
    },
  
    handleCancel () {
     
    },
     handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          console.log('form values', values)
          _this.confirmLoading = true
          // 模拟后端请求 2000 毫秒延迟
          new Promise((resolve) => {          
          setTimeout(async () => {
              const res=await AddPhoneUser(values)             
                 resolve(res);    
          }, 1000)          
          }).then(function (r) {
            console.log(r)
            if(r.code==-1)
          {            
             _this.$message.error('该号码已被使用，请重新输入！');                    
          }else if(r.code==-2)
          {
             _this.$message.error('添加联系人失败，请和管理员联系！');  
          }
          else
          {                                        
              _this.$message.success('添加人员成功。');             
              _this.PhoneVisible = false   
              _this.$emit('ok')                                      
          }}).catch(function (reject) {
              console.log(reject)
          }).finally(() => {
            _this.confirmLoading = false
          
          })        
        }
      })
    },
      HandleUserPhoneAdd(e)
        {
        // this.Mymdl.Sex=this.Sex
        console.log(this.Mymdl)
        e.preventDefault()
         this.form.validateFields(async(err, values) => {

           console.log(values)
           if(!err)
           {
             const res=await AddPhoneUser(values)
              if(res.code==-1)
          {            
             this.$message.error('该号码已被使用，请重新输入！');                    
          }else if(res.code==-2)
          {
             this.$message.error('添加联系人失败，请和单位管理员联系！');  
          }
          else
          {                     
            setTimeout(() => {            
              this.$message.success('添加人员成功。'); 
              this.$refs.mytable.refresh()
              this.PhoneVisible = false    
            }, 100);                            
          }          
            console.log('Received values of form: ', values)
          }
          
         })   
        },

  }
}
</script>
