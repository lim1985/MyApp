<template>
  <div>
    <a-modal
      title="来电信息"
      :width="400"
      v-model="Phonevisible"
      :footer="null"     
      :keyboard="false"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
        <a-row>
          <a-col :span="24">{{ PhoneNumber }}</a-col>
          <!--<a-col :span="16"><a-cascader placeholder="选择部门类别" v-decorator="['DepKeylist',{initialValue:this.DepValue,rules: [{ required: true, message: '部门不能为空！' }]}]" :showSearch="{filter}" :options="options" @change="onChangeDeplist"/></a-col>
          <a-col :span="4"></a-col> -->
          <!-- ReferenceStatus -->
        </a-row>    
      </a-spin>
    </a-modal>   
  </div>  
</template>

<script> 
   import { mapState} from 'vuex'
  //GetALLByDepID,asyncValidateTel
export default {
  name: 'PhoneMsgModal', 
  // props:{
  //    Event: {
  //  type: String,
  //  required: true
  // },
  // },
  data () {
  return {      
      Phonevisible:false,    
      confirmLoading: false,
      mdl:{} ,
      Events:null,
      Types:null,
      PhoneNumber:null,
      HandleID:null
    }
  },
  beforeCreate () {
   
  },
  created () {
      console.log('createl')
      console.log(Event)
    // this.v();
  },
    computed:{
      ...mapState({
        handleID:state=>state.L_Ubox.HandleID,
        event:state=>state.L_Ubox.Event,
        phonenumber:state=>state.L_Ubox.PhoneNumber,
        type:state=>state.L_Ubox.Type,
              
      })    
    },
   watch:{
       phonenumber(val)
      {         
        this.PhoneNumber=val;              
      },
       handleID(val)
      {         
        this.HandleID=val;              
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
  methods:  {
    showPhone(val){
      console.log(val)
      if(val=='ring' || val=='hookoff')
      {
        this.Phonevisible=true;           
      }else if(val=='hookup' || val=='ringCancel')
      {
        this.PhoneNumber=''
        this.Phonevisible=false
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
