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
   import { mapState} from 'vuex'
   import Validate from '@/tools/Validate/index'
  //GetALLByDepID,asyncValidateTel
export default {
  name: 'PhoneMsgModal', 
  data () {
  return {    
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
      isclick:false
      
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
        handleID:state=>state.L_Ubox.HandleID,
        event:state=>state.L_Ubox.Event,
        phonenumber:state=>state.L_Ubox.PhoneNumber,
        type:state=>state.L_Ubox.Type,
        numkeys:state=>state.L_Ubox.Numkeys,
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
       phonenumber(val)
      {         
        this.PhoneNumber=val;              
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
    get(val){
      
      this.Phonevisible=true
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
    },
    showPhone(val){
      console.log(val)
        this.result=''   
      if(val=='hookoff' || this.Types==0)
      {            
          // this.Phonevisible=false  
        
          this.result='请输入号码'           
      }
      if(val=='callerId')
      { 
        this.Phonevisible=true
        this.keys=this.phonenumber        
        this.telmsg='来电'
      }
      if(val=='hookoff' && this.keys &&this.isclick)
      {
        console.log(this.keys)
        this.telmsg='去电'
        this.$LUBOX.ubox_dialnum(this.keys) 
      }
      if(val=='hookup' || val=='ringCancel')
      {    
        this.Phonevisible=false
        this.isclick=false
        this.keys=''
        console.log(this.keys+'_'+this.result)
      }      
    },
  
    
   
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
