<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="DepTree"         
          :openKeys.sync="openKeys"
          :search="true"
          :addgroup="false"
          @click="handleClick"
          @add="handleAdd"
          @ReturnValue="GetUsersList"
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
import { DepTreelist,PostByDepIDPermissionKey } from '@/api/manage'
import Validate from '@/tools/Validate/index'
// import { Promise } from 'q';
//  getOrgTree,getServiceList,GetALLDep,GetAllPhoneuser,GetByDepIDAndPermissionKey
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
      isSearch:false,
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
          dataIndex: 'Abbreviation',
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
       loadData: (parameter) => {  
         if(this.isSearch)
         {
           console.log(this.SearchValue);
            return Validate.findbyUserInformation(this.SearchValue)
            .then(res=>{
              if(res.code==1)
              {
                this.isSearch=false;
                return res.res
              }       
         })   
         }
            if(this.onclick)
          {  
            let _obj=new Object()
            let _arr=[]
            _arr.push(this.queryParam)
            _obj.param=_arr;
            
          return PostByDepIDPermissionKey(Object.assign(parameter,_obj))
            .then(res => {
              console.log(res.result)
              return res.result
            })
          }   
           
        return DepTreelist()
          .then(res => {
            console.log("7777777777777777")
            console.log(res.result)
            return res.result
          }).then(r=>{          
          let _arr=[]
          r.forEach(v => {
              for(let x in v.children)
              {
             _arr.push( v.children[x])
           }
         });
        const params=_arr.map(item => ({
          key: item.Permission_Key,      
          DepID: item.key,      
          status: 9
          })
      );
            return params
          }).then(params=>{  
           console.log(this.onclick) 
           console.log(params) 
               this.queryParam={
              param:params,                      
            } 
            console.log('输出的参数！');
             console.log(this.queryParam);
            
            return PostByDepIDPermissionKey(Object.assign(parameter,this.queryParam))
          .then(res => {
            console.log(`000000999999`)
            console.log(res.result)
            this.seach=res.result
            return this.seach;
          })
        })
     },        
      seach:[],
      DepArrParam:[],
      DepTree:[],
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      parameter:{
        pageNo:1,
        pageSize:20
      },
      onclick:false,
      SearchValue:''
   
    // const pageSize=res.pageSize pageNo       
    }
  },
  created () {
    this.getDepTree();
      console.log(this.DepTree)
  },
  methods: {
    GetUsersList(val)
    {
      
       
       if(val!='')
       {
            this.SearchValue=val;
            this.isSearch=true;
            this.$refs.table.refresh(true)
       }
       else
       {
          this.queryParam = {
        DepID: 152,
        key:'QW',
        status:9
        }
         this.$refs.table.refresh(true)
       }        
    
  
    //  return Validate.findbyUserInformation(val).then(res=>{
    //    if(res.code==1)
    //    {
    //      return res.res
    //    }
       
    //   })
    //  }

      
        //  this.loadData=()=>{
          
          
        //    return Validate.findbyUserInformation(val).then(res=>{
        //      if(res.code==1)
        //      {
        
         
          
        
        //      }
        //  })
        //  }
      
  // Validate.findbyUserInformation(val).then(res=>{
  //             console.log(res);
            //     if(res.code==1)
            //     {
            //  let _res={
            //     pageNo:1,
            //     pageSize:20,
            //     data:res.res.rows,
            //     totalPage:parseInt(res.res.count/20),
            //     count:res.res.count
            //    }
            //       resolve(_res)
            //     }
                //  console.log(res);
            //  })

      //  })
          //  return Validate.findbyUserInformation(val).then(res=>{
          //       if(res.code==1)
          //       {
          //    let _res={
          //       pageNo:1,
          //       pageSize:20,
          //       data:val.res.rows,
          //       totalPage:parseInt(val.res.count/20),
          //       count:val.res.count
          //      }
          //      return _res;
          //       }
          //        console.log(res);
          //    })
 
     
        // this.loadData=(this.parameter)= Validate.findbyUserInformation(_value)
        // this.loadData=()=>{
        //   return new Promise((resolve)=>{
        //      Validate.findbyUserInformation(Object.assign(this.parameter,val)).then(res=>{
        //          console.log(res);
        //      })
        //   })

        // }
      // if(val.IsSearch)
      // {
      //   this.loadData=()=>{
      //     return new Promise((resolve)=>{
      //         if(val.code==1)
      //         {
      //           let _res={
      //           pageNo:1,
      //           pageSize:20,
      //           data:val.res.rows,
      //           totalPage:parseInt(val.res.count/20),
      //           count:val.res.count
      //           }
      //           resolve(_res);
      //         }
      //     })
      //   }
      //    this.$refs.table.refresh()
      // }
       
        
        //   let _res={
        //     pageNo:1,
        //     pageSize:10,
        //     data:val.res.rows,
        //     totalPage:parseInt(val.res.count/10),
        //     count:val.res.count
        //   }
        // this.seach=_res;
       
        
          //
    
   

    
      // if(val.code==1)
      // {
      //   this.loadData=val.res.rows;
      // }

      // console.log(this.loadData)
    },
    // initlist(){
    //       this.queryParam = {
    //     DepID: 152,
    //     key:"QW",
    //     status:9
    //     }
      // this.$refs.table.refresh(true)
        // GetAllPhoneuser().then(res=>{
        //   this.loadData=res.result.data
        //   console.log(res)
        // })

getDepTree(){
      DepTreelist().then(res=>{
        // this.DepTree=res.result
        
        res.result.forEach(v => {
          v.OrderID && this.DepTree.push(v)
        });
        console.log("-----------------000000000000000000000----------------");
        console.log(res.result);
        // console.log(res.result)
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
      this.queryParam = {
        DepID: e.key,
        key:e.keyPath[1],
        status:9
        }
        console.log(this.queryParam);
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

