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
      <a-row :gutter="2">
        <a-col :xs="{ span: 24}" :lg="{ span: 8 }" :xl="{span: 8 }" :xxl="{ span: 6}"><a-button type="primary" @click="addphone()" :style="{ fontSize: '18px' }" icon="user-add">添加联系人</a-button>     
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="3" @click="sendsms(selectedRows)"><a-icon type="lock" />发短信</a-menu-item>
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
        <a-col :xs="{ span: 24 }" :lg="{ span: 6, offset: 8 }" :xxl="{ span: 6,offset:12 }" >
          <!-- //:span="6" :offset="12" -->
          <a-input-search placeholder="输入姓名进行检索" style="width:320px" @change="onSearchPhoneUser" />
        </a-col>
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
            <a-menu-item>
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
            <a-menu-item>
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
      <span slot="action" slot-scope="text, record">
        <a v-show="record.Ustatus==9 || record.Ustatus==7" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            操作 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <!-- <a-menu-item>
              <a @click="sendsms(record)">发短信</a>
            </a-menu-item> -->
            <a-menu-item>
              <a href="javascript:alert('该功能尚未完成');">详情</a>
            </a-menu-item>
            <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7">
              <a href="javascript:alert('该功能尚未完成');">禁用</a>
            </a-menu-item>
            <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7|| record.Ustatus==6">
              <a-popconfirm
                v-if="loadData.length"
                title="确定删除该联系人么?"
                @confirm="() => onDelete(record)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>
    <user-modal ref="UserPhonemodal" @ok="handleSaveOk" @close="handleSaveClose"/>
    <UpdateUserModal ref="UpdateUserPhonemodal" @ok="handleSaveOk" @close="handleSaveClose"/>
    <SendsmsModal ref="SendsmsModal" :Pupuarr="Pupu" @ok="handleSaveOk" @close="handleSaveClose"/>
    <PhoneModal ref="PhoneModal"/>
    <SortModal ref="SortModal" @ok="handleSortOK"/>
  </a-card>
</template>

<script>

  import STable from '@/components/table/'
  import ATextarea from "ant-design-vue/es/input/TextArea"
  import AInput from "ant-design-vue/es/input/Input"
  import { mapState} from 'vuex'
  import _ from 'lodash'
  import {GetALLByDepID,AddPhoneUser,DeleteUser,ReferenceDelete,SelectDepByID,GetUserInformationByUserNameLIke} from '@/api/manage'
  import UserModal from './modules/UserPhone/addUserPhone'
  import UpdateUserModal from './modules/UserPhone/UpdateUserPhone'
  import SendsmsModal from './modules/sendSMS/sendsms'
  import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'
  import SortModal from '@/views/list/modules/UserSort/userSort'
  export default {
    name: "TableList",
    components: {
      SortModal,
      PhoneModal,
      AInput,
      ATextarea,
      STable,
      UserModal,
      UpdateUserModal,
      SendsmsModal  
    },
    computed:{
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY
      })    
    },
    data () {
      return {    
        Search:false,
        Userlist:[],
        loading:false,
        sDepID:'',
        initLoaddata:[],
        key:'',
        Sex:1,
        Pupu:[],
        datas:{},
        DepName:[],
        PhoneVisible:false,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        form: null,
        UseAddform:null,
        mdl: {},
        Mymdl:{},
        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
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
       loadData:async parameter => {                 
                
        let s=this.$route.fullPath.split('/')[3]
        this.queryParam.DepID=s  
        let _Key=await SelectDepByID({ID:s});
        let _array=[]
        if(_Key.code==1)
        {         
          _array.push(_Key.result.Permission_Key);
          _array.push(_Key.result.DepartmentId)
        }
      localStorage.setItem('DepKeylist',_array);
        if(this.isSearch)
        {
          console.log(this.queryParam);
          return GetUserInformationByUserNameLIke(Object.assign(parameter,this.queryParam))
          .then(res=>{
            console.log(res);
            if(res.code==-1)
            {
             this.$message.error('没有找到该联系人！请重试')
             this.isSearch=false;
             this.$refs.mytable.refresh()  
            }
            else
            {

            let data= res.res
               data.data.forEach(v => { 
                if(v['ResferecDep.LIM_ResferenceAndDep.status']==-1)
                {     
                 if(v.status ==6)
                 {
                   v.Department_ID=this.$route.fullPath.split('/')[3]        
                   v.Ustatus=v.status
                 }                     
                   v.Ustatus=v.status
                            
                }
            });   
            return data
            }          
          })        
        }
       

        return GetALLByDepID(Object.assign(parameter,this.queryParam))
            .then(res => {                 
            let data= res.result    
            
            console.log(data);
            data.data.forEach(v => { 
                if(v.Rstatus==6)
                {     
                   v.Department_ID=this.$route.fullPath.split('/')[3]        
                   v.Ustatus=v.Rstatus                 
                }
            });          
          
           this.Pupu=data.data.map(item=>{
             return {Phone:item.cellphone,username:item.UserName,DPname:item.DepartmentName,ID:item.ID,UJOB:item.UJOB,checked:false}
           })              
           this.Userlist=data.data
           console.log(this.$route);
           console.log(data)
           this.allRows=data;
           return data
         })           
        },
        options:[],
        onclick:false,
        selectedRowKeys: [],
        selectedRows: [],
        allRows:[]
      }
    },
    created () {
         
        //  this.depID=
         console.log()
        // getRoleList({ t: new Date()})     
        // GetPermissioninfobyKey({key:'qw'}).then(res=>{
        // console.log(res)
        //  })
    },
    async mounted(){   
      // this.options=await this.GetDepnameAndchild();
    },
    methods: {


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
      // onSearchPhoneUser : this.$debounce (function (val){
      //   console.log(val)
      // },500),
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
       GetUboxToTel(e)
    {
      this.$refs.PhoneModal.get(e)          
    },
      onDelete (data) {
        console.log(data)
        if(data.Rstatus==6)
        {
          this.loading=true;
          let params={
            Department_ID:this.queryParam.DepID,
            ID:data.ID
          }
          ReferenceDelete(params)
          .then(res=>{
            return res
          }).then((r)=>{
            if(r.code==1)
            {
              setTimeout(() => {
                this.loading=false
                this.$message.success(r.msg)
              }, 1000);
            }
            else
            {
             setTimeout(() => {            
              this.$message.error('删除失败'); 
            }, 1000);    
            }
          })
          console.log('删除引用的人')
        }
        else
        {
          console.log('删除本单位的人')
          this.loading=true;
          DeleteUser(data).then(res=>{
            if(res.code==1)
            {
              setTimeout(() => {
              this.loading=false;
              this.$message.success(res.msg); 
            }, 1000);    
            }
            else
            {
              setTimeout(() => {            
              this.$message.error(res.msg); 
            }, 1000);  
            }
            console.log(res)
          })            
        }
        this.$refs.mytable.refresh()
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
      
      //   let _obj=new Object();
      //  _obj.DepartmentName=IDs.DepartmentName;
      //  _obj.cellphone=IDs.cellphone;
      //  _obj.ID=IDs.ID;
      this.$refs.SendsmsModal.get(IDs); 
      },
      handleSaveClose(){
            this.$refs.mytable.refresh()
      },
      handleSaveOk(){
            console.log('AddOK')        
            this.$refs.mytable.refresh();
        },
       handleSortOK(){
        console.log('sortOK')
        
            this.$refs.mytable.refresh();
            this.$refs.mytable.onClearSelected();            
        },
    filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      return value;
    }, 
       HandleUserPhoneAdd(e)
        {
        this.Mymdl.Sex=this.Sex
       
        e.preventDefault()
            // console.log(this.Mymdl)
        this.UseAddform.validateFields(async(err, values) => {
          if (!err) {
          const res=await AddPhoneUser(this.Mymdl)
        
          if(res.code==-1)
          {            
             this.$message.error('该号码已被使用，请重新输入！');                    
          }else if(res.code==-2)
          {
             this.$message.error('添加联系人失败，请和管理员联系！');  
          }
          else
          {                     
            setTimeout(() => {
            
              this.$message.success('添加人员成功。'); 
              this.$refs.mytable.refresh()
              this.PhoneVisible = false    
            }, 100);                            
          }
          
            console.log('Received values of form: ', values)
          }
        })             
        },
      async addphone()
        { 
          this.$refs.UserPhonemodal.add();                 
            // this.PhoneVisible = true  
            // this.$nextTick(()=>{
            // this.UseAddform.resetFields() 
            // })
        },
      handleEdit (record) {
       
        setTimeout(() => {
            this.$refs.UpdateUserPhonemodal.add(record);  
        }, 100);
        //  setTimeout(() => {
        // this.mdl = Object.assign({}, record)
        //  }, 100);
        // console.log(this.mdl)
        // this.visible = true
      },
      handleOk () {

      },
      onChange (row) {
    
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows
        console.log(this.selectedRowKeys)
        console.log(this.selectedRows)
        

      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      }      
    },
  watch: {
    '$route'()
    {        
      console.log(this.$route.meta)
      this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);     
      this.$refs.mytable.refresh()     
    }
  //  'S_DEPKEY':'initLoadDate'
        // S_DEPKEY(val){

        //   this.key=val;
        //   console.log(`+++++++++++++++++++`)         
        //   this.queryParam.key=this.key
        //   console.log(this.queryParam)

   
        //   console.log('数据变化了')
        
        // }
             //   return AllPhoneUser(Object.assign(parameter, this.queryParam))
        //     .then(res => {
        //       console.log(res.result.data)
        //       return res.result
        //     })
        // },
        //     '$route' (to) {
        //       console.log(to)
        //         this.$router.go(0);
  
// },
  // '$route':'Getparams'
    // '$route' (to,from ) {
    //       this.$router.push({
    //           path:'/list/UserPhonelist/'+this.$route.meta.permission[0]    
    //   })
    //       console.log(from)
    // }
    
},


 

  }
</script>
<style scoped>
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
</style>

  
