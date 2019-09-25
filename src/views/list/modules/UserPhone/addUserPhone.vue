<template>
  <div>
    <a-modal
      title="选择引用部门"
      :width="400"
      v-model="Referencevisible"
      @ok="handleReferenceOk"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-row>
          <a-col :span="4"></a-col>
          <a-col :span="16"><a-cascader placeholder="选择部门类别" v-decorator="['DepKeylist',{initialValue:this.DepValue,rules: [{ required: true, message: '部门不能为空！' }]}]" :showSearch="{filter}" :options="options" @change="onChangeDeplist"/></a-col>
          <a-col :span="4"></a-col>
          <!-- ReferenceStatus -->
        </a-row>    
      </a-spin>
    </a-modal>
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
            v-bind="formItemLayout"         
            label='姓  名'
            hasFeedback         
          >
            <a-input 
              placeholder='联系人姓名' 
              v-decorator="['UserName',{rules: [{ required: true },{ validator:v().asyncCheckUserName }]}]"
            /> 
            <!-- <a-input placeholder='联系人姓名' v-model="Mymdl.UserName" id='UserName' /> -->
          </a-form-item>
          <a-form-item
            :colon="false"
            v-bind="formItemLayout"     
            label='状态'   
            hasFeedback                              
          >
            <a-select v-decorator="['status',{initialValue:'7',rules: [{ required: false }]}]">
              <a-select-option value="9">前台显示</a-select-option>
              <a-select-option value="7">前台不显示</a-select-option>               
            </a-select>           
          </a-form-item> 
          <a-form-item
            v-bind="formItemLayout"      
            label="性  别"            
          >
            <a-radio-group v-decorator="['Sex',{initialValue:'1',rules: [{ required: true}]}]">
              <a-radio value="1">男</a-radio>
              <a-radio value="2">女</a-radio>    
            </a-radio-group>
            <!-- <a-radio-group v-model="Sex">
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>      
            </a-radio-group>       -->
          </a-form-item>   
          <a-form-item
            v-bind="formItemLayout"     
            label='办公手机'   
            hasFeedback                              
          >
            <!-- :help="Tips"  
            :validateStatus="status"     -->
            <a-input placeholder='填写联系人的办公手机' v-decorator="['cellphone',{rules: [{ required: true },{ validator:v().checkPhone }]}]"/> 
            <!-- <a-button type="primary" v-show="ReferenceStatus" @click="AddReference" :style="{ fontSize: '18px' }" icon="usergroup-add">添加引用</a-button> -->
            <!-- <a-input placeholder='填写联系人的办公手机' v-model="Mymdl.cellphone" id='cellphone' /> -->
          </a-form-item>  
          <a-row v-show="ReferenceStatus">
            <a-col :span="8"></a-col>
            <a-col :span="8"> <a-button type="primary" html-type="submit" v-show="true" @click="AddReference" :style="{ fontSize: '18px' }" icon="usergroup-add">添加引用</a-button></a-col>
            <a-col :span="8"></a-col>
            <!-- ReferenceStatus -->
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item 
                label='选择部门'
                hasFeedback
                v-bind="formItemLayout">
                <a-cascader :showSearch="{filter}" placeholder="选择部门类别" v-decorator="['DepKeylist',{initialValue:this.DepValue,rules: [{ required: true, message: '部门不能为空！' }]}]" :options="options" @change="onChangeDeplist"/>
              </a-form-item>            
            </a-col>
            <a-col :span="24">
              <a-form-item 
                label='单位备注'
                hasFeedback
                v-bind="formItemLayout">
                <a-input placeholder='如无对应单位请自行填写单位名称' v-decorator="['beizhu',{rules: [{ required: false},{validator:v().checkcharacter}]}]"/> 
              </a-form-item>            
            </a-col>
            <a-col :span="24">
              <a-form-item               
                label="职务"
                hasFeedback  
                v-bind="formItemLayout"             
              >
                <a-input placeholder='填写联系人的职务信息' v-decorator="['UJOB',{rules: [{ required: false},{validator:v().checkjob}]}]"/> 
                <!-- <a-input placeholder='填写联系人的职务信息' v-model="Mymdl.UJOB" id='UJOB' />  -->
              </a-form-item>
            </a-col>         
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item   
                v-bind="formItemLayout"             
                label='办公座机'  
                hasFeedback                 
              >
                <a-input placeholder='填写联系人的办公座机' v-decorator="['tel',{rules: [{ required: false },{ validator:v().checkTel }]}]"/>
              </a-form-item>           
            </a-col>                 
          </a-row>
        </a-form>
      </a-spin>
    </a-modal> 
  </div>  
</template>
<script>
  import Vue from 'vue'  
  import { mapState} from 'vuex'
  import { User_ID } from "@/store/mutation-types" 
  import {Select_PermissionsByRolesID,getUserrolesbyAdminID,AddPhoneUser,ReferenceAdd} from '@/api/manage'
  import { Promise } from 'q';
  import Validate from '@/tools/Validate/index'
  import { error } from 'util';
   //状态说明 [LIM_UsersPhone] 9 前台显示 7 前台不现实   
   //[LIM_ResferenceAndDep] 6 引用状态 -1 默认

  //GetALLByDepID,asyncValidateTel

export default {
  name: 'AdduserModal', 
  data () {
    return {      
      Referencevisible:false,
      DepValue:[],
      tel:'',
      Isvalidate:false,
      status:'',
      Tips:'',
      options:[],
      selectedRowKeys: [],
      selectedRows: [],
      PhoneVisible:false,        
       formItemLayout: {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span:20 },
          sm: { span: 10 },
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
     
    // this.v();
  },
    computed:{
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY,
        V_name:state=>state.user.name,
        UserPhoneID:state=>state.user.UserPhoneID,
        ReferenceStatus:state=>state.user.ReferenceStatus,
        ReferenceUserId:state=>state.user.ReferenceUserId
            
      })    
    },
   watch: {
   
      },
  async mounted(){   
      let _arr=await this.GetDepnameAndchild()    
      console.log("777777777777777")
      console.log(_arr) 
      this.options=this.QuChongFuObject(_arr);  
      console.log( this.options) 
      this.setDepkey();

    },
  methods:  {
    AddReference(){
      this.Referencevisible=true;     
    },
    setDepkey(){

      let _dep=  localStorage.getItem('DepKeylist')     
      if(!_dep)
      {
        this.DepValue=['QW',152]
      }
      else
      {
      let s=_dep.split(',')
      let _arr=[]
      for(let i=0;i<s.length;i++)
      {
          if(i==1)
          {
            s[i]= parseInt(s[i])
          }
          _arr.push(s[i])
      }
      this.DepValue=_arr
      }     
    },
      QuChongFuObject(arr) {
            var uniques = [];
          
            var obj = {};
                for(var i =0; i<arr.length; i++){
                    if(!obj[arr[i].value]){
                        uniques.push(arr[i]);
                        obj[arr[i].value] = true;
                    }
                }
              
                    return uniques
        },
    v(){     
        return Validate;
    },   
       async GetDepnameAndchild()
    {
      let _arr=[] 
      let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）   
      const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
     
          for (let x in roleslist.roles)
          {
             let result=await Select_PermissionsByRolesID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型  
             _arr.push(result.res)          
          }
        console.log("5555555")
        console.log(_arr)
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
          //返回结果
            console.log("返回结果")
            console.log(arr);
          return arr        
      },
     filter(inputValue, path) {
       
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      this.mdl=value;
     
      return value;
    },
    add () {
      setTimeout(() => {      
          this.edit();      
      }, 200);
    
    },
    edit () {
      // this.mdl = Object.assign({}, record) 
      
      
      this.$nextTick(() => {
        this.form.resetFields();
        this.setDepkey();  
        this.$store.commit('SET_ReferenceStatus',false); 
        this.form.setFieldsValue({
          DepKeylist: this.DepValue
        })
        this.PhoneVisible = true       
      })
    },
    close () {
         this.$emit('close')
         this.PhoneVisible = false    
    },  
    handleCancel () {
     
    },
    handleReferenceOk(){
        const _this = this
        new Promise ((resolve)=>{
             setTimeout(async () => {
               console.log(_this.mdl);
                 const res=await ReferenceAdd({UserPhoneID:_this.ReferenceUserId,DepID:_this.mdl[1]})             
                 resolve(res);     
            // this.Referencevisible=false;
            // this.PhoneVisible=false;
            // this.$emit('ok') 
        }, 100);         
        }).then(r=>{
              if(r.code==1)
          {
            console.log('referenceok')
            this.Referencevisible=false;
            this.PhoneVisible=false;
            this.$emit('ok')             
          }
          else if (r.code==-4)
          {
            _this.$message.error(r.msg);  

          }
        })           
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
              console.log(values);
              const res=await AddPhoneUser(values)             
              if(res)
              {
                 resolve(res); 
              }
              else
              {
                reject(new error)
              }
                   
          }, 1000)          
          }).then(function (r) {
          
            if(r.code==-3)
          {            
              _this.$message.error('该号码已被使用，不能录入系统');  
              _this.status="error"
              _this.Tips='该号码已被使用，不能录入系统'
          }else if(r.code==-2)
          {
             _this.$message.error('添加联系人失败，请和管理员联系！');  
          }
          else
          {   
                localStorage.setItem('DepKeylist', values.DepKeylist)                
            //  _this.Vue.ls.set('DepKeylist',)         
              // _this.DepValue= values.DepKeylist       
                           
              _this.$message.success('添加人员成功。');             
              _this.PhoneVisible = false   
              _this.$emit('ok');                                      
          }}).catch(function (err) {
                console.log(err)
          }).finally(() => {
            _this.confirmLoading = false
            // _this.close();
          
          })        
        }
      })
    },
    //停用函数
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
            // console.log('Received values of form: ', values)
          }          
         })   
        },

  }
}
</script>
