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
          :colon="false"
          label="部门ID"
          v-bind="formItemLayout"
        >
          <a-input 
            disabled
            placeholder='DepartmentId' 
            v-decorator="['DepartmentId',{rules: [{ required: true }]}]"
          /> 
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label='部门类别'
          hasFeedback          
        >
          <!-- :fieldDecoratorOptions="{rules: [{ required: true, message: '请先选择部门类别' }]}"     -->
          <a-select  
            @select="DepOnChange"     
            showSearch
            placeholder="选择部门类别" 
            v-decorator="['Permission_Key',{rules: [{ required: true, message: '部门不能为空！' }]}]"
          >           
            <template v-for="(item,index) in DepName">
              <a-select-option :key="index" :value="item.value">{{ item.label }}</a-select-option>
            </template>
            <!-- <a-select-option v-for="item,key in DepName" value='1'>Option 1</a-select-option>
            <a-select-option value='2'>Option 2</a-select-option>
            <a-select-option value='3'>Option 3</a-select-option>  -->
          </a-select>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label='部门全称'
          hasFeedback                   
        >       
          <a-input 
            @change="InputpOnChange"
            placeholder='输入部门全称' 
            v-decorator="['DepFullName',{rules: [{ required: true, message: '部门全称不能为空！' },{validator:v().checkjob}]}]"
          /> 
          <!-- <a-input placeholder='部门名称（全称）' v-model="Mymdl.DEPName" @change="DepOnChange" id='DEPName' /> -->
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label='部门简称'
          hasFeedback    
        > 
          <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
          <a-input 
            placeholder='输入部门简称' 
            v-decorator="['Abbreviation',{rules: [{ required: true, message: '部门简称不能为空！' },{validator:v().checkjob}]}]"
          /> 
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label='部门唯一标识'
          hasFeedback   
        >
          <a-input             
            placeholder='部门唯一标识' 
            v-decorator="['UploadDir',{rules: [{ required: true, message: '' }]}]"
          /> 
       
        </a-form-item>        
        <a-form-item
          v-bind="formItemLayout"
          label='部门权重'
          hasFeedback                
        >
          <a-input                 
            placeholder='部门权重最大为：100' 
            v-decorator="['Priority',{rules: [{ required: true, message: '权重不能为空' },{validator:v().checkNum1to100}]}]"
          /> 
          <!-- <a-input placeholder='填写权重最大为：100' v-model="Mymdl.Priority" @keyup="loadNumber($event)" id='Priority' /> -->
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>  
</template>
<script>
  import Vue from 'vue'  
  import { mapState} from 'vuex'
  import { User_ID } from "@/store/mutation-types" 
  import { UpdatePartment,getUserrolesbyAdminID,Select_PermissionsByRolesID} from '@/api/manage'
  import { Promise } from 'q';
  import Validate from '@/tools/Validate/index'
  import { makePy } from '@/assets/js/pinying.js'  

  //GetALLByDepID,asyncValidateTel,QueryAllDeplist,UpdatePartment,DelDePartment，GetPermissionByroleID，GetPermissioninfobyKey

export default {
  name: 'AdduserModal', 
  data () {
    return {  
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
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY,
        V_name:state=>state.user.name,
        UserPhoneID:state=>state.user.UserPhoneID        
      })    
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
//      async GetDepName()
//     {
     
//       let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
//       const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
//       let _temp=''
//       let s =''
//       let DepArr=[]
//         for (let x in roleslist.roles)
//         {
//               let res=await  GetPermissionByroleID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型
//               _temp=res.result+'|'               //合并循环出来的字符串
//               s+=_temp                //同上
//         }
//        let _arr=s.split('|')//按 “|”分隔符生成数组    
//        var r = _arr.filter(function(element,index,self){//数组去重         
//        return self.indexOf(element) === index && element //去无效属性
//     })      
      
//         for (let x in r)
//         {
//             const obj=new Object();
//             const res=await GetPermissioninfobyKey({key:r[x]})
//                         //console.log(res)           
//             obj.DepName=res.result.Permission_name,
//             obj.Depkey=res.result.Permission_key,
//             obj.OrderID=res.result.OrderID,
//             DepArr.push(obj)
//         }
//         return DepArr
    
//    },       
    v(){     
        return Validate;
    },   
     filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      return value;
    },
    add (s) {       
// PermissionList DepFullName Abbreviation UploadDir Priority 
      this.edit({
            Abbreviation:s.Abbreviation,
            DepartmentId:s.DepartmentId,
            DepartmentName:s.DepartmentName,
            PermissionList:[s.Permission_Key,s.Permission_name],
            ID:s.ID,
            OrderID:s.OrderID,
            ParentDepartmentId:s.ParentDepartmentId,
            Permission_Key:s.Permission_Key,
            Permission_name:s.Permission_name,
            Priority:s.Priority,
            RoleID:s.RoleID,
            UploadDir:s.UploadDir,
            description:s.description,
            optioncode:s.optioncode,
      });
    },
    edit (record) {
      // this.mdl = Object.assign({}, record)      
      this.UpdateVisible = true
     
      this.$nextTick(() => {
        setTimeout(() => {
        this.form.setFieldsValue({
        DepartmentId:record.DepartmentId,
        Permission_Key:record.Permission_Key,
        DepFullName:record.DepartmentName,
        Abbreviation:record.Abbreviation,
        Priority:record.Priority,
        UploadDir:record.UploadDir,
         });
        }, 100);
          
      })
    },
    close () {
         this.$emit('close')
         this.UpdateVisible = false    
    },    
     handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          console.log('form values', values)
          _this.confirmLoading = true
            new Promise((resolve) => {          
          setTimeout(async () => {
              const res=await UpdatePartment(values)             
                 resolve(res);    
          }, 1000)          
          }).then(function (r) {
            
           if(r)
           {
              _this.$message.success('修改部门信息成功'); 
              _this.UpdateVisible = false   
              _this.$emit('ok')        
           }
           else
           {
               _this.$message.error('修改部门信息失败');  
           }
          }).catch(function (reject) {
              console.log(reject)
          }).finally(() => {
            _this.confirmLoading = false
            // _this.close();
          
          })   
        }
      })
    }
  }
}
</script>
