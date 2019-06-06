<template>

  <a-modal
    title="修改人员信息"
    :width="800"
    v-model="PhoneVisible"
    @ok="handleOk"  
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="confirmLoading">
      <a-form
        :form="form"       
      > 
        <a-row>
          <a-col :span="10">
            <a-form-item 
              :colon="false"
              label="ID"
              :label-col="{ span:7}"
              :wrapper-col="{ span: 12 }"
            >
              <a-input 
                disabled
                placeholder='ID' 
                v-decorator="['ID',{rules: [{ required: true }]}]"
              /> 
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item 
              :colon="false"
              label="头像"
              :label-col="{ span:8}"
              :wrapper-col="{ span: 12 }"
            >
              <a-avatar shape="square" :size="72" icon="user" />
            </a-form-item>
          </a-col>
        </a-row>             
        <a-row>
          <a-col :span="12">
            <a-form-item   
              :colon="false"
              v-bind="formItemLayout"         
              label='姓  名'
              hasFeedback         
            >
              <a-input 
                disabled
                placeholder='联系人姓名' 
                v-decorator="['UserName',{rules: [{ required: true },{ validator:v().checkUsername }]}]"
              /> 
              <!-- <a-input placeholder='联系人姓名' v-model="Mymdl.UserName" id='UserName' /> -->
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :colon="false"
              v-bind="formItemLayout"      
              label="性别"            
            >
              <a-radio-group 
                disabled
                v-decorator="['Sex',{ rules: [{ required: true}]}]">
                <a-radio value='1'>男</a-radio>
                <a-radio value='2'>女</a-radio>    
              </a-radio-group>        
            </a-form-item>   
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item   
              :colon="false"
              v-bind="formItemLayout"             
              label='生日'  
              hasFeedback                 
            >
              <a-date-picker @change="onChange" v-decorator="['BirthDay',{rules: [{ required: false }]}]" />
              <!-- <a-input placeholder='填写联系人的出生日期' v-decorator="['BirthDay',{rules: [{ required: false },{ validator: checkTel }]}]"/> -->
            </a-form-item>           
          </a-col>
          <a-col :span="12">
            <a-form-item
              :colon="false"
              v-bind="formItemLayout"     
              label='状态'   
              hasFeedback                              
            >
              <a-select style="width: 120px" v-decorator="['status',{rules: [{ required: false }]}]">
                <a-select-option value="9">正常</a-select-option>
                <a-select-option value="7">停用</a-select-option>               
              </a-select>
              <!-- :help="Tips"  
              :validateStatus="status"     -->
              <!-- <a-input placeholder='填写联系人的状态' v-decorator="['status',{rules: [{ validator: checkPhone }]}]"/>  -->
              <!-- <a-input placeholder='填写联系人的办公手机' v-model="Mymdl.cellphone" id='cellphone' /> -->
            </a-form-item>   
          </a-col>          
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item 
              :colon="false"
              label='选择部门'
              hasFeedback
              v-bind="formItemLayout">
              <a-cascader :showSearch="{filter}" placeholder="选择部门类别" v-decorator="['DepKeylist',{rules: [{ required: true, message: '部门不能为空！' }]}]" :options="options" @change="onChangeDeplist"/>
            </a-form-item>            
          </a-col>
          <a-col :span="12">
            <a-form-item     
              :colon="false"          
              label="职务"
              hasFeedback  
              v-bind="formItemLayout"             
            >
              <a-input placeholder='填写联系人的职务信息' v-decorator="['UJOB',{rules: [{ required: false},{validator: v().checkjob}]}]"/> 
              <!-- <a-input placeholder='填写联系人的职务信息' v-model="Mymdl.UJOB" id='UJOB' />  -->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item   
              :colon="false"
              v-bind="formItemLayout"             
              label='办公座机'  
              hasFeedback                 
            >
              <a-input placeholder='填写联系人的办公座机' v-decorator="['Tel',{rules: [{ required: false },{ validator: v().checkTel }]}]"/>
            </a-form-item>           
          </a-col>
          <a-col :span="12">
            <a-form-item
              :colon="false"
              v-bind="formItemLayout"     
              label='办公手机'   
              hasFeedback                              
            >
              <!-- :help="Tips"  
              :validateStatus="status"     -->
              <a-input placeholder='填写联系人的办公手机' v-decorator="['cellphone',{rules: [{ required: false },{ validator:v().checkPhoneallowNull }]}]"/> 
              <!-- <a-input placeholder='填写联系人的办公手机' v-model="Mymdl.cellphone" id='cellphone' /> -->
            </a-form-item>   
          </a-col>          
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item   
              :colon="false"
              v-bind="formItemLayout"             
              label='家庭座机'  
              hasFeedback                 
            >
              <a-input placeholder='填写联系人的家庭座机' v-decorator="['H_Tel',{rules: [{ required: false },{ validator: v().checkTel }]}]"/>
            </a-form-item>           
          </a-col>
          <a-col :span="12">
            <a-form-item
              :colon="false"
              v-bind="formItemLayout"     
              label='家庭手机'   
              hasFeedback                              
            >
              <!-- :help="Tips"  
              :validateStatus="status"     -->
              <a-input placeholder='填写联系人的家庭手机' v-decorator="['H_cellphone',{rules: [{ validator: v().checkPhoneallowNull }]}]"/> 
              <!-- <a-input placeholder='填写联系人的办公手机' v-model="Mymdl.cellphone" id='cellphone' /> -->
            </a-form-item>   
          </a-col>          
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item   
              :colon="false"
              v-bind="formItemLayout"             
              label='QQ'  
              hasFeedback                 
            >
              <a-input placeholder='填写联系人的QQ' v-decorator="['QQ',{rules: [{ validator:v().checkNum },{ required: false }]}]"/>
            </a-form-item>           
          </a-col>
          <a-col :span="12">
            <a-form-item
              :colon="false"
              v-bind="formItemLayout"     
              label='Email'   
              hasFeedback                              
            >
              <!-- :help="Tips"  
              :validateStatus="status"     -->
              <a-input placeholder='填写联系人的邮箱' v-decorator="['Email',{rules: [{type: 'email'}]}]"/> 
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
  import { mapState} from 'vuex'
  import { User_ID } from "@/store/mutation-types" 
  import {UpdateUserPhone,Select_PermissionsByRolesID,getUserrolesbyAdminID,AddPhoneUser} from '@/api/manage'
  import { Promise } from 'q';
  import Validate from '@/tools/Validate/index'
  import { error } from 'util';
  //GetALLByDepID,asyncValidateTel
export default {
  name: 'AdduserModal',
   
  data () {
    return {     
      tel:'',
      Isvalidate:false,     
      Tips:'',
      options:[],
      selectedRowKeys: [],
      selectedRows: [],
      PhoneVisible:false,        
       formItemLayout: {
         labelCol: {
          xs: { span: 12 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span:16 },
          sm: { span: 16},
        },
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
    computed:{
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY,
        V_name:state=>state.user.name,
        UserPhoneID:state=>state.user.UserPhoneID        
      })    
    },
   watch: {
     
        // this.ValidateTel(val);
     
        
      },
  async mounted(){   
      console.log(this.mdl)
      this.options=await this.GetDepnameAndchild()
      // console.log(this.options)    
    },
  methods:  {
      v(){
      // console.log(Validate)
      return Validate 
    },
      onChange(date, dateString) {
       console.log(date, dateString);
    },
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
  
    add (s) {   
       this.$store.commit('SET_UserPhoneID', s.ID)
         this.edit({
         ID:s.ID,
         DepKeylist:[s.Permission_Key,s.Department_ID],
         Email:s.Email,
         UJOB:s.UJOB,
         status:s.Ustatus,
         Sex:s.Sex,
         BirthDay:s.BirthDay,
         UserName: s.UserName,
         Tel:s.Tel,
         H_Tel:s.H_Tel,
         cellphone:s.cellphone,
         H_cellphone:s.H_cellphone,
         QQ:s.QQ,
         avatar:s.avatar
        });
  
     
    },
     edit (record) {
      this.mdl = Object.assign({}, record)
     
      this.PhoneVisible = true
     
      this.$nextTick(() => {
        setTimeout(() => {
        this.form.setFieldsValue({
        ID:record.ID,
        cellphone:record.cellphone,
        H_cellphone:record.H_cellphone,
        Tel:record.Tel,
        H_Tel:record.H_Tel,
        avatar:record.avatar,       
        QQ:record.QQ,
        Sex: record.Sex+'' ,
        status: record.status+'',
        DepKeylist:record.DepKeylist,
        Email:record.Email,
        UJOB:record.UJOB,
        BirthDay:record.BirthDay,
        UserName:record.UserName,
      });
        
        
          // this.form.setFieldsValue({ ...record })
        }, 100);
          
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
      
          _this.confirmLoading = true
          // 模拟后端请求 2000 毫秒延迟
          new Promise((resolve,reject) => {          
          setTimeout(async () => {
              const res=await UpdateUserPhone(values)             
              if(res)
              {
                resolve(res)
              }
              else
              {
                reject(new error)
              }
                 
          }, 1000)          
          }).then(function (r) {
           
           if(r)
           {
              _this.$message.success('修改人员信息成功'); 
              _this.PhoneVisible = false   
              _this.$emit('ok')        
           }
           else
           {
               _this.$message.error('修改人员信息失败');  
           }
          }).catch(function (err) {
             console.log(err)
          }).finally(() => {
            _this.confirmLoading = false
            // _this.close();
          
          })        
        }
      })
    },
      HandleUserPhoneAdd(e)
        {
        // this.Mymdl.Sex=this.Sex
      
        e.preventDefault()
         this.form.validateFields(async(err, values) => {

        
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
          
          }
          
         })   
        },

  }
}
</script>
