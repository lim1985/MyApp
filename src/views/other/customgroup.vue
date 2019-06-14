<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
       
        <s-tree
          :dataSource="Grouplist"         
          :openKeys.sync="openKeys"        
          :addgroup="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"          
          @addGroup="addgroup">          
        </s-tree>
         
      </a-col>
      <a-col :span="19">
        <div class="table-operator">    
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="sendsms(selectedRows)"><a-icon type="lock" />发短信</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <s-table
          ref="mytable"
          size="default"
          :columns="columns"
          :rowKey="UserloadData=>UserloadData.ID"
          :data="UserloadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">                    
            <a v-show="record.Ustatus==9 || record.Ustatus==7" @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link">
                操作 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="sendsms(record)">发短信</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7|| record.Ustatus==6">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>
    <CustomGroupModal ref="Groupmodal" @ok="handleSaveOk" @close="handleSaveClose" />
    <UserToGroupModal ref="UserToGroupmodal" @ok="handleSaveOk" @close="handleSaveClose" />
    <SendsmsModal ref="SendsmsModal" :Pupuarr="Pupu" @ok="handleSaveOk" @close="handleSaveClose"/>
    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import  STable  from '@/components/newTable'
import CustomGroupModal from './modules/CustomGroupAdd'
import UserToGroupModal from './modules/UserToGroupAdd'
import SendsmsModal from '@/views/list/modules/sendSMS/sendsms'

// import { mapState} from 'vuex'
// import OrgModal from './modules/OrgModal'
import { GetCustomGroupByDepID,FindAllUserByGroupID } from '@/api/manage'
//  getOrgTree,getServiceList,GetALLDep,GetAllPhoneuser,GetByDepIDAndPermissionKey,DepTreelist,PostByDepIDPermissionKey
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    CustomGroupModal,
    UserToGroupModal,
    SendsmsModal
    // OrgModal
  },
  data () {
    return {
      Pupu:[],
      openKeys: ['152-QW-CSZ'],
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
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
       UserloadData:(parameter)=>{
         console.log(Object.assign(parameter,this.QueryUserParam))
         return FindAllUserByGroupID(Object.assign(parameter,this.QueryUserParam)).then(res=>{
         
        
           this.Pupu=res.result.data.map(item=>{
            return {Phone:item.cellphone,username:item.UserName,DPname:item.Permission_name,ID:item.ID,UJOB:item.UJOB,checked:false}
            })  
           return res.result
         
         })
       },          
      DepArrParam:[],
      DepTree:[],
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      parameter:{
        pageNo:1,
        pageSize:10
      },
      onclick:false,
      Grouplist:[],
      QueryUserParam:{}
   
    // const pageSize=res.pageSize pageNo       
    }
  },
  created () {
    // this.getDepTree();
     this.getCustomGroup();
  },
  mounted(){
   
  },
    computed:{
      
    },
  watch:{
      "$route": "getCustomGroup"
    // '$route'()
    // {        
    //   this.$store.commit('SET_DepId',this.$route.fullPath.split('/')[3]);     
    //   // this.$refs.mytable.refresh()     
    // }
  },
  methods: { 
  sendsms(IDs)
      {
      // let _arr=[]  
      // !IDs.length? _arr.push(IDs): _arr=IDs
      this.$refs.SendsmsModal.get(IDs); 
      },
    getCustomGroup()
    {  
      
        let _depid=this.$route.fullPath.split('/')[3];
        let data={
          DepID:_depid
        }    
        GetCustomGroupByDepID(data).then(res=>{        
   
         this.Grouplist= res.data.rows.map(v=>{    
         
          return {title:v.GroupName,key:v.GroupID,icon:'null'}
          })   
        console.log(this.Grouplist)
        })
      // this.Grouplist=[{key:'001',title:'001'},{key:'002',title:'002'}]
     
    },
      addgroup(e){
         this.$refs.Groupmodal.add(e); 
      },
      // addusertogroup(e){
      //    this.$refs.UserToGroupModal.add(e);  
      // },
      // getDepTree(){
      //       DepTreelist().then(res=>{
      //         // this.DepTree=res.result
      //         res.result.forEach(v => {
      //           v.OrderID && this.DepTree.push(v)
      //         });
      //       // console.log(this.DepTree)
      //   })  
      // },  
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
      this.onclick=true;
     this.QueryUserParam ={
        GroupID:e.key
      }
      //  FindAllUserByGroupID(this.QueryUserParam).then(res=>{
      //     console.log(res)
      //   })
      // this.queryParam = {
      //   DepID: e.key,
      //   key:e.keyPath[1],
      //   status:9
      //   }
      this.$refs.mytable.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.UserToGroupmodal.add(item);  
      // this.$refs.modal.add(item.key)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {
         this.$refs.mytable.refresh()   
        console.log('点中了')
    },
    handleSaveClose () {
      this.getCustomGroup();
    },
    onSelectChange (selectedRowKeys, selectedRows) {

      
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      console.log(this.selectedRowKeys)
    console.log(this.selectedRows)
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

