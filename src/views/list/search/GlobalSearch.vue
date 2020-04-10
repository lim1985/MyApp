<template>
  <div class="search-content">   
    <!-- <router-view
    :showDepListSearch="showDepListSearch"
     /> -->
    <router-view :showDepListSearch="showDepListSearch"></router-view>
    <a-card v-show="isShow" :bordered="false">  
      <div class="table-operator">
        <a-row :gutter="2">
          <a-col :xs="{ span: 24}" :lg="{ span: 8 }" :xl="{span: 8 }" :xxl="{ span: 6}">       
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="3" v-if="IsSendSms.length" @click="sendsms(selectedRows)"><a-icon type="lock" />发短信</a-menu-item>
                <a-menu-item key="1" @click="sortUser(selectedRows)"><a-icon id="swap-i" type="swap" />排序</a-menu-item>
                <!-- <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item> -->
                <!-- lock | unlock -->
                <!-- <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item> -->
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-col>
          <!-- <a-col :xs="{ span: 24 }" :lg="{ span: 6, offset: 8 }" :xxl="{ span: 6,offset:12 }" >        
            <a-input-search placeholder="输入姓名进行检索" style="width:320px" @change="onSearchPhoneUser" />
          </a-col> -->
        </a-row>
            
        <!-- <a-button type="primary" @click="sortUser()" :style="{ fontSize: '18px' }"><a-icon id="swap-i" type="swap" />排序</a-button>       -->
        <!-- v-if="selectedRowKeys.length > 0" -->     
        <div>    
          <a-row type="flex" justify="center" align="middle">
            <a-col :span="24">       
              <p class="height-50"><span>温馨提示：本单位通讯录里的联系人将会出现在对应的主通讯录的单位目录里。</span></p>
            </a-col>
            <!-- <a-col :span="24"><p class="height-50"><span>温馨提示：通讯录里添加的联系人将会出现在通讯录的主目录。</span></p></a-col> -->
      
          </a-row>
        </div> 
      </div>
    
      <s-table     
        ref="mytable"
        size="default"
        :loading="loading"
        :columns="columns"
        :rowKey="loadData=>loadData.ID"
        :data="loadData"
        :showAlertInfo="true"       
        @onSelect="onChange"
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
              <a-menu-item v-if="IsSendSms.length">
                <a @click="sendsms(record)">发短信</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="GetUboxToTel(text)">打电话</a>
              </a-menu-item>           
            </a-menu>
          </a-dropdown>      
        </template>
        <template slot="H_cellphone" slot-scope="text,record">
          <a-divider type="vertical" />
          <a-dropdown v-show="text">
            <a class="ant-dropdown-link">
              {{ text }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="IsSendSms.length">
                <a @click="sendsmstwo(record)">发短信</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="GetUboxToTel(text)">打电话</a>
              </a-menu-item>
            <!-- <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7">
              <a href="javascript:alert('该功能尚未完成');">禁用</a>
            </a-menu-item>
            <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7|| record.Ustatus==6">
              <a-popconfirm
                v-if="loadData.length"
                title="确定删除该联系人么?"
                @confirm="() => onDelete(record)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </a-menu-item> -->
            </a-menu>
          </a-dropdown>
          <!-- <a @click="GetUboxToTel(text)">{{ text }}</a> -->
        </template>
        <!-- 7是前台不可见状态，9为前台可见状态 -->
        <span slot="action" slot-scope="text, record">
          <a v-show="record.Ustatus==9 || record.Ustatus==7" @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              操作 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">          
              <a-menu-item>
                <a href="javascript:alert('该功能尚未完成');">详情</a>
              </a-menu-item>
              <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7">
                <a href="javascript:alert('该功能尚未完成');">禁用</a>
              </a-menu-item>
              <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7|| record.Ustatus==6">
                <a-popconfirm
                  v-if="loadData.length"
                  title="移除后可从【其他】节点下的通讯录中修改单位找回，是否移除?"
                  @confirm="() => onDelete(record)">
                  <a href="javascript:;">移除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </s-table>
      <UpdateUserModal ref="UpdateUserPhonemodal" @ok="handleSaveOk" @close="handleSaveClose"/>
      <SendsmsModal ref="SendsmsModal" :Pupuarr="Pupu" @ok="handleSaveOk" @close="handleSaveClose"/>
      <PhoneModal ref="PhoneModal"/>
      <SortModal ref="SortModal" @ok="handleSortOK"/>
    </a-card>
  </div>
</template>


<script>
  import { GetUserInformationByUserNameLIke,SelectDepslistsbyLike,GetALLByDepID } from '@/api/manage'
 
  // import Validate from '@/tools/Validate/index'
  import UpdateUserModal from '@/views/list/modules/UserPhone/UpdateUserPhone'
  import STable from '@/components/table/'
  import { mapState} from 'vuex'
  import SendsmsModal from '@/views/list/modules/sendSMS/sendsms'
  import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'
  import SortModal from '@/views/list/modules/UserSort/userSort'
  //  import RouteView from '@/components/layouts/RouteView'
  import _ from 'lodash'
  export default {
    name: "SearchLayout",
    components: {
      // RouteView,
    SortModal,
    SendsmsModal,
    PhoneModal,
    UpdateUserModal,  
    STable,     
    },
      computed:{    
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY,
        IsSendSms:state=>state.user.SendSmsList        
      })    
    },
    data () {
      return {
          loadData: (parameter) => {  
            console.log(parameter);
            if(this.isGetDep)
            {
              return GetALLByDepID(Object.assign(parameter,this.queryParam)).then(res=>{
                console.log(res)
               let data= res.result
                  console.log(data);
                  this.isShow=true;
                    data.data.forEach(v => { 
                      if(v['ResferecDep.LIM_ResferenceAndDep.status']==-1)
                      {     
                      if(v.status ==6)
                      {                     
                        v.Ustatus=v.status
                      }      
                        v.Department_ID=v['ResferecDep.LIM_ResferenceAndDep.DepID']                
                        v.Ustatus=v.status                                
                      }
                  });   
                    console.log(data);
                return data
              })
            }
            if(this.isSearch)
            {
              console.log(this.queryParam);
              return GetUserInformationByUserNameLIke(Object.assign(parameter,this.queryParam))
              .then(res=>{
                console.log(res);
                console.log(res.res)
                if(res.code==-1)
                {
                  this.$message.error('没有找到该联系人！请重试')
                  this.isSearch=false;
                  this.isShow=false;
                  this.$refs.mytable.refresh()  
                }
                else
                {              
                  let data= res.res
                  console.log(data);
                  this.isShow=true;
                    data.data.forEach(v => { 
                      if(v['ResferecDep.LIM_ResferenceAndDep.status']==-1)
                      {     
                      if(v.status ==6)
                      {                     
                        v.Ustatus=v.status
                      }      
                        v.Department_ID=v['ResferecDep.LIM_ResferenceAndDep.DepID']                
                        v.Ustatus=v.status                                
                      }
                  });   
                    console.log(data);
                return data
                }          
              })        
            }          
          
          },
        Pupu:[],
        form: null,
        isSearch:false,
        DepqueryParam:{},
        queryParam:{},
        isShow:false,
        isGetDep:false,
        loading:false,
        search: true,
        parameter:{
        pageNo:1,
        pageSize:20
      },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
       // 表头
        columns: [
          {
            title: '姓名',
            dataIndex: 'UserName',
            width: 120,
          },
          {
            title: '状态',
            dataIndex: 'Ustatus',
            customRender: (text=>{
              if(text==9)
              {
                return '前台显示'
              }else if(text==7)
              {
                return '前台不显示'
              }else if(text==6)
              {
                return '引用'
              }            
            }) 
          },
          {
            title: '职务',
            dataIndex: 'UJOB',
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
          title: '工作手机',
          dataIndex: 'cellphone',
          scopedSlots: { customRender: 'cellphone' },
          // sorter: true,
          // needTotal: true,
          // customRender: (text) => text + ' 次'
          }, 
            {
          title: '家庭手机',
          dataIndex: 'H_cellphone',
          scopedSlots: { customRender: 'H_cellphone' },
          // sorter: true,
          // needTotal: true,
          // customRender: (text) => text + ' 次'
          },         
          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' },
          }
        ], 
        selectedRowKeys: [],
        selectedRows: [],
        showDepListSearch:false,
        Deplists:[],
        seach:[]
      }
    },
  
    methods: {
       handleSortOK(){      
            this.$refs.mytable.refresh();
            this.$refs.mytable.onClearSelected();            
        },
        sortUser(val)
      {      
        if(val!='')
        {       
           this.$refs.SortModal.show(val); 
        }   
        else
        {
           this.$refs.SortModal.show(this.Userlist);          
        }    
      },
        onSearchPhoneUser:_.debounce(function(val){
       const { value} = val.target  
       console.log(value)  
       if(value)
       {
         this.isSearch=true    
         this.queryParam.data=value; 
         this.$refs.mytable.refresh()  
         console.log(this.queryParam);   
       }
       else
       {
         this.isSearch=false
         this.queryParam.data=value
         this.$refs.mytable.refresh()  
       }
      },1000),
        GetUsersList(val)
     {

       console.log(val)
       if(val!='')
       {
         SelectDepslistsbyLike({DPName:val}).then(res=>{
           console.log(res);
          if(res.code==1)
        {
          console.log('在这里')
          return true
          // this.showDepListSearch=true;        
          // this.Deplists=res.res//props 数据到自组建
       
        }
        else if(res.code==-1)
        {         
          return false
        // this.SearchValue=val;
        // this.isSearch=true;
        // console.log(val);
        // this.seach=[]     
        // this.$refs.mytable.refresh()  
        }
        })                         
       }
       else
       {        
         return false   
       }     
    },
         GetUboxToTel(e)
    {
      this.$refs.PhoneModal.get(e)          
    },
        handleEdit (record) {
       console.log(record);
        setTimeout(() => {
            this.$refs.UpdateUserPhonemodal.add(record);  
        }, 100);
        //  setTimeout(() => {
        // this.mdl = Object.assign({}, record)
        //  }, 100);
        // console.log(this.mdl)
        // this.visible = true
      },
      handleSaveClose(){
         this.$refs.mytable.refresh()
      },
      handleSaveOk(){
            console.log('AddOK')        
            this.$refs.mytable.refresh();
        },
      sendsmstwo(IDs){
        console.log(IDs);
        let _obj=new Object();
        _obj.DepartmentName=IDs.DepartmentName;
        _obj.Hcellphone=IDs.H_cellphone;
        _obj.ID=IDs.ID;
        this.$refs.SendsmsModal.get(_obj); 
    },
      sendsms(IDs)
      {
      // let _arr=[]  
       console.log(IDs);    
      this.$refs.SendsmsModal.get(IDs); 
      },
      //调用src/components/page/PageLayout.vue里的方法
        
            
                //  let result=await SelectDepslistsbyLike({DPName:val});
                //  console.log(result.code);               
                //  if(result.code==1)
                //  {
                //    this.showDepListSearch=true;
                //  }
                //  else
                //  {
                //    this.showDepListSearch=false;
                //  }               
                // console.log(this.showDepListSearch);
                // if(val==1)
                // {
                //   this.showDepListSearch=true;
                // }
                // else
                // {
                //   this.showDepListSearch=false;
                // }
            //      let result=await SelectDepslistsbyLike({DPName:val});
            //      console.log(result);
                 
            //     // let isshow=this.GetUsersList(val);
            //     // console.log(isshow);
            // //  this.showDepListSearch=await this.GetUsersList(val)
            //     if(result.code==1)
            //     {
            //       this.showDepListSearch=true
            //     }
            //     else
            //     {
            //       this.showDepListSearch=false;
            //     }
            // console.log(this.showDepListSearch);
            // console.log('999')
            // this.GetUsersList(val)
        
            //  this.GetUsersList(val)

          // this.showDepListSearch=false;
          getDep(val)
          {
            console.log(`到前台页面了`)
            // this.isGetDep=true
            //  this.queryParam.DepID=val.val; 
            //    GetALLByDepID()
           
            console.log(val.val)
            this.isGetDep=true;
            this.showDepListSearch=false    
            this.Deplists.splice(0,this.Deplists.length);     
            this.queryParam.DepID=val.val.DepID
            this.$refs.mytable.refresh() 
          },
        ok(val)
       {
         console.log(val)
         if(val.val=='isnull')
         {              
           console.log(`s zhe li `)
            this.isSearch=true
            this.showDepListSearch=false           
            this.isShow=false    
            this.Deplists.splice(0,this.Deplists.length);         
         }
         else
         {
            console.log(`有数据`)
           
               SelectDepslistsbyLike({DPName:val.val}).then(res=>{
                 console.log(res)
                 if(res.code==1)
                 {
                   console.log(`是个单位`)
                   console.log(res)
                   this.showDepListSearch=true    
                   this.Deplists.splice(0,this.Deplists.length);               
                   res.res.forEach(item => {
                     this.Deplists.push(item)
                   });             
                 }
                 else if(res.code==-1)
                 {
                  console.log(`是个人名`)
                  console.log(val)
                  this.isSearch=true   
                  this.isGetDep=false
                  this.queryParam={}
                  this.queryParam.data=val.val; 
                  this.$refs.mytable.refresh()  
                 }
               })
         }  
          //   if(val)
          // {        
          //   console.log(`回来了`)
          //   console.log(this.showDepListSearch)
          //   console.log(val)
          //     SelectDepslistsbyLike({DPName:val.val}).then(res=>{
          //       console.log(res);
          //         if(res.code==1)
          //       {
          //         console.log(`是单位`)
          //         this.Deplists=res.res               
          //       }
          //       else if(res.code==-1)
          //       {         
          //       this.isSearch=true    
          //       this.queryParam.data=val; 
          //       this.$refs.mytable.refresh()  
          //         console.log(this.queryParam); 
          //         console.log('NoDep')      
          //       }
          //     }) 
          // }
          // else
          // {
          //   this.isSearch=false
          //   //  this.isShow=false;
          //   this.queryParam.data=val
          //   this.$refs.mytable.refresh()  
          // }
                console.log(`GlobalSeach${val}`);        
      },
        onChange (row) {
    
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows
        console.log(this.selectedRowKeys)
        console.log(this.selectedRows)
        

      },
    }
  }
</script>

<style lang="scss" scoped>
  .search-head{
    background-color: #fff;
    margin: -25px -24px -24px;
    .search-input{
      text-align: center;
      margin-bottom: 16px;
    }
  }
  .search-content{
    margin-top: 48px;
  }
</style>