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
   <template slot="expandedRowRender" slot-scope="record" style="margin: 0">
    <a-collapse defaultActiveKey="1" :expandIconPosition="expandIconPosition">
  <!-- {{record}} -->
      <a-collapse-panel :showArrow="false" v-for="(item,index) in record.M_Sub" :header="`${item.meetingSubjectName}`" :key="index">
        <a-icon slot="extra" type="setting" @click="handleCollapsePanelClick" />
         <a-row type="flex" justify="center" align="middle">
          <a-col :span="8">       
            <p class="height-50"><span>议题开始时间：</span></p>
          </a-col>
             <a-col :span="8">       
            <p class="height-50"><span>议题结束时间：</span></p>
          </a-col>
           <a-col :span="8">       
            <p class="height-50"><span>汇报单位：</span></p>
          </a-col>      
        </a-row>     
         <a-row type="flex">
             <a-col :span="24">               
        <a-table 
        :columns="submeetingcolumns"
        :dataSource="item.M_Users"
        :rowKey="item.M_Users.meetingPersonID+''"
        >
        <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> 姓名</span>      
        <span slot="action" slot-scope="text, record">   
          <a @click="chele(record)">选择</a>
          <a-divider type="vertical" />     
        </span>
      </a-table>
             </a-col>
         </a-row>
         
      </a-collapse-panel>
      <!-- <a-collapse-panel header="This is panel header with arrow icon" key="1">
        <p>{{text}}</p>
      </a-collapse-panel>
      <a-collapse-panel header="This is panel header with no arrow icon" key="2" :showArrow="false">
        <p>{{text}}</p>
      </a-collapse-panel> -->
    </a-collapse>
      
      </template>
      <template slot="Tel" slot-scope="text">
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
    
      </template> -->
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
   <addmeeting-Modal ref="addmeetingModal" @ok="handleSaveOk" @close="handleSaveClose"/>
</div>
</template>

<script>

    //DeleteUser
  import addmeetingModal from '../modules/meeting/addmeeting'
  import STable from '@/components/table/'
  import { selectmeetingByDepID} from '@/api/manage'
  export default {
    name: "PersonList",
    components: {
        STable,
        addmeetingModal
   },
    data () {
      return {
        expandIconPosition:'left',
        loading:false,
        queryParam: {},
        title: '提交失败',
        description: '请核对并修改以下信息后，再重新提交。',
        submeetingcolumns:[
           {
      title: 'ID',
      dataIndex: 'meetingPersonID',
      width: 50,
    },
        {
      title: '参会人员姓名',
      dataIndex: 'users.UserName',
      width: 50,
    },   {
      title: '手机',
      dataIndex: 'users.cellphone',
      width: 50,
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
           console.log(res);
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
        handleCollapsePanelClick(event)
        {
          console.log(event)
        },
        chele(s){
          console.log(s)
        },
        handleSaveClose(){},
        handleSaveOk(){},
        sendsmstwo(){},
        GetUboxToTel(){},
        handleEdit(){},
        onDelete(){},
        onChange(){},
        onSearchPhoneUser(){},
        sendsms(){},
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