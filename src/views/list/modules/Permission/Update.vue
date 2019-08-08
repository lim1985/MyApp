<template>
  <a-modal
    title="修改大类"
    style="top:80px;"
    :width="800"
    v-model="UpdatePre_model"
    @ok="handleUPDATE"
  >    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item  
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label='ID'              
          hasFeedback          
        >
          <a-input    
            disabled         
            placeholder='大类别唯一标识' 
            v-decorator="['ID',{rules: [{ required: true }]}]"
          />      
        </a-form-item>  
        <a-form-item  
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label='状态'              
          hasFeedback          
        >
          <a-select style="width: 120px" v-decorator="['status',{rules: [{ required: false }]}]">
            <a-select-option value="1">显示</a-select-option>
            <a-select-option value="0">隐藏</a-select-option>            
          </a-select>       
          <!-- <a-input                  
            placeholder='状态' 
            v-decorator="['status',{rules: [{ required: true }]}]"
          />       -->
        </a-form-item>  
        <a-form-item         
          :colon="false"
          label="类别标识"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
        >
          <a-input    
            disabled         
            placeholder='大类别唯一标识' 
            v-decorator="['Permissionskey',{rules: [{ required: true },{validator:v().checkZHZM}]}]" 
          />
          <!-- checkA_Z -->
        </a-form-item>
        
        <a-form-item 
          :colon="false"
          label="区域"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
        >
          <a-select
            style="width: 240px"
            @change="handleChange"
            v-decorator="['Areakey',{initialValue:['邵阳市大祥区人民政府','sysdxqrmzf'],rules: [{ required: true }]}]"
          >
            <a-select-option value="sysdxqrmzf">邵阳市大祥区人民政府</a-select-option>
            <a-select-option value="sysbtqrmzf">邵阳市北塔区人民政府</a-select-option>    
          </a-select>      
        </a-form-item>
        <a-form-item 
          :colon="false"
          label="权重"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
        >
          <a-input             
            placeholder='请输入权重' 
            v-decorator="['OrderID',{rules: [{ required: true },{validator:v().checkNum1to100}]}]"
          />       
        </a-form-item>
        <a-form-item 
          :colon="false"
          label="类别名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
        >
          <a-input   
            @change="InputpOnChange"              
            placeholder='请输入类别名' 
            v-decorator="['PermissionName',{rules: [{ required: true },{validator:v().checkZHZM}]}]"
          />       
        </a-form-item>  
        <a-form-item 
          :colon="false"
          label="类别描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
        >
          <a-textarea
            rows="4"           
            placeholder='请输入类别描述' 
            v-decorator="['description',{rules: [{ required: false },{validator:v().checkcharacter}]}]"
          />       
        </a-form-item>
      </a-form>
    </a-spin>     
  </a-modal> 
</template>

<script>
  import STable from '@/components/table/'
  import { UpdataPermission } from '@/api/manage'
  import PermissionInformationUpdateModal from '@/views/list/modules/Permission/UpdateInformation'
  import Validate from '@/tools/Validate/index'
  import { makePy } from '@/assets/js/pinying.js' 
//GetPermissionByroleID

  export default {
    name: "TableList",
    components: {
      STable,
      PermissionInformationUpdateModal
    },
    data () {
      return {
        confirmLoading:false,
        description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
        selectedRowKeys: [],
        selectedRows: [],          
        PermissionInfoDep:[],
        PremissionList:[],
        PostData:[] ,
        UpdatePre_model:false,
    
      }
    },
   beforeCreate () {    
    this.form = this.$form.createForm(this)   
  },
    created(){
     
    },
    mounted(){ 
     
      //  GetPermissionList(this.params).then(res=>{
      //    this.PermissionList=res.result.data
      // })
    //  console.log(typeof(this.myloadData))
    //  console.log(this.myloadData)
    },
    methods: {
    handleUPDATE (e) {
      e.preventDefault()              
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
        UpdataPermission(values).then(res=>{
          console.log(res)
          if(res.code===1)
            {
                this.$message.success(res.msg)
                this.UpdatePre_model=false
                this.form.resetFields()  
                this.$emit('ok')
            }
            else
            {              
                this.$message.error(res.msg);  
                //this.Updateform.resetFields()
            }
        })  
          // console.log('Received values of form: ', values)
        }
      })  
    },  
            InputpOnChange(e){
             let {value} = e.target
             let s=makePy(value)
            this.$nextTick(() => {
            setTimeout(() => {
            this.form.setFieldsValue({
            Permissionskey:s[0],                
        });
        }, 100);          
      }) 
    },
     v(){     
        return Validate;
    },
     
         handleChange(val){
        console.log(val);
      },

      get(e){
              
         let a={...e}      
         this.edit(a)          
      },
     edit (record) {
      // this.mdl = Object.assign({}, record)      

     
      this.$nextTick(() => {
        setTimeout(() => {
        this.form.setFieldsValue({
        Permissionskey:record.Permission_key,
        ID:record.ID,
        status:record.status,
        Areakey:record.areakey,
        OrderID:record.OrderID,
        PermissionName:record.Permission_name,
        description:record.UploadDir,
         });
        }, 100);          
      })
      this.UpdatePre_model = true
    },
      handleSaveOk(){},
      handleSaveClose(){},
      showsuccess(res) {
        this.$message.success(res);
      },
       showerror(res) {
        this.$message.error(res);
      }    
    },
    watch: {
      /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
    }
  }
</script>