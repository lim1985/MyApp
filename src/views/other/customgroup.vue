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
              <a-menu-item key="3"><a-icon type="lock" />发短信</a-menu-item>
              <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
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
          :columns="columns"
          :rowKey="UserloadData=>UserloadData.ID"
          :data="UserloadData"
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
    <CustomGroupModal ref="Groupmodal" @ok="handleSaveOk" @close="handleSaveClose" />
    <UserToGroupModal ref="UserToGroupmodal" @ok="handleSaveOk" @close="handleSaveClose" />
    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import  STable  from '@/components/newTable'
import CustomGroupModal from './modules/CustomGroupAdd'
import UserToGroupModal from './modules/UserToGroupAdd'
// import { mapState} from 'vuex'
// import OrgModal from './modules/OrgModal'
import { DepTreelist,PostByDepIDPermissionKey,GetCustomGroupByDepID,FindAllUserByGroupID } from '@/api/manage'
//  getOrgTree,getServiceList,GetALLDep,GetAllPhoneuser,GetByDepIDAndPermissionKey
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    CustomGroupModal,
    UserToGroupModal
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
           console.log(res.result)
           return res.result
         
         })
       },
       loadData: (parameter) => {  
                // return FindAllUserByGroupID(Object.assign(parameter))
                // .then(res=>{
                //    console.log(res)
                //   return res 
                 
                // })
            if(this.onclick)
            {  
             let _obj=new Object()
             let _arr=[]
             _arr.push(this.queryParam)
             _obj.param=_arr;            
              return PostByDepIDPermissionKey(Object.assign(parameter,_obj))
              .then(res => {
           
                // console.log(res.result)
                return res.result
              })
            }              
        return DepTreelist()
          .then(res => {
          //  console.log(res.result)
            return res.result
          }).then(r=>{          
          let _arr=[]
          r.forEach(v => {
              for(let x in v.children)
              {
             _arr.push(v.children[x])
              }
          });
          // console.log(_arr);
        const params=_arr.map(item => ({
          key: item.Permission_Key,      
          DepID: item.key,      
          status: 9
          })
      );
            return params
          }).then(params=>{  
            console.log(this.onclick) 
          
               this.queryParam={
              param:params,                      
            } 
            // console.log(this.queryParam);
            return PostByDepIDPermissionKey(Object.assign(parameter,this.queryParam))
          .then(res => {
            // console.log(res)
            return res.result
          })
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
    this.getDepTree();
    
  },
  mounted(){
    this.getCustomGroup();
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

    getCustomGroup()
    {  
        let _depid=this.$route.fullPath.split('/')[3];
        let data={
          DepID:_depid
        }
      // console.log(this.queryParam);
      
        GetCustomGroupByDepID(data).then(res=>{
        
         this.Grouplist= res.data.rows.map(v=>{          
          return {title:v.GroupName,key:v.GroupID,icon:'null'}
          })       
        })
   
        // this.QueryUserParam={
        //   GroupID:this.Grouplist[0].key
        // }
    },
      addgroup(e){
         this.$refs.Groupmodal.add(e); 
      },
      // addusertogroup(e){
      //    this.$refs.UserToGroupModal.add(e);  
      // },
      getDepTree(){
            DepTreelist().then(res=>{
              // this.DepTree=res.result
              res.result.forEach(v => {
                v.OrderID && this.DepTree.push(v)
              });
            // console.log(this.DepTree)
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

