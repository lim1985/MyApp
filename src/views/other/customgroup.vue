<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">       
        <!-- :dataSource="DepTree"         
          :openKeys.sync="openKeys"
          :search="true"
          :addgroup="false"
          :DepsDataSource="Deplists"
          :showDeplist="showListSearch"
          @click="handleClick"
          @SearchDepslist="handleSearchDeps"
          @add="handleAdd"
          :showDepTree="true"
          @ReturnValue="GetUsersList"
          @titleClick="handleTitleClick" -->
        <s-tree
          :search="false"
          :dataSource="Grouplist"         
          :openKeys.sync="openKeys"        
          :addgroup="true"
          @click="handleClick"
          @add="handleAdd"
          @minu="handleMinu"        
          @titleClick="handleTitleClick"    
          @ReturnValue="GetUsersList"      
          @addGroup="addgroup">          
        </s-tree>
         
      </a-col>
      <a-col :span="19">
        <div class="table-operator">  
          <!-- v-if="selectedRowKeys.length > 0"   -->
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="sendsms(selectedRows)"><a-icon type="mobile" />发短信</a-menu-item>
              <a-menu-item key="3" @click="CusTomGroupsortUser(selectedRows)"><a-icon id="swap-i" type="swap" />排序</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-input-search 
            placeholder="输入姓名进行检索当前组" 
            style="width:320px;float: right;padding-bottom: 5px;padding-right: 10px;" 
            @change="onSearchPhoneUser" />
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
          <template slot="cellphone" slot-scope="text">
            <a @click="GetUboxToTel(text)">{{ text }}</a>
          </template>
          <template slot="ToTel" slot-scope="text">
            <a @click="GetUboxToTel(text)">{{ text }}</a>
          </template>
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
                  <a @click="DeleteUser(record)">删除</a>
                </a-menu-item>
                <!-- <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item> -->
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
    <PhoneModal ref="PhoneModal"/>
    <CustomGroupUserSortModal ref="CustomGroupSortModal" @ok="handleSortOK"/>
    <!-- <ConfirmModal ref="ConfirmModal" @ok="handleSaveOk" @close="handleSaveClose"/> -->
    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
    
</template>

<script>
import STree from '@/components/Tree/Tree'
import STable  from '@/components/newTable'
import CustomGroupModal from './modules/CustomGroupAdd'
import UserToGroupModal from './modules/UserToGroupAdd'
import SendsmsModal from '@/views/list/modules/sendSMS/sendsms'
// import ConfirmModal from './modules/ConfirmModal'
import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'
import CustomGroupUserSortModal from '@/views/list/modules/UserSort/CustomGroupUserSort'
import _ from 'lodash'
import { mapState} from 'vuex'
// import OrgModal from './modules/OrgModal'
import { GetCustomGroupByDepID,FindAllUserByGroupID ,DeleteGroupUser,DeleteGroup,SelectDepslistsbyLike} from '@/api/manage'

//  getOrgTree,getServiceList,GetALLDep,GetAllPhoneuser,GetByDepIDAndPermissionKey,DepTreelist,PostByDepIDPermissionKey
export default {
  name: 'Cusomgroup',  
  components: {
    PhoneModal,
    STable,
    STree,
    CustomGroupModal,
    UserToGroupModal,
    CustomGroupUserSortModal,
    SendsmsModal,
    // ConfirmModal
    // OrgModal
  },
   computed:{
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY
      })    
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
          dataIndex: 'cellphone',
          scopedSlots: { customRender: 'cellphone' },
          // sorter: true,
          // needTotal: true,
          // customRender: (text) => text + ' 次'
        },
        {
          title: '座机',
          dataIndex: 'Tel',
          scopedSlots: { customRender: 'ToTel' },
          // needTotal: true
        },
        {
          title: '所属部门',
          dataIndex: 'DepartmentName',
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
        //  console.log(Object.assign(parameter,this.QueryUserParam))
        console.log(this.QueryUserParam)
         return FindAllUserByGroupID(Object.assign(parameter,this.QueryUserParam)).then(res=>{         
             console.log(res)
           this.Pupu=res.result.data.map(item=>{
            return {Phone:item.cellphone,username:item.UserName,DPname:item.DepartmentName,ID:item.ID,UJOB:item.UJOB,checked:false}
            })  
          // if(res.result.totalCount==0&& this.isSearch)
          // {
          //    this.$message.info('当前自定义组查询不到该联系人，请重试')
          // }
          //  console.log(res.result)
          //     console.log(this.QueryUserParam)
          //     this.Userlist.GroupID=this.QueryUserParam;
          this.Userlist=res.result.data
          //  this.Userlist=Object.assign(res.result.data,this.QueryUserParam)
          
           console.log(this.Userlist);
          
           return res.result         
         })
       },     
      Userlist:[],
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
      isSearch:false,
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
    // computed:{
      
    // },
  watch:{
      "$route": "getCustomGroup",
  },
  methods: { 

    handleSortOK(){
        console.log('sortOK')
        
            this.$refs.mytable.refresh();
            this.selectedRows=[];
            // this.$refs.mytable.onClearSelected();            
        },
      CusTomGroupsortUser(val)
      {
        console.log(val)
        if(val.length==0)
       {
       this.$refs.CustomGroupSortModal.show(this.Userlist);           
       }   
       else
       {
       this.$refs.CustomGroupSortModal.show(val);         
       }    
      },
      onSearchPhoneUser:_.debounce(function(val){
       const { value} = val.target  
       console.log(value)  
       if(value)
       {

         this.isSearch=true;
         this.QueryUserParam.UserName=value; 
         this.$refs.mytable.refresh()  
         console.log(this.QueryUserParam);   
       }
       else
       {        
        console.log(this.QueryUserParam);
         this.getCustomGroup();
       }
      
      },1000),
    async GetUsersList(val)
     {

       console.log(val)
       if(val!='')
       {
         let res =await SelectDepslistsbyLike({DPName:val})   
         console.log(res);
       }
     },
      //  if(val!='')
      //  {
      //   let res=await SelectDepslistsbyLike({DPName:val})      
      //   if(res.code==1)
      //   {
      //     this.showListSearch=true;
      //     console.log(res.res);
      //     this.Deplists=res.res//props 数据到自组建
      //   }
      //   else if(res.code==-1)
      //   {         
      //   this.SearchValue=val;
      //   this.isSearch=true;
      //   console.log(val);
      //   this.seach=[]     
      //   this.$refs.table.refresh()  
      //   }
                                  
      //  }
      //  else
      //  {        
      //   console.log(val);
      //   console.log('到这了');
      //   this.isSearch=false;
      //   this.onclick=true;
      //   this.showListSearch=false;
      //   this.reqCount=0;
      //   this.queryParam = {
      //   DepID: 152,
      //   key:'QW',
      //   status:9
      //   }
      //    this.$refs.table.refresh()
      //  }     
   
    DeleteUser(data)
    {
      let _data={
        GroupID:this.QueryUserParam.GroupID,
        UserPhoneID:data.ID
      }
      console.log(_data)
      // console.log(this.QueryUserParam.GroupID)
      DeleteGroupUser(_data).then(res=>{
        if(res.code==1)
        {
          this.$message.info('删除成功！')
           this.$refs.mytable.refresh(true)
        }
      })
    
    },
    async handleMinu(e)
    {
       this.$confirm({
          title:'此操作将删除该分组及组里所有联系人，是否继续?',
          okText: '确定',
          cancelText: '取消',
          type: 'warning',
          onOk:()=>{
          let _data={
           GroupID:e.key
           }
           DeleteGroup(_data).then(res=>{              
                res.code==1?this.$message.info(res.msg):this.$message.info('操作失败')
                this.getCustomGroup();
                this.$refs.mytable.refresh(true)
           })              
          },
          onCancel:()=>{
            console.log('quxiao ')
          }
        })  
    },

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
          console.log(res)
         this.Grouplist= res.data.rows.map(v=>{    
         
          return {title:v.GroupName,key:v.GroupID,icon:'null'}
          })
          if(!this.Grouplist.length)
          {
            this.$message.error('当前部门还未添加自定义组，请先添加自定义组')
            return;
          }
       
          if(!this.QueryUserParam.GroupID)
          {
             this.QueryUserParam={
            GroupID:this.Grouplist[0].key
          }          
         }
         
          // if(!this.QueryUserParam.GroupID)   
          // {
          //    if(this.Grouplist.length>0)
          //   {
          // this.QueryUserParam ={
          //   GroupID:this.Grouplist[0].key
          //   }
          //   this.isSearch=false;
           
          //   }
          // }
          // else
          // {
          //   this.QueryUserParam.UserName='';          
          // }
          this.$refs.mytable.refresh(true)
          console.log(this.Grouplist);   
        })
   
     
    },
    GetUboxToTel(e)
    {
      this.$refs.PhoneModal.get(e)          
    },
      addgroup(e){
         this.$refs.Groupmodal.add(e); 
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
  
        this.onclick=true;
        this.QueryUserParam ={
        GroupID:e.key
        }
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
#swap-i
{
  transform: rotate(90deg); 
}
.content .table-operator
{
  margin-bottom:0px;
}
p
{
  margin-top:10px;
}
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

