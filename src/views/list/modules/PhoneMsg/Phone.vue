<template>
  <div>
    <a-modal
      :title="`${telmsg}`+'信息'"
      :width="400"
      @cancel="telHookon"
      v-model="Phonevisible"
      :footer="null"     
      :keyboard="false"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-form
          :form="form"       
        >
          <a-row>  
            <a-row> 
              <a-col :span="24">
                <h3>部门：{{ PhoneInfo.DepName }}</h3>
              </a-col>                               
            </a-row>    
            <a-row>                 
              <a-col :span="24">
                <h3>姓名：{{ PhoneInfo.UserName }}</h3>
              </a-col>                      
            </a-row>  
            <a-row>  
              <a-col :span="24">
                <h3>职务：{{ !PhoneInfo.UJob?"无":PhoneInfo.UJob }}</h3>
              </a-col>    
            </a-row> 
            <a-col :span="24">               
              <h1>{{ keys }}</h1>             
            </a-col>
            <a-col :span="24">{{ result }}</a-col>          
          <!--<a-col :span="16"><a-cascader placeholder="选择部门类别" v-decorator="['DepKeylist',{initialValue:this.DepValue,rules: [{ required: true, message: '部门不能为空！' }]}]" :showSearch="{filter}" :options="options" @change="onChangeDeplist"/></a-col>
          <a-col :span="4"></a-col> -->
          <!-- ReferenceStatus -->
          </a-row>  
        </a-form> 
      </a-spin>
    </a-modal>   
  </div>  
</template>

<script> 
   import Vue from 'vue'
   import { PHONE_BODY ,PHONE_UrI,PHONE_NUM} from "@/store/mutation-types"
   import { mapState} from 'vuex'
   import { GetUserInfoByTelOrPhoneNum,createPhoneRecord} from '@/api/manage'
   import Validate from '@/tools/Validate/index'
  //GetALLByDepID,asyncValidateTel
export default {
  name: 'TableList', 
 
  data () {
  return {    
      PhoneInfo:{},
      formItemLayout: {
         labelCol: {
          xs: { span: 12 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span:16 },
          sm: { span: 16},
        },
      },  
      Phonevisible:false,    
      confirmLoading: false,
      mdl:{} ,
      Events:null,
      Types:null,    
      HandleID:null,     
      keys:'',
      result:'',
      telmsg:'',
      isclick:false,
      PHONEURL:'',
      DEPID:''
      
    }
  },
 beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {
      console.log('createl')
     
    // this.v();
  }, 
    computed:{
      ...mapState({
        Phoneurl:state=>state.L_Ubox.PHONEURL,
        handleID:state=>state.L_Ubox.HandleID,
        event:state=>state.L_Ubox.Event,
        phonenumber:state=>state.L_Ubox.PhoneNumber,
        type:state=>state.L_Ubox.Type,
        numkeys:state=>state.L_Ubox.Numkeys,
        depid:state=>state.user.SendSmsList[0]
        // DepID=this.$route.path.split('/')[3]
      }),   
            
    },
   watch:{   
    
     'numkeys':{
      handler(value){
        this.getkeys(value)
        // alert("我的name是："+value.event)
        // alert("我的age是："+value.Numkeys)
      },
      // deep:true
    },
      Phoneurl(val)
      {         
        console.log(val)
        this.PHONEURL=val    
      },
       phonenumber(newval)
      {               
        this.PhoneNumber=newval;    
        console.log(newval)          
      },
       'handleID':{
         handler(value){
         this.HandleID=value;   
         this.Ishandle()        
      },
      // deep:true
    },
      
      event(val)
      {         
        this.showPhone(val)
        this.Events=val;              
      },
      type(val)
      {
        this.Types=val
      }
   },
  async mounted(){   
   
        console.log(`getPhoneModel`)
    // console.log(`event`)
    // console.log(this.Events)
    //  this.showPhone();

    },
  methods:{

    Ishandle(){
      console.log(this.HandleID)
      if(this.HandleID==-1)
      {
         this.$message.error('由于没有接入电话盒子，自动拨号等功能将无法使用'); 
      }
      // if(val=='')
      // {
      //      this.$message.error('由于没有接入电话盒子，自动拨号等功能将无法使用');  
      //   // alert('没有插入')
      // }
    },
    getPhoneInfo(num)
    {
         GetUserInfoByTelOrPhoneNum({tel:num}).then(res=>{
             if(res.code==-1)
         {
          this.PhoneInfo.UserName='陌生来电'
          this.PhoneInfo.UJob=''
          this.PhoneInfo.DepName=''         
         }
         else
         {
          this.PhoneInfo.UserName=res.res.UserName
          this.PhoneInfo.UJob=res.res.UJOB
          this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
         } 
          // this.PhoneInfo.UserName=res.res.UserName
          // this.PhoneInfo.UJob=res.res.UJOB
          // this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
          this.Phonevisible=true
            console.log(this.PhoneInfo)
        })
    },
    get(val){
      this.PhoneInfo.PhoneNum=val
      this.getPhoneInfo(val)
      this.keys=val;
      this.result='提起电话将自动拨号'
      this.isclick=true;      
    },
    telHookon()
    {
      this.keys=''
    },
    v(){
      // console.log(Validate)
      // console.log(Validate)
      return Validate 
    },
    
    getkeys(val)
    {    
     
        this.keys=val
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)))
        {
          this.result='请输入正确的手机号'
          return false
        }
        else
        {         
          this.result='电话接通中...'
        }   
     
      console.log(val)
         this.PhoneInfo={}
         GetUserInfoByTelOrPhoneNum({tel:val}).then(res=>{
         if(res.code==-1)
         {
          this.PhoneInfo.UserName='陌生号码'
          this.PhoneInfo.UJob=''
          this.PhoneInfo.DepName=''         
         }
         else
         {
          this.PhoneInfo.UserName=res.res.UserName
          this.PhoneInfo.UJob=res.res.UJOB
          this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
         }      
          this.PhoneInfo.PhoneNum=this.keys    
           Vue.ls.set(PHONE_NUM,this.keys) 
          this.Phonevisible=true
          this.result=''
          // this.result='拿起电话即可接听'
          
        })
    },
    showPhone(val){
      console.log(val)
      this.result=''   
      if(val=='hookoff' || this.Types==0)
      {            
          // this.Phonevisible=false  
          console.log(`进这里面了`) 
          this.Phonevisible=true   
          this.telmsg='去电'    
          this.result='请输入号码'           
      }
      if(val=='callerId')
      { 
      
        this.keys=  this.phonenumber
        Vue.ls.set(PHONE_NUM,this.keys) 
        //  console.log(this.phonenumber)   
        this.telmsg='来电'
       GetUserInfoByTelOrPhoneNum({tel:this.keys}).then(res=>{
         if(res.code==-1)
         {
          this.PhoneInfo.UserName='陌生来电'
          this.PhoneInfo.UJob=''
          this.PhoneInfo.DepName=''         
         }
         else
         {
          this.PhoneInfo.UserName=res.res.UserName
          this.PhoneInfo.UJob=res.res.UJOB
          this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
         }      
          this.PhoneInfo.PhoneNum=this.keys    
          this.Phonevisible=true
          this.result=''
          // this.result='拿起电话即可接听'
            console.log(this.PhoneInfo)
        })        
      }
      if(val=='hookoff' && this.keys &&this.isclick)
      {
        console.log(this.keys)

        this.telmsg='去电'
        this.$LUBOX.ubox_dialnum(this.keys) 
        Vue.ls.set(PHONE_NUM,this.keys) 
            GetUserInfoByTelOrPhoneNum({tel:this.keys}).then(res=>{
        if(res.code==-1)
         {
          this.PhoneInfo.UserName='陌生来电'
          this.PhoneInfo.UJob=''
          this.PhoneInfo.DepName=''         
         }
         else
         {
          this.PhoneInfo.UserName=res.res.UserName
          this.PhoneInfo.UJob=res.res.UJOB
          this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
         } 
          // this.PhoneInfo.UserName =res.res.UserName
          // this.PhoneInfo.UJob=res.res.UJOB
          // this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
          this.Phonevisible=true
            console.log(this.PhoneInfo)
        })        
      }     
      if(val=='hookup' || val=='ringCancel')
      { 
        // createPhoneRecord   
        //1 去电
        //2 来电
        //3 未接来电
        console.log(`取消了`)
        console.log(this.keys)
        let PhoneStatus= this.telmsg=='去电'?1:2
        console.log(this.telmsg)
        if(val=='ringCancel')
        {
          PhoneStatus=3
        }             
    // || Vue.ls.get(PHONE_NUM)   
        let _phonenNum=Vue.ls.get(PHONE_NUM)  
        //        GetUserInfoByTelOrPhoneNum({tel:_phonenNum}).then(res=>{
        // if(res.code==-1)
        //  {
        //   this.PhoneInfo.UserName='陌生来电'
        //   this.PhoneInfo.UJob=''
        //   this.PhoneInfo.DepName=''         
        //  }
        //  else
        //  {
        //   this.PhoneInfo.UserName=res.res.UserName
        //   this.PhoneInfo.UJob=res.res.UJOB
        //   this.PhoneInfo.DepName=res.res['ResferecDep.DepartmentName']
        //  }       
        // })    
        this.PhoneInfo.PhoneNum=_phonenNum    
        this.PhoneInfo.status=PhoneStatus
        this.PhoneInfo.Intime=this.$moment().format('YYYY-MM-DD HH:mm:ss')
        this.PhoneInfo.recordUrl=this.PHONEURL|| Vue.ls.get(PHONE_UrI)           
        this.PhoneInfo.DepID=this.depid    
     
         Vue.ls.set(PHONE_BODY, this.PhoneInfo) 
          //  Vue.ls.set(fromUrl, this.$route.fullPath);
        // console.log(this.PhoneInfo)
        let _phoneBody=Vue.ls.get(PHONE_BODY);
        console.log(_phoneBody)
        createPhoneRecord(_phoneBody).then(res=>{
          console.log(res)
          if(res)
          {
            this.Phonevisible=false
            this.isclick=false
            this.keys=''
            this.telmsg=''
            Vue.ls.set(PHONE_BODY,'')
          }
        })
      
         this.Phonevisible=false
         this.isclick=false
        //来电人姓名UserName 
        //来点人手机号PhoneNum
        //来电人单位DepName
        //来电状态status
        //来电时间Intime
        //来电录音地址recordUrl
        console.log(PhoneStatus)
        console.log(this.PhoneInfo)
        console.log(this.PHONEURL)       
        console.log(this.depid)
        console.log(this.keys+'_'+this.result)
      }      
    },
  
  
    // getPhoneStatus(val)
    // {
    //     let status
    //     switch(val) {
    //     case 'ringCancel'://来电未接
    //         status=3
    //         break;
    //     case 'hookoff'://去电
    //         status=1
    //         break;
    //     case 'callerId'://来电
    //         status=2
    //         break;
    //     default:
            
    // } 
    // return status
    // },
   
     filter(inputValue, path) {
       
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      this.mdl=value;
     
      return value;
    },
  }
}
</script>
