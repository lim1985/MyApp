<template>
  <a-modal
    title="添加部门"
    :width="1000"
    v-model="AddVisible"
    @ok="MyhandleOk"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          v-bind="formItemLayout"
          label='状态'
          hasFeedback    
        >
          <!-- <a-input placeholder='填正确填写部门简称' v-model="Mymdl.Abbreviation" id='Abbreviation' /> -->
          <a-select  
            @select="selectStatus"     
            showSearch
            placeholder="选择部门类别" 
            v-decorator="['status',{rules: [{ required: true }]}]"
          >
            <a-select-option value='1'>显示</a-select-option>
            <a-select-option value='0'>隐藏</a-select-option> 
          </a-select>
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
            v-decorator="['Permissionkey',{rules: [{ required: true, message: '部门不能为空！' }]}]"
          >
            <!-- <a-select-option value="-1">请选择部门</a-select-option> -->
            <template v-for="(item,index) in DepName">
              <a-select-option :key="index" :PID="item.PID" :value="item.value">{{ item.label }}</a-select-option>
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
          label='部门标识'
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
            v-decorator="['Priority',{rules: [{ required: true, message: '' },{validator:v().checkNum1to100}]}]"
          /> 
          <!-- <a-input placeholder='填写权重最大为：100' v-model="Mymdl.Priority" @keyup="loadNumber($event)" id='Priority' /> -->
        </a-form-item>
       

      </a-form>
    </a-spin>
  </a-modal>  
</template>
<script>
  import Vue from 'vue'  
  import { User_ID } from "@/store/mutation-types" 
  import { getUserrolesbyAdminID,GetPermissionByroleID,GetPermissioninfobyKey,AddParment,Select_PermissionsByRolesID} from '@/api/manage'
  import { Promise } from 'q';
  import Validate from '@/tools/Validate/index'
  import { makePy } from '@/assets/js/pinying.js'  

  //GetALLByDepID,asyncValidateTel,QueryAllDeplist,UpdatePartment,DelDePartment

export default {
  name: 'AdduserModal', 
  data () {
    return {  
      DepName:[],
      mdl: {},
      Mymdl:{},    
      AddVisible:false,
      tel:'',
      Isvalidate:false,
      status:'',
      Tips:'',
      options:[],
      selectedRowKeys: [],
      selectedRows: [],
      PhoneVisible:false, 
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
      visible: false,
      confirmLoading: false,
      PID:''
     
     
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
   selectStatus(e){
        this.$nextTick(() => {
                    setTimeout(() => {
                    this.form.setFieldsValue({
                    status:e,                
                });
                }, 100);          
      })    
   },
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
          DepOnChange(e,obj)//根据输入的文字变成拼音首字母
        {
            this.Tips=e
            console.log(obj.data.attrs.PID)
            console.log(e);
            this.PID=obj.data.attrs.PID
            this.$nextTick(() => {
                    setTimeout(() => {
                    this.form.setFieldsValue({
                    UploadDir:this.Tips,
                
                });
                }, 100);          
      })               
    },
        async GetPermissionList(){
              let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
              let _temp=[]            
              let DepArr=[]        
              console.log(userid);   
            //   const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
            let P=new Promise(resolve=>{
              setTimeout(() => {
              getUserrolesbyAdminID({AdminID:userid.AdminID})
             .then(res=>res.roles)
             .then(res=>res)
             .then(async ress=>{//获得管理员所拥有的 RoleID 返回数组 如：['83','69']
                
               
                  for(let x in ress)
                  {  
                      let _ar=await  Select_PermissionsByRolesID({ID:ress[x]})
                      console.log(_ar);
                      _temp.push(_ar.res)
                  }
                 console.log('1111111111111111')
                  console.log(_temp)
                  _temp.forEach(vx => {
                      for(let x in vx)
                      {
                         DepArr.push(vx[x])
                      }                     
                  });
                  let _permissionlist=this.deteleObject(DepArr,'IsView',true);
                console.log("7777777777")
                console.log(_permissionlist)
                //   DepArr.forEach(A=>{
                      
                //   })
                  resolve(_permissionlist)    
              })}, 100);
            })
            P.then(data=>{
                this.DepName=data
                console.log(data)
            })
        },
     async GetDepName()
    {
     
      let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
      const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
      let _temp=''
      let s =''
      let DepArr=[]
        for (let x in roleslist.roles)
        {
              let res=await  GetPermissionByroleID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型
              _temp=res.result+'|'               //合并循环出来的字符串
              s+=_temp                //同上
        }
       let _arr=s.split('|')//按 “|”分隔符生成数组    
       var r = _arr.filter(function(element,index,self){//数组去重         
       return self.indexOf(element) === index && element //去无效属性
    })      
      
        for (let x in r)
        {
            const obj=new Object();
            const res=await GetPermissioninfobyKey({key:r[x]})
                        //console.log(res)           
            obj.DepName=res.result.Permission_name,
            obj.Depkey=res.result.Permission_key,
            obj.OrderID=res.result.OrderID,
            DepArr.push(obj)
        }
        return DepArr
    
   },
        async MyhandleOk(e)
        {
         e.preventDefault()
        let _this=this
          _this.form.validateFields(async(err, values) => {
          if (!err) {
           
            values.PID=_this.PID;
             console.log(values)
          const res=await AddParment(values)
          if(res.code==-1)
          {
             this.$message.error(res.message);   
          }
          else
          {
            //  this.$refs.mytable.refresh()
             this.$message.success('添加单位成功。');  
             this.$emit('ok');           
             this.AddVisible = false        
          }
        
          // console.log(this.Mymdl)
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
          }
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
    add () {
      this.edit();
    },
    edit () {
      // this.mdl = Object.assign({}, record)      
      this.$nextTick(() => {
        this.form.resetFields();
        // this.form.setFieldsValue({ ...record })
        this.AddVisible = true       
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
         
          
         })   
        },

  }
}
</script>
