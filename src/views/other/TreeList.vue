<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <!-- <a-select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          style="width: 160px"
          @focus="handleFocus"
          @search="Searchs"
          @blur="handleBlur"
          @change="handleChange"
          :filterOption="filterOption"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="tom">Tom</a-select-option>
          <a-select-option value="ZHB">张海波</a-select-option>
        </a-select> -->
        <s-tree
          :dataSource="DepTree"         
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
          @titleClick="handleTitleClick"></s-tree>

      </a-col>
      <!-- <a-row :gutter="8">
        <a-col>
          <a-list
            size="small"
            bordered
            itemLayout="horizontal"
            :dataSource="data2"
          >           
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta>
                <a slot="title" href="https://vue.ant.design/">{{ index }}.{{ item.title }}</a>       
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row> -->
      <a-col :span="19">
        <!-- showPagination=true -->
        <s-table
          ref="table"
          size="default"        
          :columns="columns"
          :rowKey="loadData=>loadData.ID"
          :data="loadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <template slot="Tel" slot-scope="text">
            <a @click="GetUboxToTel(text)">{{ text }}</a>
          </template>
          <template slot="cellphone" slot-scope="text,record">
            <a-divider type="vertical" />
            <a-dropdown v-show="text">
              <a class="ant-dropdown-link">
                {{ text }} <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="sendsms(record)">发短信</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="GetUboxToTel(text)">打电话</a>
                </a-menu-item>           
              </a-menu>
            </a-dropdown>      
          </template>
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
    <SendsmsModal ref="SendsmsModal" :Pupuarr="Pupu" @ok="handleSaveOk" @close="handleSaveClose"/>
    <PhoneModal ref="PhoneModal"/>
    <!-- <Myselect ref="Myselect"/> -->

    
    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
</template>

<script>
// const data2 = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
// ]
import STree from '@/components/Tree/Tree'
import STable  from '@/components/newTable'
// import OrgModal from './modules/OrgModal'
import { DepTreelist, PostByDepIDPermissionKey,SelectDepslistsbyLike} from '@/api/manage'
import Validate from '@/tools/Validate/index'
import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'
import SendsmsModal from '@/views/list/modules/sendSMS/sendsms'
// import Myselect from '@/views/other/Select'
// import { Promise } from 'q';
//  getOrgTree,getServiceList,GetALLDep,GetAllPhoneuser,GetByDepIDAndPermissionKey
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    PhoneModal,
    SendsmsModal,
    // Myselect
    // OrgModal
  },
  data () {
    return {
      // data2,
      Deplists:[],
      showListSearch:false,
      data:{},
      openKeys: ['152'],
      isSearch:false,
      isNull:true,
      paramss:[],
      arrs:[],
      pp:'',
      Pupu:[],
      reqCount:0,
      isRes:{},
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
            title: '工作座机',
            dataIndex: 'Tel',
            scopedSlots: { customRender: 'Tel' },
           
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
             this.paramss.push(this.SearchValue)            
             let _arrs= Validate.unique(this.paramss)         
             this.pp=_arrs[_arrs.length-1]          
             let data={
              data:this.pp,
              parameter
            }
            console.log(data)
            // this.data=Object.assign(parameter,this.pp)
            //     console.log(this.data)
            return Validate.findbyUserInformation(data)
            .then(res=>{ 
              if(res.code==1)
              {        
                console.log(res.res)                      
                this.Pupu=res.res.data.map(item=>{
                  return {Phone:item.cellphone,username:item.UserName,DPname:item.DepartmentName,ID:item.ID,UJOB:item.UJOB,checked:false}
                })                          
                return res.res
              }
              else
              {             
                // if(this.showListSearch)
                // {
                //   console.log('可以传参数了！')
                // }              
                this.isRes=res
                if(this.isres==undefined && this.reqCount == 0)
                {
                    this.isSearch=false;
                    this.onclick=true;
                    this.queryParam = {
                    DepID: 152,
                    key:'QW',
                    status:9
                    }
                    this.$message.error('没有搜索到该该联系人！')
                    this.$refs.table.refresh()
                    this.reqCount++
                }                
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
           
             this.Pupu=res.result.data.map(item=>{
             return {Phone:item.cellphone,username:item.UserName,DPname:item.DepartmentName,ID:item.ID,UJOB:item.UJOB,checked:false}
           })  
            console.log(this.Pupu) 
              return res.result
            })
          }   
           
        return DepTreelist()
          .then(res => {
       
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
          )
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
               this.Pupu=res.result.data.map(item=>{
             return {Phone:item.cellphone,username:item.UserName,DPname:item.DepartmentName,ID:item.ID,UJOB:item.UJOB,checked:false}
           })  
            console.log(this.Pupu)
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
   //搜索框方法
  // async Searchs(val){
  //    let _value=val;
  //      let isok=await Validate.CheckPhoneNumAndchanese(_value)    
  //      if(isok)
  //      {
  //       this.SearchValue=_value;
  //       this.isSearch=true;
  //       this.seach=[]         
  //       this.$refs.table.refresh()
  //      console.log(_value);
  //      }
  //       else if (_value=='')
  //      {
  //      console.log(_value);
  //      }  
  //  },
    handleChange (value) {      
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
   //搜索框方法结束

     sendsms(IDs)
      {
      // let _arr=[]  
      // let _obj=new Object();
      // _obj.DepartmentName=IDs.DepartmentName;
      // _obj.cellphone=IDs.cellphone;
      // _obj.ID=IDs.ID;
      this.$refs.SendsmsModal.get(IDs); 
      },
       GetUboxToTel(e)
    {
      this.$refs.PhoneModal.get(e)          
    },
    async handleSearchDeps(val)
    {
      console.log('子组件传来的')
      console.log(val)
         this.queryParam = {
        DepID: val.DepID,
        key:val.Per_Key,
        status:9
        }
      this.onclick=true;
      this.$refs.table.refresh()
    },
    async GetUsersList(val)
     {

       console.log(val)
       if(val!='')
       {
        let res=await SelectDepslistsbyLike({DPName:val})      
        if(res.code==1)
        {
          this.showListSearch=true;
          console.log(res.res);
          this.Deplists=res.res//props 数据到自组建
        }
        else if(res.code==-1)
        {         
        this.SearchValue=val;
        this.isSearch=true;
        console.log(val);
        this.seach=[]     
        this.$refs.table.refresh()  
        }
                                  
       }
       else
       {        
        console.log(val);
        console.log('到这了');
        this.isSearch=false;
        this.onclick=true;
        this.showListSearch=false;
        this.reqCount=0;
        this.queryParam = {
        DepID: 152,
        key:'QW',
        status:9
        }
         this.$refs.table.refresh()
       }     
    },


getDepTree(){
      DepTreelist().then(res=>{
        // this.DepTree=res.result        
        res.result.forEach(v => {
          v.OrderID && this.DepTree.push(v)
        });
     
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
      this.isSearch=false;
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
.gloabl-ul{ padding: 10px 10px 0px 15px}
.global-search-wrapper{
   border: 1px solid #d9d9d9;
    border-top-color: #fff;
    margin-top: -20px;
    border-radius: 5px;
}
 .global-search-item{
   list-style: none;
    padding: 2px;
   &:hover{
     font-size: 15px;
     color:#1890ff;
     cursor:pointer;
    
   }
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

