<template>
  <a-modal
    title="添加部门大类别"
    style="top:80px;"
    :width="800"      
    v-model="addPre_model"      
    @ok="Adds"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item 
        
          :colon="false"
          label="类别标识"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
        >
          <a-input    
            disabled         
            placeholder='大类别唯一标识' 
            v-decorator="['Permissionskey',{rules: [{ required: true },{validator:v().checkA_Z}]}]"
          /> 
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
            v-decorator="['Permissionvalue',{rules: [{ required: true },{validator:v().checkcharacter}]}]"
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
  import { AddPermission } from '@/api/manage'
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
        addPre_model:false,
    
      }
    },
   beforeCreate () {    
    this.form = this.$form.createForm(this)   
  },
    created(){
       console.log("开始添加页面")
    },
    mounted(){ 
     
      //  GetPermissionList(this.params).then(res=>{
      //    this.PermissionList=res.result.data
      // })
    //  console.log(typeof(this.myloadData))
    //  console.log(this.myloadData)
    },
    methods: {
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
        Adds(){
            let _this=this
                _this.form.validateFields((err,values)=>{
                    if(!err)
                    {
                        let key=values.Areakey[1]
                        
                        values.areakey=key
                        AddPermission(values).then(res=>{
                            console.log(res)
                             if(res.code===1)
                        {
                            this.$message.success(res.message)
                            this.addPre_model=false
                            this.form.resetFields()
                            // this.$refs.mytable.refresh()
                        }
                           else
                        {              
                            this.$message.error(res.message);  
                            this.form.resetFields()                           
                        }
                        })
                          console.log(values)
                    }else
                    {
                         this.$message.error('输入错误，请重新输入');  
                         console.log(err)
                    }
              
            })
                
        },
         handleChange(val){
        console.log(val);
      },

      get(){
        let _this=this
        this.$nextTick(() => {
        _this.form.resetFields();
        console.log(_this.form)
        // this.form.setFieldsValue({ ...record })
         this.addPre_model=true;
      })
         
        
          
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