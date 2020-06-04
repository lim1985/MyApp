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
      @ok="CmccSendSMS()"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-row type="flex" justify="start">
          <a-col :offset="1" :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
            <p class="height-100"><strong style="color:red">温馨提示</strong>：批量发送可以从右边列表直接勾选联系人。</p>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-col :xs="20" :sm="20" :md="16" :lg="16" :xl="16"> <a-textarea v-model="vmodelContent" placeholder="输入短信内容" :rows="18"/></a-col>
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
  import { mapState } from 'vuex'
  import {SendSMS ,SmsAddrecord, SmsSucceedcount, UpdateDepSmsCount, newChinaCMCCSendSMS } from '@/api/manage' //CMCCSendSMS
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
      vmodelContent:'',
      // Mydata:data,
      sendText:null,
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
      sendedCount:0,
      smsAccounts:{}
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
        IsSendSms:state=>state.user.SendSmsList,
        SmsCount:state=>state.user.smscount                
      }),
       sendcount(){
         return this.sendedCount;
       }
    },
  
  async mounted(){   
        // let Accounts=await SelectSmsAccounts({DepID:this.IsSendSms[0]});
      // this.smsAccounts=Accounts;
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
          // console.log(this.IsSendSms[0]);
        return !this.sending? '发送成功。':'短信发送中...'          
      },
      onChange (e,checkedList) { 
        e.target.checked?this.Barr.push(checkedList):this.Barr.splice(0, 1);                 
        this.indeterminate = !! this.Barr.length && ( this.Barr.length < this.Pupuarr.length)
        this.checkAll =  this.Barr.length === this.Pupuarr.length            
        this.countSms=this.Barr.length  
        console.log(this.Barr);  
    },
     onCheckAllChange (e) {   
        this.Barr=[]       
        this.Pupuarr.forEach(v=>{
          !e.target.checked? v.checked=false:v.checked=true  
                   
          })      
          for(let y in this.Pupuarr)
          {
           this.Pupuarr[y].checked==true?this.countSms=this.Pupuarr.length: this.countSms=0                 
          }
      Object.assign(this, {
        // all: e.target.checked ? data:[],
        checkAll: e.target.checked,
        indeterminate: false,
        // checkAll: e.target.checked,     
      })
      console.log(this)
    },   
    get(i)
    {     
     setTimeout(() => {
      let _arr=[]  
      !i.length? _arr.push(i): _arr=i
        console.log(_arr)
        this.initSms(_arr);
     }, 100);
    },
    
    genID(length){//生成唯一组ID
      return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    },  
   async CmccSendSMS()
   {
    //  CMCCSendSMS
      // console.log(this.SmsCount-1000<=0)
     console.log(`开始发送`)
     if(this.countSms==0)
       {
         alert('请选择联系人')
         return 
       }   
      if(this.SmsCount==0)
    {
        this.$message.error('您的短信余额不足，请联系运营商客户经理');
        return 
    }
       this.sendedCount=0
       this.sending=true
       this.ClearInterval();
       this.AdminID= {AdminID:Vue.ls.get(User_ID)} 
       this.processvisible=true;
       this.GuID=this.genID(1);     
       let params={}  
       let mobilesArr=[]
      
     
         for(let x in this.Pupuarr)
      {
          if(!this.Pupuarr[x].checked==false)     //选出为ture的电话号码 
        {            // params.mobiles
            mobilesArr.push(this.Pupuarr[x].Phone)            
        }
      }
      let strMobiles=mobilesArr.join(',');    //生成发送号码串     
      params.mobiles=strMobiles
      params.content=this.vmodelContent
      params.DepID=this.IsSendSms[0]//选出权限内第一个单位的部门ID
      params.soucers=1  //普通短信发送  
    
      let smsArr=   newChinaCMCCSendSMS(params).then(r=>{  
           console.log(r)       
           let _json= JSON.parse(r.res)  
           let _smsArr=[]
           console.log(_json)
        if(_json.rspcod=='success' && _json.success==true)
        {  
           for(let x in this.Pupuarr)
          {
              if(!this.Pupuarr[x].checked==false)      
            {            // params.mobiles
              
                  let data={//组成一条发送记录插入数据库
                          DepID:params.DepID,    
                          DPname:this.Pupuarr[x].DPname,              
                          mobile:this.Pupuarr[x].Phone,
                          GuID:this.GuID,//唯一组ID 
                          TID:_json.msgGroup,//短信宝返回的唯一发送ID
                          UID:this.Pupuarr[x].ID,//发送的用户ID
                          AdminID:this.AdminID.AdminID,//发送的 管理员ID
                          time:this.$moment().format('YYYY-MM-DD HH:mm:ss'),//发送的时间
                          status:'0',//发送的状态短信宝返回的状态 未回复时默认为0
                          SMSContent:this.vmodelContent,//发送的内容
                          UserName:this.Pupuarr[x].username//接收短信的人
                        }        
                _smsArr.push(data)              
            }       
          }      
        }   
        //"{"msgGroup":"0129002605000000904249","rspcod":"success","success":true}"
       return _smsArr
      }).catch(err=>{
        alert(err)
      })
      let r=await smsArr;
      console.log(r)
//       .then(async r=>{
        if(!r ||r.length==0)
        {
          alert(`短信发送失败`)
          return false
        }
        let newSmsCount=0
        newSmsCount =this.SmsCount-r.length<=0?0:this.SmsCount-r.length    
      
         await UpdateDepSmsCount({DepID:params.DepID,SMSCount:newSmsCount})
         this.$store.commit("SET_COUNT", newSmsCount);   

 SmsAddrecord(r).then(res=>{//写入本地数据库以后记录 返回 GUID 
              console.log(res)
                let _GUID= this.GuID
                let _Data={
                    GUID:_GUID
                  }            
               return _Data
             }).then(r=>{
                this.ClearInterval();     //清空计时器         
                this.InervalTime=setInterval(() => {//开启计时器
                     SmsSucceedcount(r).then(count=>{//根据唯一的GUID 查询短信发送的状态返回成功的条数
                       console.log(count.result.count);//打印条数
                       this.sendedCount=count.result.count//将发送成功的条数绑定模板显示
                       if(this.sendedCount===this.countSms)//如果需要发送的条数等于发送成功的条数
                       {
                         this.sending=false   //发送窗口关闭并且提示显示发送成功
                         this.ClearInterval(); //清除计时器，计时器不清除会不断消耗内存
                       }                                         
                     })
                }, 4000);      //4秒执行一次查询        
             }).catch(err=>{
               alert(err)
             })

    
   },
   async sendsms()
   {    
     console.log(`点了`)
       if(this.countSms==0)
       {
         alert('短信条数余额为0，请购买短信。')
         return 
       }   
       this.sendedCount=0
       this.sending=true
       this.ClearInterval();
       this.AdminID= {AdminID:Vue.ls.get(User_ID)} 
       this.processvisible=true;
       this.GuID=this.genID(1);     
       let params={}  
      
      
        for(let x in this.Pupuarr)
      {
        if(!this.Pupuarr[x].checked==false)      
      {      
        params={     
        c:this.vmodelContent,
        m:this.Pupuarr[x].Phone,
        i:x,      
        tokens:{username:'limannlee'},
        U:this.Pupuarr[x].username,
        UID:this.Pupuarr[x].ID
       } 
       console.log('打印短信内容')
       console.log(params)
       SendSMS(params)
       .then(res=>{    
         return res
       })
       .then(r=>{
         console.log(r)
         let _arr= r.code.split(/[\s\n]/)
          console.log(_arr)
       let data={//组成一条发送记录插入数据库
                GuID:this.GuID,//唯一组ID 
                TID:_arr[1],//短信宝返回的唯一发送ID
                UID:r.uid,//发送的用户ID
                AdminID:this.AdminID.AdminID,//发送的 管理员ID
                time:this.$moment().format("YYYY-MM-DD HH:mm:ss"),//发送的时间
                status:_arr[0],//发送的状态短信宝返回的状态
                SMSContent:this.vmodelContent,//发送的内容
                UserName:r.u,//接收短信的人
              }
              return data
         })
        .then(data=>{       
          console.log(data)          
             SmsAddrecord(data).then(res=>{//写入本地数据库以后记录 返回 GUID 
                let _GUID=res.result.GuID
                let _Data={
                    GUID:_GUID
                  }            
               return _Data
             }).then(r=>{
                this.ClearInterval();     //清空计时器         
                this.InervalTime=setInterval(() => {//开启计时器
                     SmsSucceedcount(r).then(count=>{//根据唯一的GUID 查询短信发送的状态返回成功的条数
                       console.log(count);//打印条数
                       this.sendedCount=count.result.count//将发送成功的条数绑定模板显示
                       if(this.sendedCount===this.countSms)//如果需要发送的条数等于发送成功的条数
                       {
                         this.sending=false   //发送窗口关闭并且提示显示发送成功
                         this.ClearInterval(); //清除计时器，计时器不清除会不断消耗内存
                       }                                         
                     })                 
                }, 4000);      //4秒执行一次查询        
             })
       })      
      }
      } 
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
   async initSms(IDs){ 
     let _this=this
     console.log(IDs)
     console.log(_this.Pupuarr)
    //  IDs[0].DepartmentName?_this.vmodelContent=IDs[0].DepartmentName:_this.vmodelContent=IDs[0].Permission_name
    //  _this.vmodelContent=IDs[0].DepartmentName?true:false
    //   _this.vmodelContent=IDs[0].Permission_name?true:false
    //  _this.vmodelContent=`【${IDs[0].DepartmentName}】`
    _this.vmodelContent=`例：【区人民政府】接市里通知，请您于明天上午到市政府六楼会议室参加蔡市长召开的《创文现场调度会》。短信模板内容可以自行根据实际情况修改`
     _this.Barr=[]
     for(let x in _this.Pupuarr)
     {
      _this.Pupuarr[x].checked=false
      for(let y in IDs)
      {         
        if(_this.Pupuarr[x].ID==IDs[y].ID)
        {     
          // _this.Pupuarr.Phone=IDs.
         if(IDs[y].Hcellphone)
         {
           _this.Pupuarr[x].Phone=IDs[y].Hcellphone
         }
          _this.Barr.push(_this.Pupuarr[x])
          // _this.Pupuarr[x].Phone=IDs[y].H_cellphone
          _this.Pupuarr[x].checked=true
        //    if(IDs[y].H_cellphone!='')
        // {
        //    _this.Pupuarr[x].Phone=IDs[y].H_cellphone
        // }
        }      
      }
     }
      _this.indeterminate = !! _this.Barr.length && ( _this.Barr.length < _this.Pupuarr.length)
      _this.checkAll =  _this.Barr.length === _this.Pupuarr.length  
      _this.countSms=_this.Barr.length;  
      _this.Sendvisible=true;
      _this.smsContent= _this.vmodelContent
      // console.log(_this.vmodelContent)
      // console.log(_this.smsContent)
     
    },
  
    

     filter(inputValue, path) {
       
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
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