<template>
  <a-modal
    title="权限设置"
    style="top: 220px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form"> 

        <!-- <a-form-item
          v-bind="formItemLayout"
          label='部门全称'
          hasFeedback                   
        >       
          <a-input 
            @change="InputpOnChange"
            placeholder='输入部门全称' 
            v-decorator="['DepFullName',{rules: [{ required: true, message: '部门全称不能为空！' },{validator:v().checkjob}]}]"
          />  -->
        <!-- <a-input placeholder='部门名称（全称）' v-model="Mymdl.DEPName" @change="DepOnChange" id='DEPName' /> -->
        <!-- </a-form-item> -->
        <a-form-item  
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label='ID'              
          hasFeedback           
        >
          <a-input
            v-decorator="['ID']"
            disabled />
        </a-form-item>   
        <a-form-item
          :labelCol="{lg: {span: 3}, sm: {span: 3}}"
          :wrapperCol="{lg: {span: 20}, sm: {span: 20} }"
          label='选择权限'        
          fieldDecoratorId="PremissionValue"> 
          <a-row :gutter="24">
            <a-col :span="16"> 
              单位名称
            </a-col>
            <a-col :span="4"> 
              查看
            </a-col>
            <a-col :span="4"> 
              修改
            </a-col>
          </a-row> 
          <!-- 正常模板开始 -->
          <a-row :gutter="24" :key="index" v-for="(item,index) in Mymdl.permissions">
            <a-col :span="16"> 
              <h2>{{ item.label }}</h2>              
            </a-col>              
            <a-col :span="4"> 
              <a-checkbox v-model="Mymdl.permissions[index].IsView" @change="v=>changeBox(v,1,item,index)" /> 
            <!-- <a-checkbox  @change="v=>changeBox(v,1,item,index)"  />  -->
            </a-col>
            <a-col :span="4"> 
              <a-checkbox :disabled="!item.IsView" v-model="Mymdl.permissions[index].IsEdit" @change="v=>changeBox(v,2,item,index)" :value="item.IsView" ></a-checkbox>
            </a-col>
            <a-row :gutter="24" :key="indexs" v-for="(childItem,indexs) in item.actionOptions">
              <a-col :span="16"> 
                <h3>{{ childItem.Abbreviation }}</h3>
              </a-col>
              <a-col :span="4"> 
                <a-checkbox @change="v=>childbox(v,1,childItem,indexs)" v-model="Mymdl.permissions[index].actionOptions[indexs].IsView" :value="childItem.IsView" ></a-checkbox>     
              </a-col>
              <a-col :span="4"> 
                <a-checkbox @change="v=>childbox(v,2,childItem,indexs)" :disabled="!childItem.IsView" v-model="Mymdl.permissions[index].actionOptions[indexs].IsEdit" :value="childItem.IsEdit" ></a-checkbox>     
              </a-col>
            </a-row>
            <a-divider />
          </a-row> 
        </a-form-item> 
      </a-form> 
    </a-spin>  
  </a-modal>
</template>
  <script> 
  import { mapState} from 'vuex'
  // import Validate from '@/tools/Validate/index'
  //GetALLByDepID,asyncValidateTel
   import {Select_PermissionsByRolesID,Updata_Permissioninfomation,GetALLDep} from '@/api/manage'//getRolesList  Addroles , Delroles ,
export default {
  name: 'PermissionModal', 
  data () {
  return {    
      confirmLoading:false,
      checkboxshow:false,
        RoleID:'',
        PermissionList:[],
        datalist:[],
        roleslist:{          
        },
        Rolesvisible:false,
        description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        
        mdl: {},
          Mymdl: {},
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
         
          {
            title: '唯一识别码',
            dataIndex: 'rolekey'
          },
          {
            title: '角色名称',
            dataIndex: 'rolevalue',
          },
          {
            title: '状态',
            dataIndex: 'static'
          },
          {
            title: '创建时间',
            dataIndex: 'addtime',
            sorter: true
          }
          , {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          }
        ],
      
   
        selectedRowKeys: [],
        selectedRows: [],       
        params:{
            pageNo:1,
            pageSize:30
          },
        PermissionInfoDep:[],
        PremissionList:[],
        PostData:[] 
      
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
       
      }),   
            
    },
   watch:{   
     
   },
  async mounted(){   
    // console.log(`event`)
    // console.log(this.Events)
    //  this.showPhone();

    },
  methods:{
        ok(){},
        handleOk () {
        this.form.validateFields((err, values) => {  
        if (!err) {
              // console.log(this.Mymdl)
           console.log('---------------------')
           console.log(values)
           let data={};
           data.ID=values.ID;
           data.PremissionValue=this.Mymdl.permissions

           console.log(data);
           console.log('++++++++++++++++++++')
           
             Updata_Permissioninfomation(data).then(res=>{
               console.log(res)
             })
             
          
          this.visible = false
        }
      })

      },
           //点击编辑时拉取所有的权限列表然后灌到一个数组里
   async handleEdit (record) {
     
        let _this=this   
        // let permissions= await GetALLDep().then(res=>{        
        //    return res.result       
        // })   
        let _PermissionInformation=await Select_PermissionsByRolesID({ID:record.roleid})      
            console.log('获取的权限数据')
            console.log(_PermissionInformation);
        this.$nextTick(() => {
        setTimeout(() => {
        _this.form.setFieldsValue({
        ID:record.roleid,
         });
        }, 100);          
      })
         if(_PermissionInformation.res.length>0)
        {
           _this.Mymdl.permissions=_PermissionInformation.res             
        }
        else
        {
  // 一下正常
    
        let _this=this   
        let permissions= await GetALLDep().then(res=>{        
            return res.result       
          })               
            let _arr=[]  
            // console.log(_PermissionInformation)
            // console.log(permissions)
            permissions.forEach(v => {
              let obj=new Object();             
              let _temp=[]
           
              _temp=v.children.map(s=>{

        // 'DepartmentId',
        // 'Permission_Key'
                return {Abbreviation:s.Abbreviation,DepartmentId:s.DepartmentId,Permission_Key:s.Permission_Key,IsEdit:false,IsView:false}
              })
              obj.label=v.Permission_name
              obj.value=v.Permission_key
              obj.actionOptions=_temp            
              obj.IsView=false
              obj.IsEdit=false
              _arr.push(obj)
              _this.Mymdl.permissions=_arr
            });         
            
        // 正常结束 
        }
          _this.visible = true   
       //  let _PermissionInformation=await Select_PermissionsByRolesID({ID:record.roleid})
      //  console.log(permissions)
//console.log(_PermissionInformation);
           
     
      //   let _PermissionInformation=await Select_PermissionsByRolesID({ID:record.roleid})
      //   // let _PerArr=await GetPermissionByroleID({ID:record.roleid})
      // console.log(_PermissionInformation.res)
      //    _this.Mymdl = Object.assign({}, record)
      // //  console.log(_PermissionInformation)
      //   if(_PermissionInformation.res.length>0)
      //   {
      //      _this.Mymdl.permissions=_PermissionInformation.res             
      //   }
      //   else
      //   {
  //一下正常
    
        // let _this=this   
   
         // 
        // let permissions= await GetALLDep().then(res=>{        
        //     return res.result       
        //   })               
        //     let _arr=[]  
        //     console.log(_PermissionInformation)
        //     console.log(permissions)
        //     permissions.forEach(v => {
        //       let obj=new Object();             
        //       let _temp=[]
           
        //       _temp=v.children.map(s=>{

        // //        'DepartmentId',
        // // 'Permission_Key'
        //         return {Abbreviation:s.Abbreviation,DepartmentId:s.DepartmentId,Permission_Key:s.Permission_Key,IsEdit:false,IsView:false}
        //       })
        //       obj.label=v.Permission_name
        //       obj.value=v.Permission_key
        //       obj.actionOptions=_temp            
        //       obj.IsView=false
        //       obj.IsEdit=false
        //       _arr.push(obj)
        //       _this.Mymdl.permissions=_arr
        //     });         
            
        //正常结束 
        // }
        // console.log('----------------------')
        // console.log(_this.Mymdl)  
        // console.log('----------------------')
       
     
      },
      childbox(ev,v,item){
      
        if(v==1)
        {          
          item['IsView']=ev.target.checked   
        
          item['IsParent']=false
        }
        else
        {
          item['IsEdit']=ev.target.checked
        
          item['IsParent']=false
        }
       
        // console.log(this.Mymdl)
        this.$forceUpdate();
      
      },
       changeBox(ev,v,item,i){
           
            // this.$set(item,'view',ev.target.checked)
            if(v==1)
            {
                this.$set(this.Mymdl.permissions[i],'IsView',ev.target.checked)
            }
            else
            {
               this.$set(this.Mymdl.permissions[i],'IsEdit',ev.target.checked)
            }
           
           console.log(this.Mymdl)
           
             this.$forceUpdate(); 
      },
    get(val){
       console.log(val);
       this.handleEdit(val)
       
    },
  }
}
</script>
