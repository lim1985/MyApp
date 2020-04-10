<template>
<div>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-row :gutter="2">
          <a-col :xs="{ span: 24}" :lg="{ span: 8 }" :xl="{span: 8 }" :xxl="{ span: 6}">
            <a-button type="primary" @click="to()" :style="{ fontSize: '18px' }" icon="user-add">新增会议</a-button>     
            <!-- <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="3" v-if="IsSendSms.length" @click="sendsms(selectedRows)"><a-icon type="lock" />发短信</a-menu-item>
                <a-menu-item key="1" @click="sortUser(selectedRows)"><a-icon id="swap-i" type="swap" />排序</a-menu-item>           
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作 <a-icon type="down" />
              </a-button>
            </a-dropdown> -->
          </a-col>
          <!-- <a-col :xs="{ span: 24 }" :lg="{ span: 6, offset: 8 }" :xxl="{ span: 6,offset:12 }" >
            //:span="6" :offset="12"
            <a-input-search placeholder="输入姓名进行检索" style="width:320px" @change="onSearchPhoneUser" />
          </a-col> -->
        </a-row>          
        <!-- <a-button type="primary" @click="sortUser()" :style="{ fontSize: '18px' }"><a-icon id="swap-i" type="swap" />排序</a-button>       -->
        <!-- v-if="selectedRowKeys.length > 0" -->
        <div>    
          <a-row type="flex" justify="center" align="middle">
            <a-col :span="24">       
              <p class="height-50"><span>温馨提示：暂无提示内容。</span></p>
            </a-col>
            <!-- <a-col :span="24"><p class="height-50"><span>温馨提示：通讯录里添加的联系人将会出现在通讯录的主目录。</span></p></a-col> -->     
          </a-row>
        </div>
      </div>
      <!-- table -->
  
    <s-table     
      ref="mytable"
      size="default"
      :loading="loading"
      :columns="columns"
      :rowKey="loadData=>loadData.meetingID"
      :data="loadData"
      :showAlertInfo="false"
      @onSelect="onChange"
    
    >
    <!-- <div slot="expandedRowRender" slot-scope="record" style="margin: 10">
      {{record.M_Sub}}
    </div> -->
  <template slot="expandedRowRender"  slot-scope="record,index" style="margin: 0">
        <a-collapse defaultActiveKey="1" @change="abc(index)" accordion>
          <a-collapse-panel :showArrow="true" v-for="(item,index) in record.M_Sub" :header="`${item.meetingSubjectName}`" :key="index">                
            <a-row type="flex" justify="center" align="middle">
              <a-col :span="8">               
                <p class="height-50"><span><b>议题开始时间：</b>{{initTime(item.startTime,'HH:mm')}}</span></p>
              </a-col>
                <a-col :span="8">       
                <p class="height-50"><span><b>议题结束时间：：</b>{{initTime(item.endTime,'HH:mm')}}</span></p>
              </a-col>
              <a-col :span="8">       
                <p class="height-50"><span><b>汇报单位：</b>{{!item.M_Dep?'':item.M_Dep.Abbreviation}}</span></p>
              </a-col>      
            </a-row>    
              <a-row type="flex">
              <a-col :span="8">  
                <a-button type="primary" @click="addsubmeetingUser(item.meetingSubjectID)" :style="{ fontSize: '14px' }" icon="user-add">添加议题参加人员</a-button>                 
              </a-col>
              </a-row> 
            <a-row type="flex">
              <a-col :span="24">              
                  <a-table 
                    :columns="submeetingcolumns"
                    :dataSource="item.M_Users"
                    :rowKey="getRowkey"
                    size="middle"
                    >        
                    <template slot="F_UserName" slot-scope="scope">
                      {{ scope|F_getUserName }} 
                    </template>
                    <template slot="cellphone" slot-scope="text,record">
                      <a-divider type="vertical" />
                      <a-dropdown v-show="text">
                        <a class="ant-dropdown-link">
                          {{ text }} <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                          <!-- v-if="IsSendSms.length" -->
                          <a-menu-item> 
                            <a @click="sendsms(record)">发短信</a>
                          </a-menu-item>
                          <!-- <a-menu-item>
                            <a @click="GetUboxToTel(text)">打电话</a>
                          </a-menu-item>            -->
                        </a-menu>
                      </a-dropdown>      
                    </template>
                    <!-- :rowKey="M_Users=>M_Users.meetingPersonID" -->          
                    <!-- <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
                    <span slot="customTitle"><a-icon type="smile-o" /> 姓名</span>  -->    
                    <span slot="subMeetUseraction" slot-scope="text, record">   
                      <!-- <a @click="removeMeetUser(record)">移除</a> -->
                      <a-popconfirm         
                        title="确定要移除当前姓名或组吗?"
                        @confirm="()=> removeMeetUser(record)"
                      >
                        <a href="javascript:;">移除</a>
                      </a-popconfirm>
                      <a-divider type="vertical" />     
                    </span> 
                  </a-table>
                </a-col>
              </a-row>          
            </a-collapse-panel>  
          </a-collapse>        
        </template>
        <!-- <template slot="Tel" slot-scope="text">
          <a>{{ text }}</a>
        </template>
        <template slot="cellphone" slot-scope="text">
          <a-divider type="vertical" />
          <a-dropdown v-show="text">
            <a class="ant-dropdown-link">
              {{ text }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="IsSendSms.length">
                <a >发短信</a>
              </a-menu-item>
              <a-menu-item>
                <a >打电话</a>
              </a-menu-item>           
            </a-menu>
          </a-dropdown>      
        </template>
        <template slot="H_cellphone" slot-scope="text">
          <a-divider type="vertical" />
          <a-dropdown v-show="text">
            <a class="ant-dropdown-link">
              {{ text }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-if="IsSendSms.length">
                <a  >发短信</a>
              </a-menu-item>
              <a-menu-item>
                <a  >打电话</a>
              </a-menu-item>
          
            </a-menu>
          </a-dropdown>
      
        </template>  -->
        <!-- 7是前台不可见状态，9为前台可见状态 -->
        <span slot="action" slot-scope="text, record">
          <a v-show="record.Ustatus==9 || record.Ustatus==7 || record.Ustatus==8" @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              操作 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="addNewSubmeeting(record)">添加议题</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:alert('该功能尚未完成');">详情</a>
              </a-menu-item>
              <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7 || record.Ustatus==8">
                <a href="javascript:alert('该功能尚未完成');">禁用</a>
              </a-menu-item>
              <a-menu-item v-show="record.Ustatus==9 || record.Ustatus==7|| record.Ustatus==6 || record.Ustatus==8">
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
      <!-- table end -->    
    </a-card>
    <!-- <a-tabs @change="callback" :defaultActiveKey="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon :style="{ fontSize: '22px' }" theme="twoTone" twoToneColor="#eb2f96" type="close-circle" />
          待修改
        </span>
        <a-table
          ref="mytable"
          :columns="columns"
          :dataSource="data"
          :pagination="{ pageSize:15 }"
          :scroll="{ y: 680 }"
          :rowKey="record => record.EID"
        >
          <span slot="action" slot-scope="text, record">
            <a @click="EditError(record)">编辑</a>
            <a-divider type="vertical" />           
          </span>
        </a-table>  
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon :style="{ fontSize: '22px' }" theme="twoTone" twoToneColor="#52c41a" type="check-circle" />
          已修改
        </span>
        <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="{ pageSize: 15 }"
          :scroll="{ y: 680 }"
          :rowKey="record => record.EID"
        >       
      </a-table>
    </a-tab-pane>
  </a-tabs> -->
    <SendsmsModal ref="SendsmsModal" :Pupuarr="Pupu" @ok="handleSaveOk" @close="handleSaveClose"/>
    <addsubmeeting-Modal ref="addsubmeetingModal" @ok="handleSaveOk" @close="handleSaveClose"/>
    <addmeeting-Modal ref="addmeetingModal" @ok="handleSaveOk" @close="handleSaveClose"/>
    <addsubmeetingUser-Modal ref="addsubmeetingUserModal" @ok="handleSaveOk" @close="handleSaveClose"/>
  </div>
</template>

<script>

    //DeleteUser
  import addsubmeetingModal from '../modules/meeting/addsubmeeting'
  import addmeetingModal from '../modules/meeting/addmeeting'
  import addsubmeetingUserModal from '../modules/meeting/addsubmeetUser'
  import SendsmsModal from '../modules/sendSMS/sendsms'
  import STable from '@/components/table/'
  import { selectmeetingByDepID,removeSubmeetingUser,selectmeetSubUsers,FindAllUserByGroupID} from '@/api/manage'//SelectDepartmentByID
  export default {
    name: "PersonList",
    components: {
        STable,
        SendsmsModal,
        addmeetingModal,
        addsubmeetingUserModal,
        addsubmeetingModal
   },
    data () {
      return {
        userArr:[],
        Pupu:[],
        meetingUserList:[],
        expandIconPosition:'left',
        loading:false,
        queryParam: {},
        title: '提交失败',
        description: '请核对并修改以下信息后，再重新提交。',
        submeetingcolumns:[ 
          // {
          //   title:'参会人员姓名/组',
          //   dataIndex:'Group.GroupName'?'users.UserName':'Group.GroupName'}, 
          //   width: 100,
          // },
         
          //   {
          // title: '参会人员姓名/组',
          // dataIndex: 'meetingUser',
          // width: 80,
          //  },  
          {
            title:'参会人员姓名/组',         
            width:80,
              scopedSlots: { customRender: 'F_UserName' },

          },
        // {
        //   title: '参会人员组',
        //   dataIndex: 'Group.GroupName',
        //   width: 80,
        // },  
        // {
        //   title: '参会人员姓名',
        //   dataIndex: 'users.UserName',
        //   width: 80,
        // },  
        {
        title: '参会人员类型',
        dataIndex: 'meetingPersonType',
        width: 80,
      },      
    {
      title: '手机',
      dataIndex: 'users.cellphone',
      scopedSlots: { customRender: 'cellphone' },
      width: 80,
    },  {
      title: '职务',
      dataIndex: 'users.UJOB',
      width: 140,
    },
     {
       title: '操作',
       key: 'action',
       width: 40,
      scopedSlots: { customRender: 'subMeetUseraction' },
    },
    
        ],
    columns:[
    // {
    //   title: 'ID',
    //   dataIndex: 'ID',
    //   width: 50,
    // },
    {
      title: 'ID',
      dataIndex: 'meetingID',
      width: 50,
    },
    {
      title: '会议名称',
      dataIndex: 'meetingName',
      width: 200,
    },
  {
      title: '会议类型',
      dataIndex: 'meetingType',
      width: 120,
    },
 {
      title: '会议室',
      dataIndex: 'room',
      width: 120,
    },
   {
      title: '会务人员',
      dataIndex: 'meetingMan',
      // scopedSlots: { customRender: 'cellphone' },
      width: 100,
    },
   
   
     {
      title: '开始时间',
      dataIndex: 'startTime',
       width: 180,
       customRender:(text=>{
         return this.$moment(text).format('YYYY-MM-DD HH:mm:ss');
       })
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
       width: 180,
       customRender:(text=>{
         return this.$moment(text).format('YYYY-MM-DD HH:mm:ss');
       })
    },
     {
       title: '操作',
       key: 'action',
       width: 100,
      scopedSlots: { customRender: 'action' },
    },
  ],
        data:[],
        IsSendSms:false,
        loadData:async parameter => { 
        let s=this.$route.fullPath.split('/')[3]
        this.queryParam.DepID=s  
        console.log(parameter)
         return selectmeetingByDepID(Object.assign(parameter,this.queryParam)).then(res=>{
           console.log(res.result)
          //    this.Pupu=data.data.map(item=>{         
          //    return {DepID:item.Department_ID,Phone:item.cellphone,username:item.UserName,DPname:item.DepartmentName,ID:item.ID,UJOB:item.UJOB,checked:false}
          //  })     
           return res.result
            // let data= res.result  
          //  if(res.code==-1)
          //  {
          //    this.$message.error(res.msg)
          //  }
          //  else
          //  {
          //     let data=res.result
          //     console.log(data)
          //     return data
          //  }
          
           
          //  console.log(res.result.rows[0].PersonList);

         })
     
        // let _result=await selectByJdId({jdid:s});  
        // console.log(_result.result.rows[0].PersonList) 
        },
       
      }
    },
    filters:{
       F_getUserName:function(value)
       {
         return !value.users?value.Group.GroupName:value.users.UserName       
       }
    },
      watch: {
    '$route'()
    {        
      console.log(this.$route)
     
      let depID=this.$route.path.split('/')[2];
      this.queryParam.jdid=depID 

      // this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);     
      this.$refs.mytable.refresh()     
    }
  },
   async mounted(){   
      this.loading=false;
    },
      methods: {
        abc(k,index){
            console.log(index)
            console.log(k)
            console.log(k[index])
        },
        openExpande(record){
          console.log(record)
        },
        openPanel(key,record){
          console.log(key)
             console.log(record)
        },
        initPupu(arr)
        {
          let result=new Promise(async resolve=>{
            let _arr=[]
            for(let x =0;x<arr.length;x++)
            {
                console.log(arr[x]['M_Users.meetingPersonGroupID'])
                if(arr[x]['M_Users.meetingPersonGroupID'])
                {
                   let resultlist=await FindAllUserByGroupID({GroupID:arr[x]['M_Users.meetingPersonGroupID']})
                           resultlist.result.data.forEach(s => {
                           _arr.push(s)
                });   
                }
                else
                {
                    _arr.push(arr[x])
                }
            }
                 resolve(_arr)
          })
              result.then(res=>{
              
                  this.Pupu= res.map(item=>{
           return {
               DepID:item.Department_ID,
               Phone:item.cellphone,
               username:item.UserName,
               DPname:item.DepartmentName,
               ID:item.ID,
               UJOB:item.UJOB,
               checked:false
           }
        })
                // res.forEach(e => {
                //   console.log(e)
                // });              
              })
                console.log(this.Pupu)
   
    
        },
       async sendsms(IDs)
      {
  
       console.log(IDs);      
      let userList =await selectmeetSubUsers({m_submeetID:IDs.meetingSubjectID})
      console.log(userList);
      
      this.initPupu(userList.result);
         
        
        //  this.userArr.forEach(s => {
        //    console.log(s)
        // });          
      //       userList.result.forEach(async v => {      
           
      //     if(v['M_Users.meetingPersonGroupID'])
      //     {           
      //       let groupUserlist=await FindAllUserByGroupID({GroupID:v['M_Users.meetingPersonGroupID']})
      //       console.log(groupUserlist)
      //       // _UserlistArr.push(groupUserlist.result.data)           
      //        groupUserlist.result.data.forEach(s => {
      //          _UserlistArr.push(s)
      //       });
      //     }
      //     else
      //     {         
      //       _UserlistArr.push(v)
      //     }
      // });
     
  
      //  _UserlistArr.map(item=>{
      //      console.log(item)
      //     //  return {
      //     //      DepID:item.Department_ID,
      //     //      Phone:item.cellphone,
      //     //      username:item.UserName,
      //     //      DPname:item.DepartmentName,
      //     //      ID:item.ID,
      //     //      UJOB:item.UJOB,
      //     //      checked:false
      //     //  }
      //    })
      // _UserlistArr.forEach(v => {
      //      console.log(v)
      // });
      // console.log(_UserlistArr)
      // console.log(IDs.users)
      console.log(this.Pupu)
        // if(v.M_Users.meetingPersonGroupID)
        // {
        //   console.log(v)
        // }
        // if(!v['M_Users.meetingPersonGroupID'])
        // {
        //   console.log(v)
        //   console.log(v['M_Users.meetingPersonGroupID'])
        //   console.log(`有组ID的情况下`)
        // }
        
    
        //  let groupUserlist=await FindAllUserByGroupID()
        //  this.Pupu=userList.result.map(item=>{         
        //      return {
        //        DepID:item['M_Users.users.Department_ID'],
        //        Phone:item['M_Users.users.cellphone'],
        //        username:item['M_Users.users.UserName'],
        //        DPname:item.DepartmentName,
        //        ID:item['M_Users.users.ID'],
        //        UJOB:item['M_Users.users.UJOB'],
        //        checked:false
        //      }
        //    })       
          //  console.log(this.Pupu)
      //   let _obj=new Object();
      //  _obj.DepartmentName=IDs.DepartmentName;
      //  _obj.cellphone=IDs.cellphone;
      //  _obj.ID=IDs.ID;
          this.$refs.SendsmsModal.get([IDs.users]); 
      },
        // async selectDepInfoByDepID(DepID)
        // {
        //   let result =await SelectDepartmentByID({ID:DepID})
        //   console.log(result)
        // },
        addNewSubmeeting(record){
          console.log(record)
         setTimeout(() => {
            this.$refs.addsubmeetingModal.set(record);  
        }, 200);
        },
        handleClick(){},
        async removeMeetUser(record)
        {
          console.log(record)
           let res=await removeSubmeetingUser(record)
           console.log(res)
           this.$refs.mytable.refresh() 
        },
        getRowkey(item){        
          return item.meetingPersonID
        },
        addsubmeetingUser(ID){
      setTimeout(() => {
                this.$refs.addsubmeetingUserModal.set(ID);  
            }, 200);
          // set
          //   this.$refs.mytable.refresh()   
        },
        initTime(data,format)
        {       
          return  !data?'':this.$moment(data).format(format);
        },
        handleCollapsePanelClick(event)
        {
          console.log(event)
        },
        chele(s){
          console.log(s)
        },
        handleSaveClose(){},
        handleSaveOk(){
          let _this=this
          _this.$refs.mytable.refresh()  
        },
        sendsmstwo(){},
        GetUboxToTel(){},
        handleEdit(){},
        onDelete(){},
        onChange(){},
        onSearchPhoneUser(){},
       
        sortUser(){},
        addphone()
        {
          console.log('11111')
        },
        callback(){
          console.log(`11`)
        },
      async to(){
        
          setTimeout(() => {
            this.$refs.addmeetingModal.set();  
        }, 200);
    
      },
      }

  }
</script>

<style scoped>

</style>