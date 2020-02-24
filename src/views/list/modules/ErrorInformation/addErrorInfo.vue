<template>
  <div>
    
    <a-modal
      title="提交错误信息"
      :width="680"
      v-model="ErrorInfoVisible"
      @ok="handleOk"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item  
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
            label='管理员ID'              
            hasFeedback 
            v-show="false"         
          >
            <a-input 
              v-decorator="['AdminID',{rules: [{ required: true }]}]"
            />      
          </a-form-item>  
          <a-form-item  
            :labelCol="{lg: {span: 4}, sm: {span: 4}}"
            :wrapperCol="{lg: {span: 8}, sm: {span: 17} }"
            label='联系人ID'              
            hasFeedback          
          >
            <a-input    
              disabled   
              v-decorator="['UserID',{rules: [{ required: true }]}]"
            />      
          </a-form-item>  
          <a-row>
            <a-checkbox-group v-model="checkedList" @change="onChange">
              <a-col :span="8" :offset="5"><a-checkbox value="联系人手机号码错误">联系人手机号码错误</a-checkbox></a-col>
              <a-col :span="8" :offset="1"><a-checkbox value="联系人所属单位错误">联系人所属单位错误</a-checkbox></a-col>
              <a-col :span="8" :offset="5"><a-checkbox value="联系人姓名错误">联系人姓名错误</a-checkbox></a-col>
              <a-col :span="8" :offset="1"><a-checkbox value="联系人职务错误">联系人职务错误</a-checkbox></a-col>        
            </a-checkbox-group>
          </a-row>
          <a-form-item  
            :labelCol="{lg: {span: 4}, sm: {span:4}}"
            :wrapperCol="{lg: {span: 18}, sm: {span: 17} }"
            label='错误内容'              
            hasFeedback          
          >

            <a-textarea 
              @change="InputChange" 
              placeholder="请输入想提交的错误信息" 
              :rows="5"
              v-decorator="['Errorinformation',{rules: [{ required: true }]}]"
            />
             
          </a-form-item> 
        <!-- <a-row>
            <a-checkbox-group @change="onChange">
          
            <a-col :span="24"><a-checkbox value="111">A</a-checkbox></a-col>
            <a-col :span="24"><a-checkbox value="222">B</a-checkbox></a-col>
            <a-col :span="24"><a-checkbox value="333">C</a-checkbox></a-col>
            <a-col :span="24"><a-checkbox value="444">D</a-checkbox></a-col>
            <a-col :span="24"><a-checkbox value="5555E">E</a-checkbox></a-col>
         
        </a-checkbox-group>
        </a-row> -->
        
        
          <!-- <a-row>
            <a-col :span="24">
              <a-form-item
                v-bind="formItemLayout"             
                label='办公座机'
                hasFeedback
              >
                <a-input placeholder='填写联系人的办公座机' v-decorator="['tel',{rules: [{ required: false },{ validator:v().checkTel }]}]"/>
              </a-form-item>           
            </a-col>                 
          </a-row> -->
        </a-form>
      </a-spin>
    </a-modal> 

  </div>  
</template>
<script>
  import Vue from 'vue'  

  import { User_ID } from "@/store/mutation-types" 
  import { submitErrorInfo } from '@/api/manage'
  import _ from 'lodash'
   //状态说明 [LIM_UsersPhone] 9 前台显示 7 前台不现实   
   //[LIM_ResferenceAndDep] 6 引用状态 -1 默认

  //GetALLByDepID,asyncValidateTel

export default {
  name: 'ErrorInformationModal', 
  data () {
    return {   
      checkedList:[],
      ErrorInfoList:'',
      selectedRowKeys: [],
      selectedRows: [],
      ErrorInfoVisible:false,        
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
      mdl: {},
      changeValue:'',
      ErrorContent:'',
      adminID:'',
    
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
      
    },
   watch: {
    '$route'()
    {        
     
      
    }
      },
  async mounted(){   
       this.adminID={AdminID:Vue.ls.get(User_ID)} 

    },
  methods:  {

       InputChange:_.debounce(function(val){
       const { value} = val.target       
       if(value)
       {
          this.changeValue=value;
          this.form.setFieldsValue({
          Errorinformation:this.changeValue
         });
       }
      
      },500),
   onChange(checkedValues){

        this.ErrorInfoList=checkedValues+',';
        this.ErrorContent=this.ErrorInfoList
        console.log(checkedValues);
        console.log(this.ErrorInfoList);
        this.checkedList=checkedValues;
        console.log( this.checkedList);
     setTimeout(() => {
         this.form.setFieldsValue({
        Errorinformation:  this.ErrorInfoList
         });
     }, 500);
    //  console.log(checkedValues)
   },
    add (s) {
      setTimeout(() => {   
   

        this.form.setFieldsValue({
        UserID:s,   
        AdminID:this.adminID.AdminID

         });
      }, 500);   
       this.ErrorInfoVisible=true;    
    },
   
    close () {
         this.$emit('close')
         this.ErrorInfoVisible = false    
    },  
    handleCancel () {
     
    },
   
     handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields(async(err, values) => {
        // 验证表单没错误
        if (!err) {
        console.log(values)
          _this.confirmLoading = true
          let result= await submitErrorInfo(values);
          console.log(result.result.code);
          if(result.result.code==1)
          {
            _this.$message.success('提交成功');
            setTimeout(() => {
            _this.confirmLoading=false;
            _this.ErrorInfoVisible=false;
            _this.form.resetFields();
            _this.checkedList=[]
            }, 1000);         
          }
          // 模拟后端请求 2000 毫秒延迟       
        }
      })
    },
    

  }
}
</script>
