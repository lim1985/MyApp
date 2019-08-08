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
              <a-button @click="showPermissionModel()" style="margin-left: 8px" type="primary">添加类别</a-button>           
              <a-button style="margin-left: 8px" type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>  
    <s-table
      ref="mytable"
      :columns="columns"
      :data="myloaddata"
      :rowKey="myloaddata=>myloaddata.ID"
    >

      <span slot="actions" slot-scope="text, record">
        <a-tag v-for="(action, index) in record.actionList" :key="index">{{ action.describe }}</a-tag>
      </span>

      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="ToEdit(record)">编辑</a>
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
              <a @click="delPremissionaction(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <PermissionAddModal ref="PermissionAdd"  @ok="handleSaveOk" @close="handleSaveClose"/>
    <PermissionUpdateModal ref="PermissionUpdate"  @ok="handleSaveOk" @close="handleSaveClose"/>
  </a-card>
</template>

<script>
 import STable from '@/components/table/'
 import { DelPermission } from '@/api/manage'
 import PermissionAddModal from '@/views/list/modules/Permission/Add'
 import PermissionUpdateModal from '@/views/list/modules/Permission/Update'
  export default {
    name: "TableList",
    components: {
      STable,
      PermissionAddModal,
      PermissionUpdateModal
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
            title: '说明',
            dataIndex: 'description',
            scopedSlots: { customRender: 'description' },
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

           console.log(res)
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
  handleSaveClose(){
          this.$refs.mytable.refresh()
    },
    handleSaveOk(){
          this.$refs.mytable.refresh()
      },
      handleChange(val){
        console.log(val);
      },
       showsuccess(res) {
        this.$message.success(res);
      },
       showerror(res) {
        this.$message.error(res);
      },
      delPremissionaction(record)
      {         
        let _this=this      
        console.log(record);
        this.$confirm({
          title: '警告',
          content: '记录删除将无法找回，真的要删除吗?',
          okText: '删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {           
          console.log('OKclick');
            // 在这里调用删除接口
       
     
           DelPermission({ID:record.ID,key:record.Permission_key}).then(res=>{
             console.log(res)
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
  // handleSubmit (e) {
  //     e.preventDefault()     
  //     this.form.validateFields((err, values) => {
  //       if (!err) {
  //         // console.log('Received values of form: ', values)
  //       //  console.log(values)
  //         AddPermission(values).then(res=>{
  //           if(res.code===1)
  //           {
  //               this.$message.success(res.message)
  //               this.addPre_model=false
  //               this.form.resetFields()
  //               this.$refs.mytable.refresh()
  //           }
  //           else
  //           {              
  //               this.$message.error(res.message);  
  //               this.form.resetFields()   
               
  //           }
  //               console.log(res)
  //         })
  //       }
  //     })
  //   },
    
      ToEdit(record)
      {
        this.$refs.PermissionUpdate.get(record)
      },
      showPermissionModel()
      {
        this.$refs.PermissionAdd.get();
        // this.addPre_model=true
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

       
          areakey:this.mdl.areakey,
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