<template>
  <a-modal
    title="部门修改"
    :width="1000"
    v-model="UpdateVisible"
    @ok="handleOk"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item 
          v-if="showID"
          :colon="false"
          label="ID"
          v-bind="formItemLayout"
        >
          <a-input 
            disabled
            placeholder='ID' 
            v-decorator="['ID',{rules: [{ required: true }]}]"
          /> 
        </a-form-item>
        <a-form-item 
          :colon="false"
          label="部门ID"
          v-bind="formItemLayout"
        >
          <a-input 
            disabled
            placeholder='部门ID' 
            v-decorator="['DepID',{rules: [{ required: true }]}]"
          /> 
        </a-form-item>
        <!-- // AddSerial:null
        // ApID:"dxqrmt"
        // DepartmentId:159
        // EcName:"邵阳市大祥区政协办工会委员会"
        // Params:null
        // Password:"123456"
        // Sign:"V5J06zO73"
        // TemplateId:null -->
     
        <a-form-item
          v-bind="formItemLayout"
          label='短信账户企业账号'
          hasFeedback    
        > 
          <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
          <a-input 
            placeholder='输入短信账户企业账号' 
            v-decorator="['EcName',{rules: [{ required: true, message: '短信账户企业账号不能为空！' }]}]"
          /> 
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label='ApID'
          hasFeedback                   
        >       
          <!-- @change="InputpOnChange" -->
          <a-input 
           
            placeholder='输入短信账号' 
            v-decorator="['ApID',{rules: [{ required: true, message: '输入短信账号不能为空！' }]}]"
          /> 
          <!-- <a-input placeholder='部门名称（全称）' v-model="Mymdl.DEPName" @change="DepOnChange" id='DEPName' /> -->
        </a-form-item>
    
        <a-form-item
          v-bind="formItemLayout"
          label='密码'
          hasFeedback   
        >
          <a-input        
          
            placeholder='密码' 
            v-decorator="['Password',{rules: [{ required: true, message: '' }]}]"
          /> 
       
        </a-form-item>        
        <a-form-item
          v-bind="formItemLayout"
          label='签名码'
          hasFeedback   
        >
          <a-input        
            
            placeholder='签名码' 
            v-decorator="['Sign',{rules: [{ required: true, message: '' }]}]"
          /> 
       
        </a-form-item>      

      </a-form>
    </a-spin>
  </a-modal>  
</template>
<script>
  import Vue from 'vue'  

  import { User_ID } from "@/store/mutation-types" // AddSmsAccounts (parameter) {updateSmsAccounts
  import { SelectSmsAccounts,AddSmsAccounts,updateSmsAccounts,getUserrolesbyAdminID,Select_PermissionsByRolesID} from '@/api/manage'
  import { Promise } from 'q';
  import Validate from '@/tools/Validate/index'
  import { makePy } from '@/assets/js/pinying.js'  

  //GetALLByDepID,asyncValidateTel,QueryAllDeplist,UpdatePartment,DelDePartment，GetPermissionByroleID，GetPermissioninfobyKey

export default {
  name: 'CmccDepAccountsModal', 
  data () {
    return {  
      showID:false,
         action:'',
        DepName:[],        
        Mymdl:{},    
        UpdateVisible:false,    
        Tips:'',
        options:[],
        selectedRowKeys: [],
        selectedRows: [],       
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },       
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
      confirmLoading: false  
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {
     this.GetPermissionList();
    // this.v();
  },
    computed:{
     
    },
   watch: {
   
      },
      
  async mounted(){   
    //   this.DepName=await this.GetDepName()
    //    console.log(this.options)    
    },
  methods:  {   
        deteleObject(arr,attr,value) {
                var uniques = [];
                var _arrs=[]   
                for(let x in arr)
                {       
                    if(arr[x].IsView==value)
                    {   
                    _arrs.push(arr[x])           
                    }    
                }
                var obj = {};
                    for(var i =0; i<_arrs.length; i++){
                        if(!obj[_arrs[i].value]){
                            uniques.push(_arrs[i]);
                            obj[_arrs[i].value] = true;
                        }
                    }  
               return uniques
          },
        InputpOnChange(e){
             let {value} = e.target
             let s=makePy(value)
             this.$nextTick(() => {
             setTimeout(() => {
             this.form.setFieldsValue({
             UploadDir:this.Tips+'-'+s[0],        
            });
            }, 100);          
         }) 
      },
        DepOnChange(e)//根据输入的文字变成拼音首字母
        {
            this.Tips=e
            this.$nextTick(() => {
                    setTimeout(() => {
                    this.form.setFieldsValue({
                    UploadDir:this.Tips                
                });
            }, 100);          
          })               
        },
        async GetPermissionList(){
              let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
              let _temp=[]            
              let DepArr=[]           
            //   const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
            let P=new Promise(resolve=>{
               setTimeout(() => {
               getUserrolesbyAdminID({AdminID:userid.AdminID})
              .then(res=>res.roles)
              .then(res=>res)
              .then(async ress=>{
                  for(let x in ress)
                  {  
                      let _ar=await  Select_PermissionsByRolesID({ID:ress[x]})
                      _temp.push(_ar.res)
                  }
                  _temp.forEach(vx => {
                      for(let x in vx)
                      {
                         DepArr.push(vx[x])
                      }                     
                  });
                  let _permissionlist=this.deteleObject(DepArr,'IsView',true);             
                  resolve(_permissionlist)    
              })}, 100);
            })
            P.then(data=>{
                this.DepName=data
                console.log(data)
            })
        },       
    v(){     
        return Validate;
    },   
     filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      return value;
    },
  async add(s){       

  console.log(s)
  let result=await SelectSmsAccounts({DepID:s.DepartmentId});
  console.log(result);
      if(result.code==0)
      {
          console.log(`7777`)
          this.UpdateVisible = true
          this.showID=false;
          this.action='Add'
            this.edit({
              DepartmentId:s.DepartmentId,
              ApID:'',
              EcName:'',
              Password:'',
              Sign:'',
          }); 
          return 
      }
        // AddSerial:null
        // ApID:"dxqrmt"
        // DepartmentId:159
        // EcName:"邵阳市大祥区政协办工会委员会"
        // Params:null
        // Password:"123456"
        // Sign:"V5J06zO73"
        // TemplateId:null  

  this.action='Update'
  this.showID=true;
  this.edit({
     DepartmentId:s.DepartmentId,
     ApID:result.res.ApID,
     EcName:result.res.EcName,
     Password:result.res.Password,
     Sign:result.res.Sign,
     ID:result.res.ID,
  });    
    },
    edit (record) {
      console.log(record);
      // this.mdl = Object.assign({}, record)      
     
    //  console.log(record)
      this.$nextTick(() => {
        setTimeout(() => {
        this.form.setFieldsValue({
        DepID:record.DepartmentId,
        ApID:record.ApID,
        EcName:record.EcName,
        Password:record.Password,
        Sign:record.Sign,
        ID:record.ID     
         });         
        }, 200);
           
      })
      this.UpdateVisible = true
    },
    close () {
         this.$emit('close')
         this.UpdateVisible = false    
    },    
     handleOk () {
      const _this = this
      // 触发表单验证
      console.log(_this.action);
      let _result={}
      //,AddSmsAccount, updateSmsAccounts
    this.form.validateFields(async(err, values) => {
      if(!err)
      {
        _this.confirmLoading = true

      
            setTimeout(async() => {
              if(_this.action=='Add')
              {
                  // AddSmsAccount
                  console.log(values)
                      _result=await AddSmsAccounts(values);
                      console.log(_result)
                 if(_result.result.code==1)
                {
                  _this.confirmLoading=false;
                 _this.$message.success(_result.result.msg); 
                }   
              }
              else
              {
                // updateSmsAccounts
            _result=await updateSmsAccounts(values);
       console.log(_result)
                if(_result.result.code==1)
                {
                  _this.confirmLoading=false;
                 _this.$message.success(_result.result.msg); 
                }            
              }
                 _this.UpdateVisible=false        
            }, 1000)
        
        
      }
    }
    )
      // this.form.validateFields((err, values) => {
      //   // 验证表单没错误
      //   if (!err) {
      //     console.log('form values', values)
      //     _this.confirmLoading = true
      //       new Promise((resolve) => {          
      //     setTimeout(async () => {
      //       console.log(values)
      //         const res=await UpdatePartment(values)             
      //            resolve(res);    
      //     }, 1000)          
      //     }).then(function (r) {
            
      //      if(r)
      //      {
      //         _this.$message.success('修改部门信息成功'); 
      //         _this.UpdateVisible = false   
      //         _this.$emit('ok')        
      //      }
      //      else
      //      {
      //          _this.$message.error('修改部门信息失败');  
      //      }
      //     }).catch(function (reject) {
      //         console.log(reject)
      //     }).finally(() => {
      //       _this.confirmLoading = false
      //       // _this.close();
          
      //     })   
      //   }
      // })
    }
  }
}
</script>
