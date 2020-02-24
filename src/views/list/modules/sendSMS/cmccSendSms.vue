<template>
  <div>

    <a-row>
      <a-col>
        <button @click.stop="send()">
          发短信
        </button>
        <button @click.stop="sendhunanSMS()">
          省里发短信
        </button>
        <button @click.stop="GetPhoneNums()">
          获取手机号
        </button>
        
      </a-col>
    </a-row>
    <!-- <a-modal
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
    </a-modal> -->
    <!-- <a-modal
      title="发送短信"
      :width="1100"
      v-model="Sendvisible"
      @ok="sendsms()"  
      :confirmLoading="confirmLoading"
    >
      <a-spin :spinning="confirmLoading">
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
           
                  <a-col v-for="(i,index) in Pupuarr" :key="index" :span="24">
                    <a-checkbox @change="onChange($event,i)" v-model="i.checked" :value="i.Phone">{{ i.username }}-{{ i.UJOB }}</a-checkbox>
            
               
                  </a-col>             
                </a-row>        
              </div>
            </div>
          </a-col>
         
        </a-row>    
      </a-spin>
    </a-modal>   -->
  </div>  
</template>

<script>
  // import Vue from 'vue'  
  // import { mapState} from 'vuex'
  import { CMCCSendSMS ,HuNansms,GetPhoneNum} from '@/api/manage' 
  import qs from 'qs'
  // import { User_ID } from "@/store/mutation-types" 
  // import { clearInterval, setInterval } from 'timers';
  


  //GetALLByDepID,asyncValidateTel

export default {
  name: 'CMCCSendSmsModal', 
 
  data () {
    return {     
       icCard:'430503198201011519'
     
    }
  },
  beforeCreate () {
   
  },
  created () {    
  
  },
    computed:{
    
    },
  
  async mounted(){   
  
      // let _arr=await this.GetDepnameAndchild()     
      // this.options=this.QuChongFuObject(_arr);  
      // this.setDepkey();

    },
  methods:  {
    // base64encode()
    // {
    //  var _keyStr
    //  var output = "";
    //  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    //  var i = 0;
    //  input = this._utf8_encode(input);
    //  while (i < input.length) {
    //   chr1 = input.charCodeAt(i++);
    //   chr2 = input.charCodeAt(i++);
    //   chr3 = input.charCodeAt(i++);
    //   enc1 = chr1 >> 2;
    //   enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    //   enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    //   enc4 = chr3 & 63;
    //   if (isNaN(chr2)) {
    //    enc3 = enc4 = 64;
    //   } else if (isNaN(chr3)) {
    //    enc4 = 64;
    //   }
    //   output = output +
    //   _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
    //   _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    //  }
    //  return output;
    
    // },
    //    _utf8_encode  (string) {
    //  string = string.replace(/\r\n/g,"\n");
    //  var utftext = "";
    //  for (var n = 0; n < string.length; n++) {
    //   var c = string.charCodeAt(n);
    //   if (c < 128) {
    //    utftext += String.fromCharCode(c);
    //   } else if((c > 127) && (c < 2048)) {
    //    utftext += String.fromCharCode((c >> 6) | 192);
    //    utftext += String.fromCharCode((c & 63) | 128);
    //   } else {
    //    utftext += String.fromCharCode((c >> 12) | 224);
    //    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    //    utftext += String.fromCharCode((c & 63) | 128);
    //   }
    //  }
    //  return utftext;
    // },s
    async GetPhoneNums(){
      // var fd = new FormData();
      // let data={"certificate_no_input":"NDMwNTAzMTk4MjAxMDExNTE5","type":"1"}
      // fd.append("certificate_no_input", "NDMwNTAzMTk4MjAxMDExNTE5");
      // fd.append("type", "1");
     let  data={
        "certificate_no_input":"NDMwNTAzMTk4MjAxMDExNTE5",
        "type":"1"
      }
      let _data=qs.stringify(data);
      let res =await GetPhoneNum(_data)
      console.log(res);
    },
  async sendhunanSMS()
    {

      let data={
        "mobile":19973965269
        }
        let res= await HuNansms(JSON.stringify(data));
        console.log(res)
    },
    GetDate(format) {
     /**
     * format=1表示获取年月日
     * format=0表示获取年月日时分秒
     * **/
     let _time=''
     var now = new Date();
     var year = now.getFullYear();
     var month = now.getMonth()+1;
     var date = now.getDate();
    //  var day = now.getDay();//得到周几
     var hour = now.getHours();//得到小时
     var minu = now.getMinutes();//得到分钟
     var sec = now.getSeconds();//得到秒
     if (format==1){
         _time = year+"-"+month+"-"+date
    }
    else if (format==2){
        _time = year+"-"+month+"-"+date+" "+hour+":"+minu+":"+sec
    }
    return _time
}    ,
   send(){
    let nowtime=this.GetDate(2);
    let data={
      secretKey:'52979899',
      soucers:1,
      ecName:'邵阳市红旗路街道办事处',
      apId:'dxqzfb',
      mobiles:'15243990018,13973990779,13807399838',
      content:`大祥区人民政府，http://www.dxzc.gov.cn移动改变生活。${nowtime}`,
      sign:'',
      addSerial:''
      }
    let res =CMCCSendSMS(data).then(ress=>{
       return ress
    })
    console.log(res);
   }
  }
}
///sendCMCCStatus
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