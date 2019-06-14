<template>
  <div>
    <a-modal
      title="短信发送"
      :width="300"
      :footer="null"     
      :keyboard="false"
      :maskClosable="false"
      @cancel="SendSMShandleCancel()"
      v-model="processvisible">
      <template>
        <a-card :title="sendsmsstatus()">        
          <p>{{ sendcount }}/{{ countSms }}</p>         
        </a-card>
      </template>
    </a-modal>
    <a-modal
      title="发送短信"
      :width="1100"
      v-model="Sendvisible"
      @ok="sendsms()"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-row type="flex" justify="end">
          <a-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16"> <a-textarea v-model="smsContent" placeholder="输入短信内容" :rows="18"/></a-col>
          <a-col :span="1"> </a-col>
          <a-col :xs="20" :sm="20" :md="6" :lg="6" :xl="6">
            <div class="demo-infinite-container">
              <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                <a-checkbox
                  :indeterminate="indeterminate"            
                  @change="onCheckAllChange"
                  :checked="checkAll"
                >
                  全选
                </a-checkbox>
                <br/>             
                <a-row :span="24">
                  <!-- <a-col v-for="(i,index) in Mydata" :key="index" :span="24">
            <a-checkbox  @change="onChange(i)" v-model="i.checked" :value="i.item">{{i.item}}</a-checkbox>
          </a-col>   -->
                  <a-col v-for="(i,index) in Pupuarr" :key="index" :span="24">
                    <a-checkbox @change="onChange($event,i)" v-model="i.checked" :value="i.Phone">{{ i.username }}-{{ i.UJOB }}</a-checkbox>
            
                    <!-- <a-checkbox  @change="onChange(i)" v-model="i.checked" :value="i.item">{{i.item}}</a-checkbox> -->
                  </a-col>             
                </a-row>        
              </div>
            </div>
          </a-col>
          <!-- ReferenceStatus -->
        </a-row>    
      </a-spin>
    </a-modal>  
  </div>  
</template>

<script>
  import Vue from 'vue'  
  import { mapState} from 'vuex'
  import {SendSMS ,SmsAddrecord,SmsSucceedcount} from '@/api/manage' 
  import { User_ID } from "@/store/mutation-types" 
import { clearInterval, setInterval } from 'timers';
  


  //GetALLByDepID,asyncValidateTel

export default {
  name: 'SendSmsModal', 
  props:{
    Pupuarr:{
      type:Array,
      required:true
    }
  }, 
  data () {
    return {     
      sending:false,
      smsContent:'',
      // Mydata:data,
     
      processvisible:false,
      indeterminate: true,
      checkAll: false,     
      // data,
      Sendvisible:false,   
      Isvalidate:false,
      status:'',       
      PhoneVisible:false,        
       formItemLayout: {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span:20 },
          sm: { span: 10 },
        },
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
     
      loading:false,    
      Barr:[],
      countSms:0,
      countArr:[],
      GuID:0,     
      AdminID:0,
      InervalTime:null,
      sendedCount:0
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {    
    
  },
    computed:{
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY,               
      }),
       sendcount(){
         return this.sendedCount;
       }
    },
  
  async mounted(){   
  
      // let _arr=await this.GetDepnameAndchild()     
      // this.options=this.QuChongFuObject(_arr);  
      // this.setDepkey();

    },
  methods:  {
    ClearInterval(){
      clearInterval(this.InervalTime);
      this.InervalTime=null;
      console.log('计时器清空')
    },
  
      sendsmsstatus(){
        if(this.sending)
        {
          return '短信发送中...'
        }
        else
        {
          return '发送完毕'
        }
      },
      onChange (e,checkedList) { 
        if(e.target.checked)
        {
           this.Barr.push(checkedList)  
        }
        else
        {
          this.Barr.splice(0, 1); 
        }          
        this.indeterminate = !! this.Barr.length && ( this.Barr.length < this.Pupuarr.length)
        this.checkAll =  this.Barr.length === this.Pupuarr.length            
        this.countSms=this.Barr.length
    },

     onCheckAllChange (e) {   
        this.Pupuarr.forEach(v=>{
          if(!e.target.checked)
          {         
            v.checked=false;
            this.Barr=[]            
          }
          else
          {           
            v.checked=true           
          }           
          })      
          for(let y in this.Pupuarr)
          {
            if(this.Pupuarr[y].checked==true)
            {
              this.countSms=this.Pupuarr.length;
              console.log(this.countSms)
            }
            else
            {
               this.countSms=0
              console.log(this.countSms)
            }            
          }
      Object.assign(this, {
        // all: e.target.checked ? data:[],
        checkAll: e.target.checked,
        indeterminate: false,
        // checkAll: e.target.checked,     
      })
    },   
    get(i,record)
    {     
     setTimeout(() => {
        this.send(i,record);
     }, 100);
    },
    
    genID(length){//生成唯一组ID
      return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    },
   
   
  
   async sendsms()
   {       
       this.sendedCount=0
       this.sending=true
       this.ClearInterval();
       this.AdminID= {AdminID:Vue.ls.get(User_ID)} 
       this.processvisible=true;
       this.GuID=this.genID(1);     
       let params={}    
        for(let x in this.Pupuarr)
      {
        if(this.Pupuarr[x].checked==false)
        {
          console.log('不发送'+x)
        }
        else
      {      
        params={     
        c:this.smsContent,
        m:this.Pupuarr[x].Phone,
        i:x,      
        tokens:{username:'limannlee'},
        U:this.Pupuarr[x].username,
        UID:this.Pupuarr[x].ID
       } 
       SendSMS(params)
       .then(res=>{    
         return res
       })
       .then(r=>{
        //  console.log(r)
         let _arr= r.code.split(/[\s\n]/)
        //  console.log(_arr)
       let data={
                GuID:this.GuID,
                TID:_arr[1],
                UID:r.uid,
                AdminID:this.AdminID.AdminID,
                time:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
                status:_arr[0],
                SMSContent:this.smsContent,
                UserName:r.u,
              }
              return data
         })
        .then(data=>{                 
             SmsAddrecord(data).then(res=>{ 
                let _GUID=res.result.GuID
                let _Data={
                    GUID:_GUID
                  }            
               return _Data
             }).then(r=>{
                this.ClearInterval();              
                this.InervalTime=setInterval(() => {
                     SmsSucceedcount(r).then(count=>{
                       console.log(count);
                       this.sendedCount=count.result.count
                       if(this.sendedCount===this.countSms)
                       {
                         this.sending=false   
                         this.ClearInterval(); 
                       }                                         
                     })                 
                }, 4000);              
             })
       })      
      }
      } 
       console.log(`1`)
       console.log(params)
      //  SendSMS(params).then(res=>{
      //    return res
      //  }).then(r=>{
      //     console.log(`2`)
      //     console.log(r)
      //    let _arr= r.code.split(/[\s\n]/)
      //       let data={
      //           GuID:this.GuID,
      //           TID:_arr[1],
      //           UID:r.uid,
      //           AdminID:this.AdminID.AdminID,
      //           time:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
      //           status:_arr[0],
      //           SMSContent:this.smsContent,
      //           UserName:r.u,
      //         }
      //         return data
      //  }).then(s=>{
      //     console.log(`3`)
      //    console.log(s)
      //  })
            // SendSMS(params).then(res=>{             
            //   return res
            // }).then(r=>{
            // //let TID=r.code.replace(/[\r\n]/g,""); 
            // let _arr=  r.code.split(/[\s\n]/)
            //   console.log(_arr)
            //   console.log(r);               
            //   let data={
            //     GuID:this.GuID,
            //     TID:_arr[1],
            //     UID:this.Pupuarr[x].ID,
            //     AdminID:this.AdminID.AdminID,
            //     time:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
            //     status:_arr[0],
            //     SMSContent:this.smsContent,
            //     UserName:this.Pupuarr[x].username
            //   }
            //   setTimeout(() => {
            //     SmsAddrecord(data).then(res=>{
                 
            //       let _GUID=res.result.GuID
            //       let _Data={
            //         GUID:_GUID
            //       }
            //    return _Data             
            //   }).then(r=>{                
            //     if(r)
            //     {
               
                
                  // this.InervalTime=setInterval(() => {
                  
                        // SmsSucceedcount(r).then(ss=>{
                      //     console.log(ss)
                      //     console.log(this.InervalTime)
                      //   this.sendedCount=ss.result.count;
                      //   if(this.sendedCount==this.countSms)
                      //   {
                      //     window.clearInterval(this.InervalTime);                        
                      //     this.InervalTime=null
                      //  console.log(this.InervalTime)
                      //     this.sending=false
                      //     return 
                      //   }        
                                  
                      //   return ss.result.count                                          
                      //  }).then(count=>{
                      //     this.sendedCount=count
                      //     console.log(this.sendedCount)
                      //     if(this.sendedCount==this.countSms)
                      //     {
                      //     window.clearInterval(this.InervalTime);     
                      //     this.InervalTime=null
                      //     return false
                      //     }
                         
                      //  })
                  // }, 3000);  
                     
                // }
              
                // this.InervalTime=setInterval(() => {
                //     SmsSucceedcount(_gid).then(ss=>{
                //       this.sendedCount=ss.result.count  
                //       if(this.sendedCount=this.countSms)
                //       {
                //          window.clearInterval(this.InervalTime);     
                //          this.InervalTime=null
                //          this.sending=false
                //          return false
                //       }                     
                //     })
                // }, 3000);
            
              // })
              // }, 1000);
             
              // console.log("TID:"+_arr[1])
              // console.log("TIME:"+this.NowTime)
              // console.log("GUID:"+this.GuID)              
              // console.log("SMScontent:"+this.smsContent)
              // console.log("PhoneNUM:"+this.Pupuarr[x].Phone)
              // console.log("UID:"+this.Pupuarr[x].ID)
              // console.log("UserName:"+this.Pupuarr[x].username)
              // console.log("status:"+_arr[0])
            // })
      
    },
    SendSMShandleCancel()
    {
      alert('关闭当前窗口并不影响短信发送')    
      this.ClearInterval()     
      // window.clearInterval(this.InervalTime);   
      // this.InervalTime=null
      this.Sendvisible=false
      console.log('计时器关闭')  
       
    },
   async send(i,record){
     let _this=this
     console.log(_this.Pupuarr);
    _this.smsContent=`【${record.DepartmentName}】`
    for(let x in _this.Pupuarr)
    {
      if(x==i)
      {
          _this.Pupuarr[i].checked=true;
      }
      else
      {
          _this.Pupuarr[x].checked=false;
      }
    }
    _this.Barr.push(_this.Pupuarr[i])
    _this.Sendvisible=true;
    _this.Barr.length=1;
    _this.countSms=_this.Barr.length; 
    },
  
    

     filter(inputValue, path) {
       
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      this.mdl=value;
     
      return value;
    },
   
  
    close () {
         this.$emit('close')
         this.PhoneVisible = false    
    },  
    handleCancel () {
     
    }
  }
}
</script>
<style>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 380px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>