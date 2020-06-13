<template>
  <div class="search-content">   
    <!-- <router-view/>  -->
    
    
    <a-table
      :loading="isloading"
      ref="PhoneRecordtable"
      :columns="columns"
      :dataSource="data"
      :pagination="{ pageSize:20 }"
      :scroll="{ y: 680 }"
      :rowKey="data => data.ID"
    >
      <template slot="Tel" slot-scope="text">
        <a @click="GetUboxToTel(text)">{{ text }}</a>
      </template>
      <template slot="F_recordTime" slot-scope="text">
        {{ text|F_formatTime }} 
      </template>
      <template slot="status" slot-scope="text">       
        <span style="color:#67C23A" v-if="text==1">去电</span>
        <span style="color:#67C23A" v-if="text==2">来电</span>
        <span style="color:#F56C6C" v-if="text==3">未接来电</span>
      </template>
      
      <span slot="action" slot-scope="text, record">
        <!-- <a @click="hearRecord(record)">重发</a> -->
        <a v-if="record.recordUrl" :href="'http://127.0.0.1:8808/'+record.recordUrl" target="_blank">听录音</a>
        <a-divider type="vertical" />
        <!-- <a href="javascript:;">Delete</a>
        <a-divider type="vertical" />
        <a href="javascript:;" class="ant-dropdown-link"> More actions <a-icon type="down" /> </a> -->
      </span>
    </a-table>  
    <PhoneModal ref="PhoneModal"/>
    <!-- <UpdateUserModal ref="UpdateUserPhonemodal" @ok="handleSaveOk" @close="handleSaveClose"/> -->
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
      title: 'ID',
      dataIndex: 'ID',
      width: 50,
    },
     {
      title: '单位名称',
      dataIndex: 'DPname',
      width: 160,
    }, 
    {
      title: '联系人',
      dataIndex: 'UserName',
      width: 100,
    },
       
    //   {
    //   title: '组ID',
    //   dataIndex: 'TID',
    //   width: 100,
    // },
    {
      title: '来电号码',
      dataIndex: 'PhoneNum',
      width: 200,
      scopedSlots: { customRender: 'Tel' },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width:100,
      scopedSlots: { customRender: 'status' },
        //  customRender: (text=>{
        //    if(text==1)
        //    {
        //      return '去电'
        //    }
        //    else if(text==2)
        //    {
        //      return '来电'
        //    }else if(text==3)
        //    {
        //      return '未接来电'
        //    }
        //  })
    },
    
     {
      title: '时间',
      dataIndex: 'Intime',
      width: 160,
      scopedSlots: { customRender: 'F_recordTime' },
    },   
     {
       title: '录音文件',
       key: 'action',
       width: 120,
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
//  import UpdateUserModal from '@views/list/modules/UserPhone/UpdateUserPhone'
 import { GetRecordList } from '@/api/manage'
 import moment from 'moment'
 import PhoneModal from '@/views/list/modules/PhoneMsg/Phone'
 
//  import { mapState} from 'vuex'
  export default {
    name:"PhonerecordLayout",
     filters:{
       F_formatTime:function(value)
       {
        
            return moment(value).format('YYYY-MM-DD HH:mm:ss') 
        //  return !value.users?value.Group.GroupName:value.users.UserName       
       },
     
    },
    data () {
      return {
        isloading:true,
        key:1,      
        data,
        columns,      
        queryParam:{},       
        search: false,
        DepID:0
        // DepID:0,
      }
    },
     components: {
       PhoneModal
      // UpdateUserModal,
     
    },
   watch: {
    $route(to){
    this.DepID=to.path.split('/')[3]     
    // this.callback();
  }
    //  '$route':'getDepID'
  //     $route: {
  //     handler: function(val, oldVal)
  //     {
  //       console.log(val.fullPath);
  //       console.log(oldVal.fullPath);
  //     },
  //   // 深度观察监听
  //   deep: true
  // }
    //  '$route'()
    //  {
    //    console.log(this.$route.path.split('/')[3])
    //  }
    //    $route: {          
    //       handler() {
    //            console.log(this.$route.path.split('/')[3])
    //            this.$store.commit('SET_DepId',this.$route.path.split('/')[3])   
    //         // console.log(this.$route)
    //           // this.id = this.$route.query.id;
    //           // this.getDetail();
    //           //深度监听，同时也可监听到param参数变化
    //     },
    //     deep: true,
    // },
        // DepID:{
        //     handler()
        //     {
        //         console.log(this.DepId)          
        //     }
        // }
    // '$route'(val)
    // {        
    //   console.log(val)
    //   console.log(this.$route)     
    //   let depID=this.$route.path.split('/')[3];
    //   this.queryParam.DepID=depID 
    //   console.log(this.queryParam)
    //   this.callback(this.queryParam);
    //   // this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);     
    //   // this.$refs.mytable.refresh()     
    // }
  },
    computed: {
      //   ...mapState({
      //   DepID:state=>state.user.DepId,
      //   // IsSendSms:state=>state.user.SendSmsList        
      // })   
    },
    mounted(){
      
      console.log(this.$route.path)
      this.DepID=this.$route.path.split('/')[3]
      // this.callback(1);
      this.GetRecordList(this.DepID)
      //  console.log(this.$route.path.split('/')[3])
      // // console.log(this.DepID);
      //  this.callback(this.$route.path.split('/')[3])
      
      
    },
    methods: {
        GetUboxToTel(e)
      {
        this.$refs.PhoneModal.get(e)          
      },
      async GetRecordList(DEPID)
      {
         let result=await GetRecordList({DepID:DEPID})
         console.log(result)
             if(result.code==1)
            {
          this.data=result.res.rows.map((item)=>{
            return {
              ID:item.ID,
              UserName:item.UserName,
              DPname:item.DepName,  
              PhoneNum:item.PhoneNum,                  
              status:item.status,
              Intime:this.$moment(item.Intime,).format('YYYY-MM-DD HH:mm:ss'),
              recordUrl:item.recordUrl
            }

          })
        this.isloading=false
            }
      },
      hearRecord(record){

        console.log(record)
      },
      // getDepID()
      // {
      //     // this.$route.path.split('/')[3]
      //        this.$store.commit('SET_DepId',this.$route.path.split('/')[3])   
      //         console.log(this.DepID)
      //     // console.log(this.$route.fullPath);
      // },
      // async EditError(record){
      //   console.log(record)
      //     setTimeout(() => {
      //       this.$refs.UpdateUserPhonemodal.add(record);  
      //   }, 200);
    
      // },
      // async callback(val){
      
      //   if(val==1)
      //   {
      //     console.log(this.DepID);
      //     let smsrecord=await GetSmsRecord({DepID:this.DepID});
      //       console.log(smsrecord)
      //       if(smsrecord.result.code==1)
      //       {
      //     this.data=smsrecord.result.result.rows.map((item)=>{
      //       return {
      //         ID:item.ID,
      //         UserName:item.UserName,
      //         DPname:item.DPname,
      //         TID:item.TID,            
      //         status:item.status,
      //         time:this.$moment(item.time,).format('YYYY-MM-DD HH:mm:ss'),
      //         SMSContent:item.SMSContent
      //       }

      //     })
      //   this.isloading=false
      //       }
      //       else
      //       {
      //         this.$message.error('暂无数据')
      //       }
           
      //   }
      //   else
      //   {
          
      //       let _arr=[]
      //       let smsmo=await GetSmsmo({DepID:this.DepID})
      //       console.log(smsmo)
      //       let list= new Promise(resolve=>{
      //             if(smsmo.result.code==1)
      //      {
      //         smsmo.result.result.rows.forEach(async item => {
      //       //  console.log(item)
      //        let _obj={}          
      //        _obj.UserName=item.UserName
      //        _obj.moible=item.moible
      //        _obj.ID=item.ID,
      //        _obj.moDepName=item.moDepName,
      //        _obj.moContent=item.moContent,
      //        _obj.sendtime=this.$moment(item.sendtime).format('YYYY-MM-DD HH:mm:ss')   //().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      //      _arr.push(_obj);
      //      });           
      //      resolve(_arr)
      //      }
      //     })
          
      //       this.isloading=false
      //       this.Modata=await list
      //       console.log(this.Modata)
      //   }
     
         
      //   },
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
            console.log(param)
            // const result = await UpdateErrorInfo(param)
            // console.log(result)   
            // if(result.result.code==1)
            // {
            //   const dataSource = [...this.data];
            //   this.data = dataSource.filter(item => item.EID !== val);
            
            // }     
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