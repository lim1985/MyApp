<template>
  <div class="search-content">   
    <!-- <router-view/>  -->
    
    <a-tabs @change="callback" :defaultActiveKey="1">
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
            <!-- <a href="javascript:;">Delete</a>
            <a-divider type="vertical" />
            <a href="javascript:;" class="ant-dropdown-link"> More actions <a-icon type="down" /> </a> -->
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
          <!-- :rowKey="record => record.ID" -->
          <!-- <span slot="action" slot-scope="text, record">
            <a @click="EditError(record)">编辑</a>
            <a-divider type="vertical" /> -->
          <!-- <a href="javascript:;">Delete</a>
            <a-divider type="vertical" />
            <a href="javascript:;" class="ant-dropdown-link"> More actions <a-icon type="down" /> </a> -->
          <!-- </span> -->
        </a-table>
      </a-tab-pane>
    </a-tabs>
    <UpdateUserModal ref="UpdateUserPhonemodal" @ok="handleSaveOk" @close="handleSaveClose"/>
  </div>
</template>

<script>

 const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'ID',
    //   width: 50,
    // },
    {
      title: 'EID',
      dataIndex: 'EID',
      width: 50,
    },
    {
      title: '联系人姓名',
      dataIndex: 'UserName',
      width: 70,
    },
      {
      title: '职务',
      dataIndex: 'UJOB',
      width: 80,
    },
    {
      title: '错误信息',
      dataIndex: 'Errorinformation',
       width: 340,
    },
    
     {
      title: '提交人员',
      dataIndex: 'AdminName',
       width: 130,
    },
     {
      title: '提交时间',
      dataIndex: 'InputTime',
       width: 130,
    },
     {
       title: '操作',
       key: 'action',
       width: 100,
      scopedSlots: { customRender: 'action' },
    },
  ];

  const data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //    DateTime:`2019-11-20 15：59：30`
  //   });
  // }
 import UpdateUserModal from '@views/list/modules/UserPhone/UpdateUserPhone'
 import { selectErrorInfo ,UpdateErrorInfo} from '@/api/manage'
  export default {
    name:"JiucuoLayout",
    data () {
      return {
        data,
        columns,
  
        // tabs: {
        //   items: [
        //     {
        //       key: '1',
        //       title: '待修改'
        //     },
        //     {
        //       key: '2',
        //       title: '已经修改'
        //     },
         
        //   ],
        //   active: () => {
        //     switch (this.$route.path) {
        //       case '/list/search/article':
        //         return '1'
        //       case '/list/search/project':
        //         return '2'
        //       case '/list/search/application':
        //         return '3'
        //       default:
        //         return '2'
        //     }
        //   },
        //   callback: (key) => {
        //     switch (key) {
        //       case '1':
        //         this.$router.push('/list/search/article')
        //         break
        //       case '2':
        //         this.$router.push('/list/search/project')
        //         break
        //       case '3':
        //         this.$router.push('/list/search/application')
        //         break
        //       default:
        //         this.$router.push('/workplace')
        //     }
        //   }
        // },
        search: false
      }
    },
     components: {
      UpdateUserModal,
     
    },
    computed: {
    },
    mounted(){
     this.callback(1);
    },
    methods: {
      async EditError(record){
        console.log(record)
          setTimeout(() => {
            this.$refs.UpdateUserPhonemodal.add(record);  
        }, 200);
    
      },
      async callback(key){
          console.log(key)
          if(key==1)
          {
          
            let result=await selectErrorInfo({status:0});
            console.log(result);
            this.data=  result.result.rows.map((item)=>{
                return {
                Department_ID:item.Department_ID,                
                Permission_Key:item.Permission_Key,
                BirthDay:item.BirthDay,
                InputTime:item.InputTime,
                EID:item.ID,
                UserName:item.UserName,
                AdminName:item.AdminName,
                Errorinformation:item.Errorinformation,
                UJOB:item.UJOB,
                ID:item.UserID,
                cellphone:item.cellphone,
                H_Tel:item.H_Tel,
                H_cellphone:item.H_cellphone,              
                QQ:item.QQ,
                Sex:item.Sex,
                Email:item.Email,
                Ustatus:item.status,
                Tel:item.Tel,
                avatar:item.avatar,
                }
             
            })
          
          }
          else
          {
           let result=await selectErrorInfo({status:1});
            console.log(result);
            this.data=  result.result.rows.map((item)=>{
                return {
                Department_ID:item.Department_ID,                
                Permission_Key:item.Permission_Key,
                BirthDay:item.BirthDay,
                InputTime:item.InputTime,
                EID:item.ID,
                UserName:item.UserName,
                AdminName:item.AdminName,
                Errorinformation:item.Errorinformation,
                UJOB:item.UJOB,
                ID:item.UserID,
                cellphone:item.cellphone,
                H_Tel:item.H_Tel,
                H_cellphone:item.H_cellphone,              
                QQ:item.QQ,
                Sex:item.Sex,
                Email:item.Email,
                Ustatus:item.status,
                Tel:item.Tel,
                avatar:item.avatar,
                }
             
            })
          }
          // BirthDay:null
          // DepKeylist:Array(2)
          // 0:"QW"
          // 1:152       
          // Email:""
          // H_Tel:null
          // H_cellphone:null
          // ID:1846
          // QQ:null
          // Sex:1
          // Tel:"5359001"
          // UJOB:null
          // UserName:"总值班室"
          // avatar:null
          // cellphone:"5398106"
          // status:9
            console.log(this.data)
        },
            ok(val){
                console.log(`GlobalSeach+${val}`);
            },
        handleSaveClose(){
          this.callback(1);
      },
    async handleSaveOk(val){
            console.log(val)
          let param={
              ID:val,
              status:1
            }
            const result = await UpdateErrorInfo(param)
            console.log(result)   
            if(result.result.code==1)
            {
              const dataSource = [...this.data];
              this.data = dataSource.filter(item => item.EID !== val);
            
            }     
          //  this.callback(1);
        },
    }
  }
</script>

<style lang="scss" scoped>

  .icons-list >>> .anticon {
    margin-right: 6px;
    font-size: 24px;
  }

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
      margin: -15px -14px -14px;
    background-color: #fff;
  }
</style>