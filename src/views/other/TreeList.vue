<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="DepTree"
         
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="19">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :rowKey="loadData=>loadData.ID"
          :data="loadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-if="auth('table.disable')">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-if="auth('table.delete')">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>

    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import  STable  from '@/components/newTable'
// import OrgModal from './modules/OrgModal'
import { DepTreelist,GetByDepIDAndPermissionKey } from '@/api/manage'
//  getOrgTree,getServiceList,GetALLDep,GetAllPhoneuser
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    // OrgModal
  },
  data () {
    return {
      openKeys: ['152'],

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '姓名',
          dataIndex: 'UserName'
        },
        {
          title: '职务',
          dataIndex: 'UJOB'
        },
        {
          title: '手机',
          dataIndex: 'cellphone'
          // sorter: true,
          // needTotal: true,
          // customRender: (text) => text + ' 次'
        },
        {
          title: '座机',
          dataIndex: 'Tel',
          // needTotal: true
        },
        {
          title: '所属部门',
          dataIndex: 'Permission_Key',
          // sorter: true
        },
        // {
        //   table: '操作',
        //   dataIndex: 'action',
        //   width: '150px',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {      
        return GetByDepIDAndPermissionKey(Object.assign(parameter, this.queryParam))
          .then(res => {
            // console.log(res.result)
            return res.result
          })
      },
      DepTree:[],
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    this.getDepTree();
    this.initlist();
  },
  methods: {
    initlist(){
          this.queryParam = {
        DepID: 152,
        key:"QW",
        status:9
        }
      // this.$refs.table.refresh(true)
        // GetAllPhoneuser().then(res=>{
        //   this.loadData=res.result.data
        //   console.log(res)
        // })
    },
getDepTree(){
      DepTreelist().then(res=>{
        // this.DepTree=res.result
        res.result.forEach(v => {
          v.OrderID && this.DepTree.push(v)
        });
        console.log(res.result)
      })  
},  
handleEdit(s)
{
  console.log(s)
},
    auth(e)
    {
      if (e)

      return true;
    },
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        DepID: e.key,
        key:e.keyPath[1],
        status:9
        }
      this.$refs.table.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {
        console.log('点中了')
    },
    handleSaveClose () {

    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>
