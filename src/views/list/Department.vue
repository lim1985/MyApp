<template>
  <a-card :bordered="false">
    <!-- <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div> -->

    <div class="table-operator">
      <a-button type="primary" @click="add()" icon="plus">新建部门</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="DelMultiple()"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="mytable"
      size="default"
      :rowKey="loadData=>loadData.DepartmentId"
      :columns="columns"
      :data="loadData"
      :showAlertInfo="true"
      @onSelect="onChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>            
              <a @click="CmccSmsDepAccounts(record)">短信配置</a>            
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a-popconfirm title="是否要删除此行？" @confirm="handleDEL(record)">
                <a>删除</a>
              </a-popconfirm>             
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      
        
      </span>
    </s-table>
    <Add-Modal ref="AddModal" @ok="handleSaveOk" @close="handleSaveClose"/>
    <Update-Modal ref="UpdateModal" @ok="handleSaveOk" @close="handleSaveClose"/>
    <cmccDepAccounts-Modal ref="cmccDepAccountsModal" @ok="handleSaveOk" @close="handleSaveClose"/>
   
  </a-card>
</template>

<script>

  import STable from '@/components/table/'
  import ATextarea from "ant-design-vue/es/input/TextArea"
  import AInput from "ant-design-vue/es/input/Input"
  import { QueryAllDeplist,DelDePartment} from '@/api/manage'
  import AddModal from './modules/Department/Add'
  import UpdateModal from './modules/Department/Update'
  import cmccDepAccountsModal from './modules/Department/cmccDepAccounts'
//getRoleList,
// GetPermissioninfobyKey
  export default {
    name: "TableList",
    components: {
      AInput,
      ATextarea,
      STable,
      AddModal,
      UpdateModal,
      cmccDepAccountsModal
    },
  
    data () {
      return {
      
        value:'',
        DepName:[],
        AddDEPVisible:false,
        visible: false,
       
        form: null,
        mdl: {},
        Mymdl:{},
        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '部门编号',
            dataIndex: 'DepartmentId'
          },
          {
            title: '部门名称',
            dataIndex: 'DepartmentName'
          },        
          {
            title: '部门简称',
            dataIndex: 'Abbreviation',
            // needTotal: true
          },
            {
            title: '所属分类',
            dataIndex: 'Permission_name',          
            // needTotal: true
           
          },
          {
            title: '权重',
            dataIndex: 'Priority',
            sorter: true,
            needTotal: true,
          },          
          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // console.log('-------')
          // console.log(parameter)
          return QueryAllDeplist(Object.assign(parameter, this.queryParam))
            
            .then(res => {
              console.log(res.result)
              // console.log('返回数据')
              // console.log(res.result)
              return res.result
            })
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
 
    created () {
      // getRoleList({ t: new Date()})
    
      //   //  GetPermissioninfobyKey({key:'qw'}).then(res=>{
        //    console.log(res)
        //  })

     
    },
    async mounted(){
      // this.DepName=await this.GetDepName();
      // console.log(this.DepName)


    },
    methods: {
      CmccSmsDepAccounts(s){
         this.$refs.cmccDepAccountsModal.add(s);    
        console.log(s);
      },
        handleSaveClose(){
          this.$refs.mytable.refresh()
    },
    handleSaveOk(){
          this.$refs.mytable.refresh()
      },
          async add()
        { 
          this.$refs.AddModal.add();                 
            // this.PhoneVisible = true  
            // this.$nextTick(()=>{
            // this.UseAddform.resetFields() 
            // })
        },
     DelMultiple()
      {     
  this.selectedRows.forEach(async v => {
          //  console.log(v)               
             let res= await DelDePartment(v)     
            console.log(res)
              if(!res.code)
              {
                 this.$message.error(res.message);    
              }
              else
              {              
                 this.$refs.mytable.refresh()
                 this.$message.success(res.message); 
              }            
         });
         
      },
    
       loadNumber(event) {
        var el = event.currentTarget;
        var elValue = el.value;
        var reg = /^((?!0)\d{1,2}|100)$/;
        if (!elValue.match(reg)) {
            elValue = "";
            console.log("b")
            return false;
        } else {
            return true;
        }
    },
    
     async handleDEL(record)
     {
        this.Mymdl = Object.assign({}, record)
      
      
        const res=await DelDePartment(this.Mymdl)
        console.log(res);
          if(!res.code)
              {
                 this.$message.error(res.message);    
              }
              else
              {              
                 this.$refs.mytable.refresh()
                 this.$message.success(res.message); 
              }
     },    
      async addDEP()
        {
          //  let a= await this.GetDepName();
           setTimeout(() => {
              this.AddDEPVisible = true  
               this.$nextTick(()=>{
              this.form.resetFields()   
            })
               
           }, 100);
          
          
            
                           
        },
      handleEdit (record) {
          setTimeout(() => {
            console.log(record);
            this.$refs.UpdateModal.add(record);  
        }, 100);            
      },
      handleOk () {
          console.log(this.Mymdl);
      },
      onChange (row) {
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

      
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