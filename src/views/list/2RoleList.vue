<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button @click="addroles()" style="margin-left: 8px" type="primary">添加角色</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
  
    <a-modal
      title="添加角色"
      style="top:80px;"
      :width="800"
      v-model="Rolesvisible"
      @ok="handleSubmit">
      <a-form ref="myform" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          label="角色标识"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          fieldDecoratorId="rolekey"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入角色标识' }]}">
          <a-input name="rolekey" placeholder="请输入角色标识" />
        </a-form-item> 
        <a-form-item
          label="角色名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          fieldDecoratorId="rolevalue"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入角色名' }]}">
          <a-input name="rolevalue" placeholder="请输入角色名" />
        </a-form-item>   
        <a-form-item
          label="角色描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          fieldDecoratorId="roledescription"
          :fieldDecoratorOptions="{rules: [{ required: false, message: '请输入角色描述' }]}">
          <a-textarea rows="4" placeholder="请输入角色描述"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <s-table
      size="default"
      :columns="columns"
      :data="myloadData"
      ref="mytable"
    >
      <!-- <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24"
          :style="{ marginBottom: '12px' }">
          <a-col :span="12" v-for="(role, index) in record.permissions" :key="index" :style="{ marginBottom: '12px' }">
            <a-col :span="4">
              <span>{{ role.permissionName }}：</span>
            </a-col>
            <a-col :span="20" v-if="role.actionEntitySet.length > 0">
              <a-tag color="cyan" v-for="(action, k) in role.actionEntitySet" :key="k">{{ action.describe }}</a-tag>
            </a-col>
            <a-col :span="20" v-else>-</a-col>
          </a-col>
        </a-row>
      </div> -->
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑权限</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="myalert(record.roleid)">详情</a>
            </a-menu-item>
            <!-- <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item> -->
            <a-menu-item>
              <a @click="delroleaction(record.roleid)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      title="权限设置"
      style="top: 220px;"
      :width="800"
      v-model="visible"
      @ok="handleOk">

      <a-form :autoFormCreate="(form)=>{this.Permissionform = form}">  
        <a-form-item  
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label='ID'              
          hasFeedback  
          fieldDecoratorId="ID"
        >
          <a-input disabled />
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
              <!-- <a-checkbox  @change="v=>changeBox(v,1,item,index)"  /> -->
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
        <!-- 正常模板结束 -->
        <!-- 正常能使用版本 <a-row :gutter="24" :key="index" v-for="(item,index) in Mymdl.permissions">
        <a-checkbox-group @change="F_onChanges(item.value)" v-model="PremissionList"> 
          
            <a-col :span="24">                        
              <a-checkbox :value="item.value" >{{item.label}}(大类)</a-checkbox> 
                 
              <a-row :gutter="24" :key="indexs" v-for="(items,indexs) in item.actionOptions">
                <a-col :span="24">  
                <a-checkbox-group @change="C_onchanges(items)">           
                   <a-checkbox  :value="items.value" >{{items.label}}</a-checkbox> 
                </a-checkbox-group>
                </a-col>
              </a-row>             
              <a-divider />
            </a-col>     
              </a-checkbox-group>         
            </a-row> -->
      
          <!-- <a-checkbox-group @change="F_onChanges" >
            <a-row :gutter="16">
              <a-col :span="20">
                <div :key="index" v-for="(item,index) in Mymdl.permissions">              
                  <a-checkbox :value="item.value" :v-model="item.value">{{item.label}}(大类)</a-checkbox> 
                    <a-row :gutter="24">
                  <a-col :span="24">
                   <a-checkbox-group @change="C_onchanges"  :options="item.actionOptions"/>
                 </a-col>
               </a-row>
              </div>
              </a-col>            
            </a-row>
          </a-checkbox-group>  -->
        <!--正常可用       
        <a-checkbox-group>
        <div :key="index" v-for="(item,index) in Mymdl.permissions">
            <a-checkbox  :value="item.PermissionKey" :v-model="item.PermissionKey">{{item.DepName}}</a-checkbox>            
        </div>
        </a-checkbox-group> -->
        
          <!-- <a-checkbox v-for="(item,index) in PermissionInfoDep"
              :key="index"       
              :value="item.Permission_key"     
              :v-model="item.Permission_key"    
            >
            <template v-if="item.children!=''">
              <a-checkbox v-for="(items,indexs) in item.children"
              :key="indexs"       
              :value="items.DepartmentId"     
              :v-model="items.DepartmentId"    
            >
            {{items.DepartmentName}}
              </a-checkbox>
            </template>
              {{item.Permission_name}}
            </a-checkbox> -->
     
          <!-- <template v-for="(item,index) in PermissionInfoDep">
            <a-checkbox        
            
              :key="index"       
              :value="item.Permission_key"     
              :v-model="item.Permission_key"    
            >
            {{item.Permission_name}}
            </a-checkbox>
          </template> -->
                  
      
        </a-form-item> 
      </a-form>   
    </a-modal>
  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import {Select_PermissionsByRolesID,Updata_Permissioninfomation, Addroles , Delroles ,GetALLDep} from '@/api/manage'//getRolesList
// import { resolve } from 'url';
// import { rejects } from 'assert';
//,GetPermissionList

  export default {
    name: "TableList",
    components: {
      STable
    },
    data () {
      return {
       
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
        form: null,
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
      
      // 加载数据方法 必须为 Promise 对象
        myloadData: parameter => {
          // console.log('准备调用')
          // console.log(parameter)
          return this.$http.get('http://172.20.8.28:3001/api/roleslist', {
            params: Object.assign(parameter, this.queryParam),
            headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			}
          }).then(res => {
          //
            if(res.code==-1)
            {
                this.$router.push('/login')
            }
            console.log(res.result)
              // let times=res.result.data[0].addtime
          //  console.log(this.filter('dayjs',times))
            // console.log(res.result.data[0].addtime)//Vue.filter('dayjs',
            return  res.result
          })
        },    
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
       
        console.log(this.Mymdl)
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
      
      delroleaction(id)
      {         
        let _this=this
        this.$confirm({
          title: '警告',
          content: '记录删除将无法找回，真的要删除吗?',
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {           
          console.log('OKclick');
            // 在这里调用删除接口
          console.log(id)
     
           Delroles({id:id}).then(res=>{
            if(res.code==1)
            {
            _this.showsuccess(res.message)
            _this.$refs.mytable.refresh()
            }
             else
             {            
              _this.showerror(res.message)
            }
           
           }).catch(function(err){
             console.log(err)
           })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
     
      },
      showsuccess(res) {
        this.$message.success(res);
      },
       showerror(res) {
        this.$message.error(res);
      },
      myalert(e)
      {
        console.log(e)
        alert('暂时不能使用该功能')
      },
      handleSubmit (e) {
      e.preventDefault()     
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
        //  console.log(values)
          Addroles(values).then(res=>{
            if(res.code===1)
            {
                this.$message.success(res.message)
                this.Rolesvisible=false
                this.form.resetFields()
                this.$refs.mytable.refresh()
            }
            else
            {              
                this.$message.error(res.message);  
                this.form.resetFields()   
               
            }
                //console.log(res)
          })
        }
      })
    },
      addroles()
      {
      this.Rolesvisible=true;
      },
      //点击编辑时拉取所有的权限列表然后灌到一个数组里
   async handleEdit (record) {
        let _this=this   
        let _PermissionInformation=await Select_PermissionsByRolesID({ID:record.roleid})
        // let _PerArr=await GetPermissionByroleID({ID:record.roleid})
      console.log(_PermissionInformation.res)
         _this.Mymdl = Object.assign({}, record)
      //  console.log(_PermissionInformation)
        if(_PermissionInformation.res.length>0)
        {
           _this.Mymdl.permissions=_PermissionInformation.res             
        }
        else
        {
  //一下正常
        let permissions= await GetALLDep().then(res=>{        
            return res.result       
          })               
            let _arr=[]  
           
            permissions.forEach(v => {
              let obj=new Object();             
              let _temp=[]
           
              _temp=v.children.map(s=>{

        //        'DepartmentId',
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
            
        //正常结束 
        }
        console.log('----------------------')
   console.log(_this.Mymdl)  
       console.log('----------------------')
          _this.visible = true
       
             
       setTimeout(() => {         
         _this.Permissionform.setFieldsValue({
           ID:record.roleid,
          PremissionValue:_this.Mymdl.permissions                         
         })            
       }, 100);
         
     
      },
      handleOk () {
        this.Permissionform.validateFields((err, values) => {  
        if (!err) {
              // console.log(this.Mymdl)
               console.log('---------------------')
           console.log(values)
           console.log('++++++++++++++++++++')

             Updata_Permissioninfomation(values).then(res=>{
               console.log(res)
             })
              // AddrolesPermission(values).then(res=>{
              // if(res.code==1)
              // {
              //    this.showsuccess(res.message) 
              // }             
              // else
              // {               
              //    this.showerror(res.message) 
              // }
              // })
          
           this.visible = false
        }
      })

      },
      onChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
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