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
              <a-button @click="addpermission()" style="margin-left: 8px" type="primary">添加类别</a-button>           
              <a-button style="margin-left: 8px" type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-modal
      title="添加部门类别"
      style="top:80px;"
      :width="800"
      v-model="addPre_model"
      @ok="handleSubmit">
      <a-form ref="myform" :autoFormCreate="(form)=>{this.form = form}">      
        <a-form-item
          label="标识"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"          
          fieldDecoratorId="Permissionskey"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入部门类别标识' }]}">
          <a-input name="Permissionskey" placeholder="请输入部门类别标识" />
        </a-form-item> 
        <a-form-item
          label="权重"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"          
          fieldDecoratorId="OrderID"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入部门类别权限权重' }]}">
          <a-input name="OrderID" placeholder="请输入部门类别权重" />
        </a-form-item> 
        <a-form-item
          label="部门类别名"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          fieldDecoratorId="Permissionvalue"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入部门类别名' }]}">
          <a-input name="Permissionvalue" placeholder="请输入部门类别名" />
        </a-form-item>   
        <a-form-item
          label="部门类别描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          fieldDecoratorId="description"
          :fieldDecoratorOptions="{rules: [{ required: false, message: '部门类别描述' }]}">
          <a-textarea rows="4" name="description" placeholder="部门类别描述"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="修改"
      style="top:80px;"
      :width="800"
      v-model="UpdatePre_model"
      @ok="handleUPDATE">
      <a-form ref="Updateform" :autoFormCreate="(form)=>{this.Updateform = form}">
        <!-- <a-form-item
          label="权限标识"
          hasFeedback
          validateStatus='success'
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          fieldDecoratorId="Permissionskey"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入权限标识' }]}">
          <a-input name="Permissionskey"  v-model="mdl" disabled="disabled"  placeholder="请输入权限标识" />
        </a-form-item>  -->
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
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label='标识'      
          fieldDecoratorId="Permission_key"
          hasFeedback>
          <a-input name="Permissionskey" placeholder='标识' id='Permissionskey' />
        </a-form-item>
        <a-form-item         
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          label='权重'      
          fieldDecoratorId="OrderID"
          hasFeedback>
          <a-input name="OrderID" placeholder='权重' id='OrderID' />
        </a-form-item>
        <a-form-item
          label="部门类别名"      
          fieldDecoratorId="Permission_name"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入部门类别名' }]}">
          <a-input name="Permissionvalue" placeholder="请输入部门类别名" />
        </a-form-item>   
        <a-form-item
          label="部门类别描述"      
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"  
          fieldDecoratorId="description"   
          :fieldDecoratorOptions="{rules: [{ required: false, message: '部门类别描述' }]}">
          <a-textarea rows="4" name="description" placeholder="部门类别描述" />
        </a-form-item>
      </a-form>
    </a-modal>
    <s-table ref="mytable" :columns="columns" :data="myloaddata">

      <span slot="actions" slot-scope="text, record">
        <a-tag v-for="(action, index) in record.actionList" :key="index">{{ action.describe }}</a-tag>
      </span>

      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="delPremissionaction(record.ID)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <!-- <a-modal
      title="操作"
      :width="800"
      v-model="visible"
      @ok="handleOk">
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='权限列表'
          hasFeedback
          validateStatus='success'
        >
          <a-input placeholder='权限识别码' v-model="mdl.Permission_key" id='no' disabled="disabled" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='权限名称'
          hasFeedback
          validateStatus='success'
        >
          <a-input placeholder='起一个名字' v-model="mdl.name" id='permission_name' />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='状态'
          hasFeedback
          validateStatus='warning'
        >
          <a-select v-model="mdl.status">
            <a-select-option value='1'>正常</a-select-option>
            <a-select-option value='2'>禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='描述'
          hasFeedback
        >
          <a-textarea :rows="5" v-model="mdl.describe" placeholder="..." id='describe'/>
        </a-form-item>

        <a-divider />

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='赋予权限'
          hasFeedback
        >
          <a-select
            style="width: 100%"
            mode="multiple"
            v-model="mdl.actions"
            :allowClear="true"          >
            <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">{{ action.label }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal> -->

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
 import { AddPermission ,UpdataPermission ,DelPermission } from '@/api/manage'
  export default {
    name: "TableList",
    components: {
      STable
    },
    data () {
      return {
        UpdatePre_model:false,
        addPre_model:false,
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
      //  Updateform:null,
        mdl: {},

        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'ID'
          },
          {
            title: '权限名称',
            dataIndex: 'Permission_name',
          },
          {
            title: '权限标识码',
            dataIndex: 'Permission_key',
            // scopedSlots: { customRender: 'actions' },
          },
          {
            title: '角色名',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
          },
          {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 向后端拉取可以用的操作列表
        permissionList: null,
        // 加载数据方法 必须为 Promise 对象
        // loadData: parameter => {
        //   return this.$http.get('/permission', {
        //     params: Object.assign(parameter, this.queryParam)
        //   }).then(res => {
        //     let result = res.result
        //     result.data.map(permission => {
        //         permission.actionList = JSON.parse(permission.actionData)
        //         return permission
        //       })
        //     return result
        //   })
        // },
        myloaddata:parameter=>{
          return this.$http.get('http://172.20.8.28:3001/api/PermissionList', {
            params: Object.assign(parameter, this.queryParam),
      //       headers:{
			// 	'Content-Type':'application/x-www-form-urlencoded'
			// }
          }).then(res => {

            // console.log(res.code)
            if(res.code==-1)
            {
                this.$router.push('/login')
            }
              // let times=res.result.data[0].addtime
          //  console.log(this.filter('dayjs',times))
            // console.log(res.result.data[0].addtime)//Vue.filter('dayjs',
            return  res.result
          })
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '正常',
          2: '禁用'
        }
        return statusMap[status]
      }
    },
    created () {
   
      this.loadPermissionList()
    },
    methods: {
    
       showsuccess(res) {
        this.$message.success(res);
      },
       showerror(res) {
        this.$message.error(res);
      },
      delPremissionaction(id)
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
     
           DelPermission({ID:id}).then(res=>{
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
  handleSubmit (e) {
      e.preventDefault()     
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
        //  console.log(values)
          AddPermission(values).then(res=>{
            if(res.code===1)
            {
                this.$message.success(res.message)
                this.addPre_model=false
                this.form.resetFields()
                this.$refs.mytable.refresh()
            }
            else
            {              
                this.$message.error(res.message);  
                this.form.resetFields()   
               
            }
                console.log(res)
          })
        }
      })
    },
      handleUPDATE (e) {
      e.preventDefault()              
      this.Updateform.validateFields((err, values) => {
        if (!err) {
        UpdataPermission(values).then(res=>{
          if(res.code===1)
            {
                this.$message.success(res.message)
                this.UpdatePre_model=false
                this.Updateform.resetFields()
                this.$refs.mytable.refresh()
            }
            else
            {              
                this.$message.error(res.message);  
                //this.Updateform.resetFields()   
               
            }
        })  
          // console.log('Received values of form: ', values)
        }
      })
  
    },     
      addpermission()
      {
        this.addPre_model=true
      },
      loadPermissionList () {
        // permissionList
        new Promise((resolve => {
          const data = [
            { label: '新增', value: 'add', defaultChecked: false },
            { label: '查询', value: 'get', defaultChecked: false },
            { label: '修改', value: 'update', defaultChecked: false },
            { label: '列表', value: 'query', defaultChecked: false },
            { label: '删除', value: 'delete', defaultChecked: false },
            { label: '导入', value: 'import', defaultChecked: false },
            { label: '导出', value: 'export', defaultChecked: false }
          ]
          setTimeout(resolve(data), 1500)
        })).then(res => {
          this.permissionList = res
        })
      },
      handleEdit (record) {
        this.mdl = Object.assign({}, record)       
        this.UpdatePre_model = true
        console.log(this.mdl)
      //  console.log(this.Updateform)
        setTimeout(() => {
          this.Updateform.setFieldsValue({
          Permission_key:this.mdl.Permission_key,
          Permission_name:this.mdl.Permission_name,
          description:this.mdl.description,
          ID:this.mdl.ID
        })
        }, 100);  
      },
      handleOk () {

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