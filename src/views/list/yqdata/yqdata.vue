<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-row :gutter="2">
        <a-col :xs="{ span: 24}" :lg="{ span: 8 }" :xl="{span: 8 }" :xxl="{ span: 6}">
          <a-button type="primary" @click="addphone()" :style="{ fontSize: '18px' }" icon="user-add">添加</a-button>     
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
    <!-- table -->
 
    <s-table     
      ref="mytable"
      size="default"
      :loading="loading"
      :columns="columns"
      :rowKey="loadData=>loadData.ReportId"
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
        <a v-show="record.Ustatus==9 || record.Ustatus==7 || record.Ustatus==8" @click="handleEdit(record)">编辑</a>
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
</template>

<script>

    //DeleteUser
  import STable from '@/components/table/'
  import { selectByJdId } from '@/api/manage'
  export default {
    name: "PersonList",
    components: {
        STable
   },
    data () {
      return {
        loading:false,
        queryParam: {},
        title: '提交失败',
        description: '请核对并修改以下信息后，再重新提交。',
    columns:[
    // {
    //   title: 'ID',
    //   dataIndex: 'ID',
    //   width: 50,
    // },
    {
      title: 'ID',
      dataIndex: 'ReportId',
      width: 50,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 70,
    },


   {
      title: '手机',
      dataIndex: 'tel',
      scopedSlots: { customRender: 'cellphone' },
      width: 120,
    },
     {
      title: '性别',
      dataIndex: 'sex',
        customRender: (text=>{       
          return text===true?'男':'女'
      }) ,
      width: 50,
    },
      {
      title: '身份证',
      dataIndex: 'idcard',
      width: 80,
    },
    
     {
      title: '社区/村',
      dataIndex: 'CunSheQu',
       width: 100,
    },
    {
      title: '居住情况',
      dataIndex: 'juzhuType',
       width: 120,
    },
     {
      title: '小区名',
      dataIndex: 'xiaoQu',
       width: 120,
    },
    
    //  {
    //   title: '提交人员',
    //   dataIndex: 'AdminName',
    //    width: 130,
    // },
     {
      title: '提交时间',
      dataIndex: 'inputTime',
       width: 130,
       customRender:(text=>{
         return this.$moment(text).format('YYYY-MM-DD');
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
        this.queryParam.jdid=s  
        console.log(parameter)
         return selectByJdId(Object.assign(parameter,this.queryParam)).then(res=>{
           console.log(res);
           if(res.code==-1)
           {
             this.$message.error(res.msg)
           }
           else
           {
              let data=res.result
              console.log(data)
              return data
           }
          
           
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
        sendsmstwo(){},
        GetUboxToTel(){},
        handleEdit(){},
        onDelete(){},
        onChange(){},
        onSearchPhoneUser(){},
        sendsms(){},
        sortUser(){},
        addphone()
        {},
        callback(){
          console.log(`11`)
        },
      async EditError(record){
        console.log(record)
        //   setTimeout(() => {
        //     this.$refs.UpdateUserPhonemodal.add(record);  
        // }, 200);
    
      },
      }

  }
</script>

<style scoped>

</style>